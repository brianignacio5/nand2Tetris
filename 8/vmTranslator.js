const fs = require("fs");
const path = require("path");
const os = require("os");

const givenPath = process.argv[2];

const resolvedGivenPath = path.resolve(givenPath);

const pathStat = fs.statSync(resolvedGivenPath);
const vmFiles = [];
let resultAsmPath = "";
if (pathStat.isDirectory()) {
  const files = fs.readdirSync(resolvedGivenPath);
  files.forEach((f) => {
    const fullPath = path.join(resolvedGivenPath, f);
    const fileStats = fs.statSync(fullPath);
    if (fileStats.isFile() && path.extname(fullPath) === ".vm") {
      vmFiles.push(fullPath);
    }
  });
  resultAsmPath = path.join(
    resolvedGivenPath,
    path.basename(resolvedGivenPath) + ".asm"
  );
} else if (pathStat.isFile() && path.extname(resolvedGivenPath) === ".vm") {
  vmFiles.push(resolvedGivenPath);
  resultAsmPath = resolvedGivenPath.replace(".vm", ".asm");
} else {
  console.log(
    "Given path is not .vm file or a directory." + os.EOL + "Leaving..."
  );
  return;
}
console.log("Result path is " + resultAsmPath);

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

const CommandTypes = Object.freeze({
  C_ARITHMETIC: Symbol("C_ARITHMETIC"),
  C_PUSH: Symbol("C_PUSH"),
  C_POP: Symbol("C_POP"),
  C_LABEL: Symbol("C_LABEL"),
  C_GOTO: Symbol("C_GOTO"),
  C_IF: Symbol("C_IF"),
  C_FUNCTION: Symbol("C_FUNCTION"),
  C_RETURN: Symbol("C_RETURN"),
  C_CALL: Symbol("C_CALL"),
});

class Parser {
  filePath;
  currentLine = 0;
  currentCommand = "";
  currentCommandArr = [];
  fileInput = [];

  constructor(filePath) {
    this.filePath = filePath;
    const fileData = fs.readFileSync(filePath, { encoding: "utf-8" });
    this.fileInput = cleanComments(fileData);
  }

  hasMoreLines() {
    return this.currentLine < this.fileInput.length;
  }

  advance() {
    if (!this.hasMoreLines()) {
      return;
    }
    this.currentCommand = this.fileInput[this.currentLine++];
    this.currentCommandArr = this.currentCommand.split(" ");
    console.log(this.currentCommandArr);
  }

  commmandType() {
    if (this.currentCommandArr.length === 0) {
      console.log("current command length is 0");
      return;
    }
    switch (this.currentCommandArr[0]) {
      case "add":
        return CommandTypes.C_ARITHMETIC;
      case "sub":
        return CommandTypes.C_ARITHMETIC;
      case "neg":
        return CommandTypes.C_ARITHMETIC;
      case "eq":
        return CommandTypes.C_ARITHMETIC;
      case "gt":
        return CommandTypes.C_ARITHMETIC;
      case "lt":
        return CommandTypes.C_ARITHMETIC;
      case "and":
        return CommandTypes.C_ARITHMETIC;
      case "or":
        return CommandTypes.C_ARITHMETIC;
      case "not":
        return CommandTypes.C_ARITHMETIC;
      case "push":
        return CommandTypes.C_PUSH;
      case "pop":
        return CommandTypes.C_POP;
      case "return":
        return CommandTypes.C_RETURN;
      case "label":
        return CommandTypes.C_LABEL;
      case "function":
        return CommandTypes.C_FUNCTION;
      case "call":
        return CommandTypes.C_CALL;
      case "if-goto":
        return CommandTypes.C_IF;
      case "goto":
        return CommandTypes.C_GOTO;
      case "return":
        return CommandTypes.C_RETURN;
      default:
        break;
    }
  }

  arg1() {
    if (this.commmandType() === CommandTypes.C_RETURN) {
      return;
    } else if (this.commmandType() === CommandTypes.C_ARITHMETIC) {
      return this.currentCommandArr[0];
    } else {
      return this.currentCommandArr[1];
    }
  }

  arg2() {
    if (
      this.commmandType() === CommandTypes.C_PUSH ||
      this.commmandType() === CommandTypes.C_POP ||
      this.commmandType() === CommandTypes.C_FUNCTION ||
      this.commmandType() === CommandTypes.C_CALL
    ) {
      return this.currentCommandArr[2];
    }
  }
}

