const fs = require("fs");
const path = require("path");
const os = require("os");

const givenPath = process.argv[2];

const filePath = path.resolve(givenPath);

function cleanComments(data) {
  let cleanStr = [];
  const lines = data.split(os.EOL);
  for (let i = 0; i < lines.length; i++) {
    const commentIndex = lines[i].indexOf("//");
    if (commentIndex > 0 && lines[i].slice(0, commentIndex).trim() !== "") {
      cleanStr.push(lines[i].slice(0, commentIndex).trim());
    } else if (commentIndex === -1 && lines[i].trim() !== "") {
      cleanStr.push(lines[i].trim());
    }
  }
  return cleanStr;
}

function isNumber(value) {
  return !isNaN(value) && !isNaN(parseInt(value));
}

function aInstructionParser(line) {
  let addr = line.slice(1);
  let addrDecimal;
  if (isNumber(addr)) {
    addrDecimal = parseInt(addr);
  } else {
    if (Object.keys(symbols).indexOf(addr) === -1) {
      symbols[addr] = symbolCounter;
      symbolCounter += 1;
    }
    addrDecimal = parseInt(symbols[addr]);
  }
  return addrDecimal.toString(2).padStart(16, "0");
}

function labelParser(data) {
  let linesWithoutLabels = [];
  let lineCounter = 0;
  for (let i = 0; i < data.length; i++) {
    const line = data[i];
    let match = line.match(/\(([^)]+)\)/g);
    if (match && match.length) {
      let newLabel = match[0].slice(1, -1);
      if (!symbols[newLabel]) {
        symbols[newLabel] = lineCounter;
      }
    } else {
      linesWithoutLabels.push(line);
      lineCounter += 1;
    }
  }
  return linesWithoutLabels;
}

let destTable = {
  "": 0b000,
  M: 0b001,
  D: 0b010,
  DM: 0b011,
  MD: 0b011,
  A: 0b100,
  AM: 0b101,
  MA: 0b101,
  AD: 0b110,
  DA: 0b110,
  AMD: 0b111,
  ADM: 0b111,
};

let jmpTable = {
  "": 0b000,
  JGT: 0b001,
  JEQ: 0b010,
  JGE: 0b011,
  JLT: 0b100,
  JNE: 0b101,
  JLE: 0b110,
  JMP: 0b111,
};

let compTable = {
  0: 0b0101010,
  1: 0b0111111,
  "-1": 0b0111010,
  D: 0b0001100,
  A: 0b0110000,
  M: 0b1110000,
  "!D": 0b0001101,
  "!A": 0b0110001,
  "!M": 0b1110001,
  "-D": 0b0001111,
  "-A": 0b0110011,
  "-M": 0b1110011,
  "D+1": 0b0011111,
  "A+1": 0b0110111,
  "M+1": 0b1110111,
  "D-1": 0b0001110,
  "A-1": 0b0110010,
  "M-1": 0b1110010,
  "D+A": 0b0000010,
  "D+M": 0b1000010,
  "D-A": 0b0010011,
  "D-M": 0b1010011,
  "A-D": 0b0000111,
  "M-D": 0b1000111,
  "D&A": 0b0000000,
  "D&M": 0b1000000,
  "D|A": 0b0010101,
  "D|M": 0b1010101,
};

let symbols = {
  R0: 0,
  R1: 1,
  R2: 2,
  R3: 3,
  R4: 4,
  R5: 5,
  R6: 6,
  R7: 7,
  R8: 8,
  R9: 9,
  R10: 10,
  R11: 11,
  R12: 12,
  R13: 13,
  R14: 14,
  R15: 15,
  SCREEN: 16384,
  KBD: 24576,
  SP: 0,
  LCL: 1,
  ARG: 2,
  THIS: 3,
  THAT: 4,
};

let symbolCounter = 16;

function cInstructionParser(line) {
  let equalSignIndex = line.indexOf("=");
  let semicolonIndex = line.indexOf(";");
  let dest = line.slice(0, equalSignIndex);
  let comp,
    jmp = "";
  if (semicolonIndex !== -1) {
    comp = line.slice(equalSignIndex + 1, semicolonIndex);
    jmp = line.slice(semicolonIndex + 1);
  } else {
    comp = line.slice(equalSignIndex + 1);
  }
  comp = compTable[comp];
  jmp = jmpTable[jmp] || 0b000;
  dest = destTable[dest] || 0b000;

  let result = `111${comp.toString(2).padStart(7, "0")}${dest
    .toString(2)
    .padStart(3, "0")}${jmp.toString(2).padStart(3, "0")}`;
  return result;
}

fs.readFile(filePath, "utf-8", (err, fileData) => {
  if (err) {
    console.log("Error reading file" + filePath + ".\nError:" + err);
  } else {
    let cleanAsmDataArray = cleanComments(fileData);

    let resultMachineCode = [];

    // Label parser
    const labelsParsedArray = labelParser(cleanAsmDataArray);

    for (let i = 0; i < labelsParsedArray.length; i++) {
      const line = labelsParsedArray[i];
      if (line[0] === "@") {
        resultMachineCode.push(aInstructionParser(line));
      } else {
        resultMachineCode.push(cInstructionParser(line));
      }
    }

    fs.writeFile(
      filePath.replace(".asm", ".hack"),
      resultMachineCode.join(os.EOL),
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log(
            `${filePath.replace(".asm", ".hack")}  written successfully`
          );
          console.log(JSON.stringify(symbols));
        }
      }
    );
  }
});