class PushHelpers {
  static constant(i) {
    return `@${i} // constant ${i}
D=A
${this.push()}`;
  }
  static push() {
    return `@SP
A=M
M=D
@SP
M=M+1`;
  }
  static segmentPush(pointer, i) {
    return `@${pointer} // D=${pointer}
D=M // D=*${pointer}
@${i}
D=D+A // D=*${pointer}+${i} => addr
A=D // @addr
D=M // D=*addr
${this.push()}`;
  }
  static local(i) {
    return PushHelpers.segmentPush("LCL", i);
  }
  static argument(i) {
    return PushHelpers.segmentPush("ARG", i);
  }
  static this(i) {
    return PushHelpers.segmentPush("THIS", i);
  }
  static that(i) {
    return PushHelpers.segmentPush("THAT", i);
  }
  static static(fileName, varName) {
    return `@${fileName}.${varName}
D=M
${PushHelpers.push()}`;
  }
  static temp(i) {
    return `@5 // D=TEMP
D=A
@${i}
D=D+A // D=(TEMP+${i}) => addr
A=D // @addr
D=M // D=*addr
${this.push()}`;
  }
  static pointer(i) {
    const pointer = i === "0" ? "THIS" : "THAT";
    return `
@${pointer}
D=M
${PushHelpers.push()}`;
  }

  static getSegmentPush(segment, i, fileName) {
    switch (segment) {
      case "constant":
        return PushHelpers.constant(i);
      case "local":
        return PushHelpers.local(i);
      case "argument":
        return PushHelpers.argument(i);
      case "this":
        return PushHelpers.this(i);
      case "that":
        return PushHelpers.that(i);
      case "pointer":
        return PushHelpers.pointer(i);
      case "static":
        return PushHelpers.static(fileName, i);
      case "temp":
        return PushHelpers.temp(i);
      default:
        break;
    }
  }
}

class PopHelpers {
  static pop() {
    return `@SP
M=M-1
A=M
D=M`;
  }
  static segmentPop(pointer, i) {
    return `@${pointer} // D=${pointer}
D=M // D=*${pointer}
@${i}
D=D+A // D=*${pointer}+${i} => addr
@addr
M=D
${PopHelpers.pop()}
@addr
A=M
M=D`;
  }
  static local(i) {
    return PopHelpers.segmentPop("LCL", i);
  }
  static argument(i) {
    return PopHelpers.segmentPop("ARG", i);
  }
  static this(i) {
    return PopHelpers.segmentPop("THIS", i);
  }
  static that(i) {
    return PopHelpers.segmentPop("THAT", i);
  }
  static static(fileName, varName) {
    return `${PopHelpers.pop()}
@${fileName}.${varName}
M=D`;
  }
  static temp(i) {
    return `@5 // TEMP
D=A
@${i}
D=D+A // D=(TEMP+${i}) => addr
@addr
M=D
${PopHelpers.pop()}
@addr
A=M
M=D`;
  }
  static pointer(i) {
    if (i !== "0" && i !== "1") {
      return "";
    }
    const pointer = i === "0" ? "THIS" : "THAT";
    return `${PopHelpers.pop()}
@${pointer}
M=D // ${pointer}=*SP`;
  }
  static getSegmentPop(segment, i, fileName) {
    switch (segment) {
      case "local":
        return PopHelpers.local(i);
      case "argument":
        return PopHelpers.argument(i);
      case "this":
        return PopHelpers.this(i);
      case "that":
        return PopHelpers.that(i);
      case "pointer":
        return PopHelpers.pointer(i);
      case "static":
        return PopHelpers.static(fileName, i);
      case "temp":
        return PopHelpers.temp(i);
      default:
        break;
    }
  }
}

class ArithmeticHelpers {
  static eqCounter = 0;
  static gtCounter = 0;
  static ltCounter = 0;
  static add() {
    let resultStr = `// Add
${PopHelpers.pop()}
@SP
M=M-1
A=M
D=D+M
${PushHelpers.push()}`;
    return resultStr;
  }
  static sub() {
    let resultStr = `// Sub
${PopHelpers.pop()}
@SP
M=M-1
A=M
D=M-D
${PushHelpers.push()}`;
    return resultStr;
  }
  static neg() {
    let resultStr = `// Neg
${PopHelpers.pop()}
D=-D
${PushHelpers.push()}`;
    return resultStr;
  }
  static eq() {
    let resultStr = `// EQ
${PopHelpers.pop()}
@SP
M=M-1
A=M
D=M-D
@eq_${ArithmeticHelpers.eqCounter}_true
D;JEQ
// eq_${ArithmeticHelpers.eqCounter}_false
D=0
@eq_${ArithmeticHelpers.eqCounter}_end
0;JMP
(eq_${ArithmeticHelpers.eqCounter}_true)
D=-1
(eq_${ArithmeticHelpers.eqCounter}_end)
${PushHelpers.push()}`;
    ArithmeticHelpers.eqCounter += 1;
    return resultStr;
  }
  static gt() {
    let resultStr = `// GT
${PopHelpers.pop()}
@SP
M=M-1
A=M
D=M-D
@gt_${ArithmeticHelpers.gtCounter}_true
D;JGT
// gt_${ArithmeticHelpers.gtCounter}_false
D=0
@gt_${ArithmeticHelpers.gtCounter}_end
0;JMP
(gt_${ArithmeticHelpers.gtCounter}_true)
D=-1
(gt_${ArithmeticHelpers.gtCounter}_end)
${PushHelpers.push()}`;
    ArithmeticHelpers.gtCounter += 1;
    return resultStr;
  }
  static lt() {
    let resultStr = `// LT
${PopHelpers.pop()}
@SP
M=M-1
A=M
D=M-D
@lt_${ArithmeticHelpers.ltCounter}_true
D;JLT
// lt_${ArithmeticHelpers.ltCounter}_false
D=0
@lt_${ArithmeticHelpers.ltCounter}_end
0;JMP
(lt_${ArithmeticHelpers.ltCounter}_true)
D=-1
(lt_${ArithmeticHelpers.ltCounter}_end)
${PushHelpers.push()}`;
    ArithmeticHelpers.ltCounter += 1;
    return resultStr;
  }
  static and() {
    let resultStr = `// AND
${PopHelpers.pop()}
@SP
M=M-1
A=M
D=D&M;
${PushHelpers.push()}`;
    return resultStr;
  }
  static or() {
    let resultStr = `// OR
${PopHelpers.pop()}
@SP
M=M-1
A=M
D=D|M;
${PushHelpers.push()}`;
    return resultStr;
  }
  static not() {
    let resultStr = `// NOT
${PopHelpers.pop()}
D=!D;
${PushHelpers.push()}`;
    return resultStr;
  }
}

class CodeWriter {
  outputBuffer = "";
  constructor() {}
  fileName = "";
  currentFunctionName = "";
  callCounter = {};

  writeInit() {
    this.outputBuffer += `// Bootstrap code
@256
D=A
@SP
M=D
`;
    this.callCounter["Sys.init"] = 0;
    this.writeCall("Sys.init", 0);
  }

  setFileName(fileName) {
    this.fileName = fileName;
  }

  writeArithmetic(cmd) {
    switch (cmd) {
      case "add":
        this.outputBuffer += ArithmeticHelpers.add();
        break;
      case "sub":
        this.outputBuffer += ArithmeticHelpers.sub();
        break;
      case "neg":
        this.outputBuffer += ArithmeticHelpers.neg();
        break;
      case "eq":
        this.outputBuffer += ArithmeticHelpers.eq();
        break;
      case "gt":
        this.outputBuffer += ArithmeticHelpers.gt();
        break;
      case "lt":
        this.outputBuffer += ArithmeticHelpers.lt();
        break;
      case "and":
        this.outputBuffer += ArithmeticHelpers.and();
        break;
      case "or":
        this.outputBuffer += ArithmeticHelpers.or();
        break;
      case "not":
        this.outputBuffer += ArithmeticHelpers.not();
        break;
      default:
        break;
    }
    this.outputBuffer += os.EOL;
  }

  writePushPop(cmdType, segment, i) {
    switch (cmdType) {
      case CommandTypes.C_POP:
        this.outputBuffer += PopHelpers.getSegmentPop(
          segment,
          i,
          this.fileName
        );
        break;
      case CommandTypes.C_PUSH:
        this.outputBuffer += PushHelpers.getSegmentPush(
          segment,
          i,
          this.fileName
        );
        break;
      default:
        break;
    }
    this.outputBuffer += os.EOL;
  }

  writeLabel(label) {
    this.outputBuffer += `(${this.functionName}$${label})`;
    this.outputBuffer += os.EOL;
  }

  writeGoto(label) {
    this.outputBuffer += `@${this.functionName}$${label}`;
    this.outputBuffer += os.EOL;
    this.outputBuffer += `0;JMP`;
    this.outputBuffer += os.EOL;
  }

  writeIf(label) {
    this.outputBuffer += PopHelpers.pop();
    this.outputBuffer += os.EOL;
    this.outputBuffer += `@${this.functionName}$${label}`;
    this.outputBuffer += os.EOL;
    this.outputBuffer += `D;JNE`;
    this.outputBuffer += os.EOL;
  }

  writeCall(functionName, numArgs) {
    this.outputBuffer += `// call ${functionName} ${numArgs}
@${functionName}$ret.${this.callCounter[functionName]}
D=A
${PushHelpers.push()}
@LCL
D=M
${PushHelpers.push()}
@ARG
D=M
${PushHelpers.push()}
@THIS
D=M
${PushHelpers.push()}
@THAT
D=M
${PushHelpers.push()}
// ARG = SP - 5 - nArgs
@SP
D=M
@5
D=D-A
@${numArgs} // nArgs
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
// call goto function ${functionName}
@${functionName}
0;JMP
(${functionName}$ret.${this.callCounter[functionName]})
`;
this.callCounter[functionName] += 1;
  }

  writeFunction(functionName, numVars) {
    this.functionName = functionName;
    this.callCounter[functionName] = 0;
    this.outputBuffer += `(${functionName})`;
    this.outputBuffer += os.EOL;
    for (let i = 0; i < numVars; i++) {
      this.outputBuffer += `// Local ${i} ${os.EOL}`;
      this.outputBuffer += PushHelpers.constant(0);
      this.outputBuffer += os.EOL;
    }
  }

  writeReturn() {
    this.outputBuffer += `//Return
@LCL
D=M // LCL
@endFrame
M=D
@5
D=D-A // LCL-5
A=D
D=M // *(endFrame - 5)
@retAddr
M=D
// *ARG = pop()
${PopHelpers.argument(0)}
// Put return value to caller
@ARG
A=M+1
D=A
@SP
M=D
// Restore THAT
@endFrame
D=M
@1
A=D-A // endFrame - 1
D=M
@THAT // THAT = *(endFrame - 1)
M=D
// Restore THIS
@endFrame
D=M
@2
A=D-A // endFrame - 2
D=M
@THIS
M=D // THIS = *(endFrame - 2)
// Restore ARG
@endFrame
D=M
@3
A=D-A // endFrame - 3
D=M
@ARG
M=D // ARG = *(endFrame - 3)
// Restore LCL
@endFrame
D=M
@4
A=D-A // endFrame - 4
D=M
@LCL
M=D // LCL = *(endFrame - 4)
// go to return address
@retAddr
A=M
0;JMP
`;
  }

  close() {
    return this.outputBuffer;
  }
}

function main() {
  const codeWriter = new CodeWriter();
  codeWriter.writeInit();
  for (const vmFile of vmFiles) {
    const parser = new Parser(vmFile);

    codeWriter.setFileName(path.basename(vmFile).replace(".vm", ""));

    while (parser.hasMoreLines()) {
      parser.advance();

      const cmdType = parser.commmandType();
      const arg1 = parser.arg1();
      const arg2 = parser.arg2();

      console.log(`Parsed commands: ${cmdType.toString()} ${arg1} ${arg2}`);

      if (cmdType === CommandTypes.C_ARITHMETIC) {
        codeWriter.writeArithmetic(arg1);
      } else if (
        cmdType === CommandTypes.C_PUSH ||
        cmdType === CommandTypes.C_POP
      ) {
        codeWriter.writePushPop(cmdType, arg1, arg2);
      } else if (cmdType === CommandTypes.C_LABEL) {
        codeWriter.writeLabel(arg1);
      } else if (cmdType === CommandTypes.C_GOTO) {
        codeWriter.writeGoto(arg1);
      } else if (cmdType === CommandTypes.C_IF) {
        codeWriter.writeIf(arg1);
      } else if (cmdType === CommandTypes.C_FUNCTION) {
        codeWriter.writeFunction(arg1, arg2);
      } else if (cmdType === CommandTypes.C_RETURN) {
        codeWriter.writeReturn();
      } else if (cmdType === CommandTypes.C_CALL) {
        codeWriter.writeCall(arg1, arg2);
      }
    }
  }

  fs.writeFile(resultAsmPath, codeWriter.close(), (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log(`${resultAsmPath}  written successfully`);
    }
  });
}

main();
