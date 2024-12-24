const fs = require("fs");
const path = require("path");
const os = require("os");

const givenPath = process.argv[2];

const resolvedGivenPath = path.resolve(givenPath);

const pathStat = fs.statSync(resolvedGivenPath);
const jackFiles = [];
if (pathStat.isDirectory()) {
  const files = fs.readdirSync(resolvedGivenPath);
  files.forEach((f) => {
    const fullPath = path.join(resolvedGivenPath, f);
    const fileStats = fs.statSync(fullPath);
    if (fileStats.isFile() && path.extname(fullPath) === ".jack") {
      jackFiles.push(fullPath);
    }
  });
} else if (pathStat.isFile() && path.extname(resolvedGivenPath) === ".jack") {
  jackFiles.push(resolvedGivenPath);
} else {
  console.log(
    "Given path is not .jack file or a directory." + os.EOL + "Leaving..."
  );
  return;
}

function cleanComments(filePath) {
  // Regular expressions to match single-line and multi-line comments
  const fileContent = fs.readFileSync(filePath, "utf8");
  const singleLineComment = /\/\/.*$/gm;
  const multiLineComment = /\/\*[\s\S]*?\*\//gm;

  // Remove comments from the file content
  const withoutComments = fileContent
    .replace(multiLineComment, "")
    .replace(singleLineComment, "")
    .trim();

  let cleanStr = [];
  const lines = withoutComments.split(os.EOL);

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() !== "") {
      cleanStr.push(lines[i].trim());
    }
  }
  return cleanStr.join("");
}

const TokenTypes = Object.freeze({
  KEYWORD: Symbol("KEYWORD"),
  SYMBOL: Symbol("SYMBOL"),
  IDENTIFIER: Symbol("IDENTIFIER"),
  INT_CONST: Symbol("INT_CONST"),
  STRING_CONST: Symbol("STRING_CONST"),
});

class Tokenizer {
  currentIndex = 0;
  currentToken = "";
  fileInput = "";
  keywords = new Set([
    "class",
    "constructor",
    "function",
    "method",
    "field",
    "static",
    "var",
    "int",
    "char",
    "boolean",
    "void",
    "true",
    "false",
    "null",
    "this",
    "let",
    "do",
    "if",
    "else",
    "while",
    "return",
  ]);
  symbols = new Set([
    "{",
    "}",
    "(",
    ")",
    "[",
    "]",
    ".",
    ",",
    ";",
    "+",
    "-",
    "*",
    "/",
    "&",
    "|",
    "<",
    ">",
    "=",
    "~",
  ]);

  constructor(filePath) {
    this.fileInput = cleanComments(filePath);
  }

  hasMoreTokens() {
    return this.currentIndex < this.fileInput.length;
  }

  peek() {
    // Save the current state
    const savedIndex = this.currentIndex;

    let tempToken = ""; // Temporary token to store the next token
    let tempIndex = savedIndex; // Local index to simulate advancing
    let lastCharRead = this.fileInput[tempIndex];

    // Skip spaces
    while (lastCharRead === " ") {
      lastCharRead = this.fileInput[++tempIndex];
    }

    // Check for symbols
    if (this.symbols.has(lastCharRead)) {
      tempToken = lastCharRead;
      return tempToken; // Return the symbol immediately
    }

    // Check for string constants
    if (lastCharRead === '"') {
      tempToken += lastCharRead;
      lastCharRead = this.fileInput[++tempIndex];
      while (lastCharRead !== '"') {
        tempToken += lastCharRead;
        lastCharRead = this.fileInput[++tempIndex];
      }
      tempToken += lastCharRead; // Add closing quote
      return tempToken; // Return string constant
    }

    // Handle keywords or identifiers
    while (
      !this.keywords.has(tempToken) &&
      lastCharRead !== " " &&
      !this.symbols.has(lastCharRead)
    ) {
      tempToken += lastCharRead;
      lastCharRead = this.fileInput[++tempIndex];
    }

    // Return the temporary token without modifying the real state
    return tempToken;
  }

  advance() {
    if (!this.hasMoreTokens()) {
      return;
    }
    this.currentToken = "";
    this.currentIndex;
    let lastCharRead = this.fileInput[this.currentIndex];

    while (lastCharRead === " ") {
      lastCharRead = this.fileInput[++this.currentIndex];
    }

    if (this.symbols.has(lastCharRead)) {
      this.currentToken = lastCharRead;
      this.currentIndex++;
    }

    if (lastCharRead === '"') {
      this.currentToken += lastCharRead;
      lastCharRead = this.fileInput[++this.currentIndex];
      while (lastCharRead !== '"') {
        this.currentToken += lastCharRead;
        lastCharRead = this.fileInput[++this.currentIndex];
      }
      this.currentToken += lastCharRead;
      this.currentIndex++;
      return;
    }

    while (
      lastCharRead !== " " &&
      !this.symbols.has(lastCharRead)
    ) {
      this.currentToken += lastCharRead;
      lastCharRead = this.fileInput[++this.currentIndex];
    }

    if (this.keywords.has(this.currentToken)) {
      return; // Token is a complete keyword
    }
  }

  isIntegerInRange(input) {
    // Check if the input is a string representation of an integer
    const number = parseInt(input, 10);

    // Validate if the parsed number is an integer and within the range
    return !isNaN(number) && number >= 0 && number <= 32767;
  }

  tokenType() {
    if (this.currentToken[0] === '"') {
      return TokenTypes.STRING_CONST;
    }
    if (this.isIntegerInRange(this.currentToken)) {
      return TokenTypes.INT_CONST;
    }
    if (this.keywords.has(this.currentToken)) {
      return TokenTypes.KEYWORD;
    }
    if (this.symbols.has(this.currentToken)) {
      return TokenTypes.SYMBOL;
    }
    return TokenTypes.IDENTIFIER;
  }

  tokenTypeAsString() {
    switch (this.tokenType()) {
      case TokenTypes.STRING_CONST:
        return "stringConstant";
      case TokenTypes.IDENTIFIER:
        return "identifier";
      case TokenTypes.INT_CONST:
        return "integerConstant";
      case TokenTypes.KEYWORD:
        return "keyword";
      case TokenTypes.SYMBOL:
        return "symbol";
      default:
        break;
    }
  }

  symbol() {
    if (this.tokenType() !== TokenTypes.SYMBOL) {
      return;
    }
    switch (this.currentToken) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "&":
        return "&amp;";
      default:
        return this.currentToken;
    }
  }

  stringVal() {
    if (this.tokenType() !== TokenTypes.STRING_CONST) {
      return;
    }
    return this.currentToken.replace(/\"/g, "");
  }

  intVal() {
    if (this.tokenType() !== TokenTypes.INT_CONST) {
      return;
    }
    return this.currentToken;
  }

  keyword() {
    if (this.tokenType() !== TokenTypes.KEYWORD) {
      return;
    }
    return this.currentToken;
  }

  identifier() {
    if (this.tokenType() !== TokenTypes.IDENTIFIER) {
      return;
    }
    return this.currentToken;
  }

  currentTokenAsXML() {
    switch (this.tokenType()) {
      case TokenTypes.STRING_CONST:
        return this.stringVal();
      case TokenTypes.IDENTIFIER:
        return this.identifier();
      case TokenTypes.INT_CONST:
        return this.intVal();
      case TokenTypes.SYMBOL:
        return this.symbol();
      case TokenTypes.KEYWORD:
      default:
        return this.currentToken;
    }
  }
}

class CompilationDatabase {
  fileOutput = "";
  fileVMOutput = "";
  tokenizer = null;
  indent = 0;

  classSymbolTable = null;
  subroutineSymbolTable = null;

  ifCounter = 0;
  whileCounter = 0;

  constructor(tokenizer) {
    this.tokenizer = tokenizer;
    this.vmWriter = new VMWriter();
  }

  getFunctionName() {
    const className = this.classSymbolTable.name;
    const functionName = this.subroutineSymbolTable.name;
    return `${className}.${functionName}`;
  }

  compileClass() {
    this.fileOutput += `${"\t".repeat(this.indent)}<class>${os.EOL}`;
    this.indent += 1;
    this.processStr("class");
    this.classSymbolTable = new SymbolTable(this.tokenizer.currentToken);
    this.processStr(this.tokenizer.currentToken, "class");
    this.processStr("{");
    while (
      this.tokenizer.currentToken === "static" ||
      this.tokenizer.currentToken === "field"
    ) {
      this.compileClassVarDec();
    }
    while (
      this.tokenizer.currentToken === "constructor" ||
      this.tokenizer.currentToken === "function" ||
      this.tokenizer.currentToken === "method"
    ) {
      this.compileSubroutine();
    }
    this.processStr("}");
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</class>${os.EOL}`;
  }

  compileClassVarDec() {
    this.fileOutput += `${"\t".repeat(this.indent)}<classVarDec>${os.EOL}`;
    this.indent += 1;
    const kind = this.tokenizer.currentToken === "field" ? "this" : "static";
    this.processStr(["static", "field"]);
    const type = this.tokenizer.currentToken;
    this.processStr(
      ["int", "char", "boolean", this.tokenizer.identifier()],
      "class"
    );
    const name = this.tokenizer.currentToken;
    this.classSymbolTable.define(name, type, kind);
    this.processStr(this.tokenizer.currentToken);
    while (this.tokenizer.currentToken === ",") {
      this.processStr(",");
      const name = this.tokenizer.currentToken;
      this.classSymbolTable.define(name, type, kind);
      this.processStr(this.tokenizer.identifier());
    }
    this.processStr(";");
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</classVarDec>${os.EOL}`;
  }

  compileSubroutine() {
    this.fileOutput += `${"\t".repeat(this.indent)}<subroutineDec>${os.EOL}`;
    this.indent += 1;
    let subroutineType = this.tokenizer.currentToken;
    this.processStr(["constructor", "function", "method"]);
    this.processStr(
      ["void", "int", "char", "boolean", this.tokenizer.identifier()],
      "class"
    );
    this.subroutineSymbolTable = new SymbolTable(this.tokenizer.currentToken);
    this.processStr(this.tokenizer.currentToken, "subroutine");
    this.processStr("(");
    if (subroutineType === "method") {
      this.subroutineSymbolTable.define("this", this.classSymbolTable.name, "argument");
    }
    this.compileParameterList();
    this.processStr(")");
    this.compileSubroutineBody(subroutineType);
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</subroutineDec>${os.EOL}`;
  }

  compileParameterList() {
    this.fileOutput += `${"\t".repeat(this.indent)}<parameterList>${os.EOL}`;
    if (
      this.tokenizer.currentToken === "int" ||
      this.tokenizer.currentToken === "char" ||
      this.tokenizer.currentToken === "boolean" ||
      this.tokenizer.identifier() !== undefined
    ) {
      this.indent += 1;
      const kind = "argument";
      let type = this.tokenizer.currentToken;
      this.processStr(
        ["int", "char", "boolean", this.tokenizer.identifier()],
        "class"
      );
      let name = this.tokenizer.currentToken;
      this.subroutineSymbolTable.define(name, type, kind);
      this.processStr(this.tokenizer.identifier());
      while (this.tokenizer.currentToken === ",") {
        this.processStr(",");
        type = this.tokenizer.currentToken;
        this.processStr(
          ["int", "char", "boolean", this.tokenizer.identifier()],
          "class"
        );
        name = this.tokenizer.currentToken;
        this.subroutineSymbolTable.define(name, type, kind);
        this.processStr(this.tokenizer.identifier());
      }
      this.indent -= 1;
    }
    this.fileOutput += `${"\t".repeat(this.indent)}</parameterList>${os.EOL}`;
  }

  compileSubroutineBody(subroutineType) {
    this.fileOutput += `${"\t".repeat(this.indent)}<subroutineBody>${os.EOL}`;
    this.indent += 1;
    this.processStr("{");
    while (this.tokenizer.currentToken === "var") {
      this.compileVarDec();
    }
    this.vmWriter.writeFunction(
      this.getFunctionName(),
      this.subroutineSymbolTable.varCount("local")
    );
    if (subroutineType === "constructor") {
      if (this.classSymbolTable.varCount("this") > 0) {
        this.vmWriter.writePush(
          "constant",
          this.classSymbolTable.varCount("this")
        );
      }
      // if (this.classSymbolTable.varCount("static") > 0) {
      //   this.vmWriter.writePush(
      //     "static",
      //     this.classSymbolTable.varCount("static")
      //   );
      // }
      this.vmWriter.writeCall("Memory.alloc", 1);
      this.vmWriter.writePop("pointer", 0);
    } else if (subroutineType === "method") {
      this.vmWriter.writePush("argument", 0);
      this.vmWriter.writePop("pointer", 0);
    }
    this.compileStatements();
    this.processStr("}");
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</subroutineBody>${os.EOL}`;
  }

  compileVarDec() {
    this.fileOutput += `${"\t".repeat(this.indent)}<varDec>${os.EOL}`;
    this.indent += 1;
    const kind = "local";
    this.processStr("var");
    const type = this.tokenizer.currentToken;
    this.processStr(
      ["int", "char", "boolean", this.tokenizer.identifier()],
      "class"
    );
    let name = this.tokenizer.currentToken;
    this.subroutineSymbolTable.define(name, type, kind);
    this.processStr(this.tokenizer.identifier());
    while (this.tokenizer.currentToken === ",") {
      this.processStr(",");
      name = this.tokenizer.currentToken;
      this.subroutineSymbolTable.define(name, type, kind);
      this.processStr(this.tokenizer.identifier());
    }
    this.processStr(";");
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</varDec>${os.EOL}`;
  }

  compileStatements() {
    this.fileOutput += `${"\t".repeat(this.indent)}<statements>${os.EOL}`;
    this.indent += 1;
    while (
      ["let", "if", "while", "do", "return"].indexOf(
        this.tokenizer.currentToken
      ) !== -1
    ) {
      switch (this.tokenizer.currentToken) {
        case "let":
          this.compileLet();
          break;
        case "if":
          this.compileIf();
          break;
        case "while":
          this.compileWhile();
          break;
        case "do":
          this.compileDo();
          break;
        case "return":
          this.compileReturn();
          break;
        default:
          break;
      }
    }
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</statements>${os.EOL}`;
  }

  compileLet() {
    this.fileOutput += `${"\t".repeat(this.indent)}<letStatement>${os.EOL}`;
    this.indent += 1;
    this.processStr("let");
    let varName = this.tokenizer.identifier();
    this.processStr(this.tokenizer.identifier());
    let isArr = false; // arr[exp]
    if (this.tokenizer.currentToken === "[") {
      this.processStr("[");
      this.compileExpression();
      this.processStr("]");
      this.pushVarFromSymbolTable(varName);
      this.vmWriter.writeArithmetic("add");
      isArr = true;
    }
    this.processStr("=");
    this.compileExpression();
    this.processStr(";");
    if (isArr) {
      this.vmWriter.writePop("temp", 0);
      this.vmWriter.writePop("pointer", 1);
      this.vmWriter.writePush("temp", 0);
      this.vmWriter.writePop("that", 0);
    } else {
      this.popVarFromSymbolTable(varName);
    }
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</letStatement>${os.EOL}`;
  }

  compileIf() {
    this.fileOutput += `${"\t".repeat(this.indent)}<ifStatement>${os.EOL}`;
    this.indent += 1;
    this.processStr("if");
    this.processStr("(");
    this.compileExpression();
    this.processStr(")");
    this.vmWriter.writeArithmetic("not");
    const currIfCounter = this.ifCounter;
    this.ifCounter++;
    this.vmWriter.writeIf("IF_FALSE" + currIfCounter);
    this.processStr("{");
    this.compileStatements();
    this.processStr("}");
    this.vmWriter.writeGoto("IF_END" + currIfCounter);
    this.vmWriter.writeLabel("IF_FALSE" + currIfCounter);
    if (this.tokenizer.currentToken === "else") {
      this.processStr("else");
      this.processStr("{");
      this.compileStatements();
      this.processStr("}");
    }
    this.vmWriter.writeLabel("IF_END" + currIfCounter);
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</ifStatement>${os.EOL}`;
  }

  compileWhile() {
    this.fileOutput += `${"\t".repeat(this.indent)}<whileStatement>${os.EOL}`;
    this.indent += 1;
    const currWhileCounter = this.whileCounter;
    this.whileCounter++;
    this.vmWriter.writeLabel("WHILE_EXP" + currWhileCounter);
    this.processStr("while");
    this.processStr("(");
    this.compileExpression();
    this.processStr(")");
    this.vmWriter.writeArithmetic("not");
    this.vmWriter.writeIf("WHILE_END" + currWhileCounter);
    this.processStr("{");
    this.compileStatements();
    this.vmWriter.writeGoto("WHILE_EXP" + currWhileCounter);
    this.vmWriter.writeLabel("WHILE_END" + currWhileCounter);
    this.processStr("}");
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</whileStatement>${os.EOL}`;
  }

  compileDo() {
    this.fileOutput += `${"\t".repeat(this.indent)}<doStatement>${os.EOL}`;
    this.indent += 1;
    this.processStr("do");
    this.compileTerm(); // subroutine call
    this.processStr(";");
    this.vmWriter.writePop("temp", 0);
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</doStatement>${os.EOL}`;
  }

  compileReturn() {
    this.fileOutput += `${"\t".repeat(this.indent)}<returnStatement>${os.EOL}`;
    this.indent += 1;
    this.processStr("return");
    if (this.tokenizer.currentToken !== ";") {
      this.compileExpression(); // optional
    } else {
      this.vmWriter.writePush("constant", 0);
    }
    this.processStr(";");
    this.vmWriter.writeReturn();
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</returnStatement>${os.EOL}`;
  }

  compileExpression() {
    this.fileOutput += `${"\t".repeat(this.indent)}<expression>${os.EOL}`;
    this.indent += 1;
    this.fileOutput += `${"\t".repeat(this.indent)}<term>${os.EOL}`;
    this.indent += 1;
    this.compileTerm();
    while (
      ["+", "-", "*", "/", "&amp;", "|", "&lt;", "&gt;", "="].indexOf(
        this.tokenizer.symbol()
      ) !== -1
    ) {
      this.indent -= 1;
      this.fileOutput += `${"\t".repeat(this.indent)}</term>${os.EOL}`;
      let currOp = this.tokenizer.symbol();
      this.processStr(this.tokenizer.symbol());
      this.fileOutput += `${"\t".repeat(this.indent)}<term>${os.EOL}`;
      this.indent += 1;
      this.compileTerm();
      this.vmWriter.getSymbolCmd(currOp);
    }
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</term>${os.EOL}`;
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</expression>${os.EOL}`;
  }

  compileTerm() {
    let varName = this.tokenizer.identifier();
    if (varName) {
      let nextToken = this.tokenizer.peek();
      let scope = "";
      let nArgs = 0;
      if (nextToken === ".") {
        scope = "class";
        nArgs = this.pushVarFromSymbolTable(varName);
      } else if (nextToken === "(") {
        scope = "subroutine";
      } else if (nextToken !== "[") {
        this.pushVarFromSymbolTable(varName);
      }
      this.processStr(varName, scope);
      if (this.tokenizer.currentToken === "[") {
        // Check for varname[expression]
        this.processStr("[");
        this.compileExpression();
        this.pushVarFromSymbolTable(varName);
        this.vmWriter.writeArithmetic("add");
        this.vmWriter.writePop("pointer", 1);
        this.vmWriter.writePush("that", 0);
        this.processStr("]");
      } else if (this.tokenizer.currentToken === "(") {
        // Check for varname(expressionList)
        this.processStr("(");
        this.vmWriter.writePush("pointer", 0);
        nArgs = 1;
        nArgs += this.compileExpressionList();
        this.processStr(")");
        this.vmWriter.writeCall(
          `${this.classSymbolTable.name}.${varName}`,
          nArgs
        );
      } else if (this.tokenizer.currentToken === ".") {
        this.processStr(".");
        let subRoutineName = this.tokenizer.identifier();
        this.processStr(this.tokenizer.identifier(), "subroutine");
        this.processStr("(");
        nArgs += this.compileExpressionList();
        this.vmWriter.writeCall(
          `${this.getTypeOf(varName)}.${subRoutineName}`,
          nArgs
        );
        this.processStr(")");
      }
      // Check for ClassName.bar(expressionList)
      // Check for varname.bar(expressionList)
    } else if (this.tokenizer.currentToken === "(") {
      this.processStr("(");
      this.compileExpression();
      this.processStr(")");
    } else if (
      this.tokenizer.currentToken === "~" ||
      this.tokenizer.currentToken === "-"
    ) {
      const unitaryOp = this.tokenizer.currentToken;
      this.processStr(["~", "-"]);
      this.fileOutput += `${"\t".repeat(this.indent)}<term>${os.EOL}`;
      this.indent += 1;
      this.compileTerm();
      if (unitaryOp === "~") {
        this.vmWriter.writeArithmetic("not");
      }
      if (unitaryOp === "-") {
        this.vmWriter.writeArithmetic("neg");
      }
      this.fileOutput += `${"\t".repeat(this.indent)}</term>${os.EOL}`;
      this.indent -= 1;
    } else {
      if (this.tokenizer.intVal()) {
        this.vmWriter.writePush("constant", this.tokenizer.intVal());
      } else if (this.tokenizer.keyword() === "true") {
        this.vmWriter.writePush("constant", 1);
        this.vmWriter.writeArithmetic("neg");
      } else if (
        this.tokenizer.keyword() === "false" ||
        this.tokenizer.keyword() === "null"
      ) {
        this.vmWriter.writePush("constant", 0);
      } else if (this.tokenizer.keyword() === "this") {
        console.log("What to do here?");
        // this = pointer 0
        this.vmWriter.writePush("pointer", 0);
      } else if (this.tokenizer.stringVal()) {
        let str = this.tokenizer.stringVal();
        this.vmWriter.writePush("constant", str.length);
        this.vmWriter.writeCall("String.new", 1);
        for (const strChar of str) {
          this.vmWriter.writePush("constant", strChar.charCodeAt(0));
          this.vmWriter.writeCall("String.appendChar", 2);
        }
      }
      this.processStr([
        this.tokenizer.intVal(),
        this.tokenizer.stringVal(),
        this.tokenizer.keyword(),
      ]);
    }
  }

  compileExpressionList() {
    this.fileOutput += `${"\t".repeat(this.indent)}<expressionList>${os.EOL}`;
    this.indent += 1;
    let nArgs = 0;
    if (this.tokenizer.currentToken !== ")") {
      this.compileExpression();
      nArgs++;
      while (this.tokenizer.currentToken === ",") {
        this.processStr(",");
        this.compileExpression();
        nArgs++;
      }
    }
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</expressionList>${os.EOL}`;
    return nArgs;
  }

  processStr(str, scope = "") {
    const tokenType = this.tokenizer.tokenTypeAsString();
    const tokenValue = this.tokenizer.currentTokenAsXML();
    if (str instanceof Array) {
      for (const strElem of str) {
        if (tokenValue === strElem) {
          if (this.tokenizer.tokenType() === TokenTypes.IDENTIFIER) {
            this.processIdentifier(str, scope);
          } else {
            this.fileOutput += `${"\t".repeat(
              this.indent
            )}<${tokenType}> ${this.tokenizer.currentTokenAsXML()} </${tokenType}>${
              os.EOL
            }`;
          }
          break;
        }
      }
    } else if (tokenValue === str) {
      if (this.tokenizer.tokenType() === TokenTypes.IDENTIFIER) {
        this.processIdentifier(str, scope);
      } else {
        this.fileOutput += `${"\t".repeat(
          this.indent
        )}<${tokenType}> ${this.tokenizer.currentTokenAsXML()} </${tokenType}>${
          os.EOL
        }`;
      }
    } else {
      this.fileOutput += "syntax error for " + str + os.EOL;
    }
    this.tokenizer.advance();
  }

  pushVarFromSymbolTable(varName) {
    let segment = "";
    let index = undefined;
    if (this.subroutineSymbolTable) {
      segment = this.subroutineSymbolTable.kindOf(varName);
      index = this.subroutineSymbolTable.indexOf(varName);
    }
    if (!segment && this.classSymbolTable) {
      segment = this.classSymbolTable.kindOf(varName);
      index = this.classSymbolTable.indexOf(varName);
    }
    if (segment && index !== undefined) {
      this.vmWriter.writePush(segment, index);
      return 1;
    }
    return 0;
  }

  popVarFromSymbolTable(varName) {
    let segment = "";
    let index = undefined;
    if (this.subroutineSymbolTable) {
      segment = this.subroutineSymbolTable.kindOf(varName);
      index = this.subroutineSymbolTable.indexOf(varName);
    }
    if (!segment && this.classSymbolTable) {
      segment = this.classSymbolTable.kindOf(varName);
      index = this.classSymbolTable.indexOf(varName);
    }
    if (segment && index !== undefined) {
      this.vmWriter.writePop(segment, index);
    }
  }

  getTypeOf(varName) {
    let typeOfLabel = "";
    if (this.subroutineSymbolTable) {
      typeOfLabel = this.subroutineSymbolTable.typeOf(varName);
    }
    if (!typeOfLabel) {
      typeOfLabel = this.classSymbolTable.typeOf(varName);
    }
    return typeOfLabel || varName;
  }

  processIdentifier(label, scope = "class" | "subroutine" | "") {
    let category = "";
    if (this.subroutineSymbolTable) {
      category = this.subroutineSymbolTable.kindOf(label);
    }
    if (!category && this.classSymbolTable) {
      category = this.classSymbolTable.kindOf(label) || scope;
    }

    let typeOfLabel = "";
    if (this.subroutineSymbolTable) {
      typeOfLabel = this.subroutineSymbolTable.typeOf(label);
    }
    if (!typeOfLabel) {
      typeOfLabel = this.classSymbolTable.typeOf(label);
    }

    let index = undefined;
    if (this.subroutineSymbolTable) {
      index = this.subroutineSymbolTable.indexOf(label);
    }
    if (index === undefined) {
      index = this.classSymbolTable.indexOf(label);
    }
    this.fileOutput += `${"\t".repeat(this.indent)}<identifier>${os.EOL}`;

    this.fileOutput += `${"\t".repeat(
      this.indent + 1
    )}<name>${this.tokenizer.currentTokenAsXML()}</name>${os.EOL}`;

    this.fileOutput += `${"\t".repeat(
      this.indent + 1
    )}<category>${category}</category>${os.EOL}`;

    this.fileOutput += `${"\t".repeat(
      this.indent + 1
    )}<type>${typeOfLabel}</type>${os.EOL}`;

    if (category !== scope) {
      this.fileOutput += `${"\t".repeat(
        this.indent + 1
      )}<index>${index}</index>${os.EOL}`;
    }
    this.fileOutput += `${"\t".repeat(this.indent)}</identifier>${os.EOL}`;
  }
}

class JackCompiler {
  fileOutput = "";
  filePathArr = [];
  tokenizer;

  constructor(filePathArray) {
    this.filePathArr = filePathArray;
  }
  main() {
    for (const filePath of this.filePathArr) {
      this.tokenizer = new Tokenizer(filePath);
      this.tokenizer.advance();
      this.fileOutput = "";
      const compilationDatabase = new CompilationDatabase(this.tokenizer);
      compilationDatabase.compileClass();
      // this.fileOutput = compilationDatabase.fileOutput;
      // this.close(filePath, false);
      this.fileOutput = compilationDatabase.vmWriter.outputString;
      this.writeVMOutput(filePath);
    }
  }

  close(filePath, tokens = true) {
    let fileExt = tokens ? "T-COMPILER.xml" : "-COMPILER.xml";
    fs.writeFile(filePath.replace(".jack", fileExt), this.fileOutput, (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log(
          `${filePath.replace(".jack", fileExt)}  written successfully`
        );
      }
    });
    this.fileOutput = "";
  }

  writeVMOutput(filePath) {
    let fileExt = ".compiler.vm";
    fs.writeFile(filePath.replace(".jack", fileExt), this.fileOutput, (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log(
          `${filePath.replace(".jack", fileExt)}  written successfully`
        );
      }
    });
    this.fileOutput = "";
  }
}

const SymbolType = Object.freeze({
  STATIC: Symbol("STATIC"),
  FIELD: Symbol("FIELD"),
  ARG: Symbol("ARG"),
  VAR: Symbol("VAR"),
});

class SymbolTable {
  symbols = {}; // Storage for hashtable
  kindCounters = {};
  name = "";

  constructor(name) {
    this.reset();
    this.name = name;
  }

  reset() {
    this.symbols = {}; // Storage for hashtable
    this.kindCounters = {
      static: 0,
      this: 0,
      argument: 0,
      local: 0,
    };
  }

  define(name, type, kind) {
    if (!this.symbols[name]) {
      this.symbols[name] = {
        name,
        type,
        kind,
        index: this.kindCounters[kind],
      };

      this.kindCounters[kind]++;
    } else {
      console.error(`Entry with name "${name}" already exists.`);
    }
  }

  varCount(kind) {
    return this.kindCounters[kind];
  }

  kindOf(name) {
    if (!this.symbols[name]) {
      return;
    }
    return this.symbols[name].kind;
  }

  typeOf(name) {
    if (!this.symbols[name]) {
      return;
    }
    return this.symbols[name].type;
  }

  indexOf(name) {
    if (!this.symbols[name]) {
      return;
    }
    return this.symbols[name].index;
  }
}

const SegmentTypes = Object.freeze({
  CONSTANT: Symbol("CONSTANT"),
  ARGUMENT: Symbol("ARGUMENT"),
  LOCAL: Symbol("LOCAL"),
  STATIC: Symbol("STATIC"),
  THIS: Symbol("THIS"),
  THAT: Symbol("THAT"),
  POINTER: Symbol("POINTER"),
  TEMP: Symbol("TEMP"),
});

class VMWriter {
  outputString = "";
  indent = 0;

  constructor() {
    this.outputString = "";
  }

  writePush(segment, index) {
    this.outputString += `${"\t".repeat(this.indent)}push ${segment} ${index}${
      os.EOL
    }`;
  }

  writePop(segment, index) {
    this.outputString += `${"\t".repeat(this.indent)}pop ${segment} ${index}${
      os.EOL
    }`;
  }

  writeArithmetic(command) {
    this.outputString += `${"\t".repeat(this.indent)}${command}${os.EOL}`;
  }

  writeLabel(label) {
    if (this.indent > 0) {
      this.indent -= 1;
    }
    this.outputString += `${"\t".repeat(this.indent)}label ${label}${os.EOL}`;
    this.indent++;
  }

  writeGoto(label) {
    this.outputString += `${"\t".repeat(this.indent)}goto ${label}${os.EOL}`;
  }

  writeIf(label) {
    this.outputString += `${"\t".repeat(this.indent)}if-goto ${label}${os.EOL}`;
  }

  writeCall(name, nArgs) {
    this.outputString += `${"\t".repeat(this.indent)}call ${name} ${nArgs}${
      os.EOL
    }`;
  }

  writeFunction(name, nVars) {
    if (this.indent > 0) {
      this.indent -= 1;
    }
    this.outputString += `${"\t".repeat(this.indent)}function ${name} ${nVars}${
      os.EOL
    }`;
    this.indent++;
  }

  writeReturn() {
    this.outputString += `${"\t".repeat(this.indent)}return${os.EOL}`;
  }

  getSymbolCmd(symbol) {
    let symbols = ["+", "-", "*", "/", "&amp;", "|", "&lt;", "&gt;", "="];
    switch (symbol) {
      case "+":
        this.writeArithmetic("add");
        break;
      case "-":
        this.writeArithmetic("sub");
        break;
      case "*":
        this.writeCall("Math.multiply", 2);
        break;
      case "/":
        this.writeCall("Math.divide", 2);
        break;
      case "&amp;":
        this.writeArithmetic("and");
        break;
      case "|":
        this.writeArithmetic("or");
        break;
      case "&lt;":
        this.writeArithmetic("lt");
        break;
      case "&gt;":
        this.writeArithmetic("gt");
        break;
      case "=":
        this.writeArithmetic("eq");
        break;
      default:
        break;
    }
  }

  close() {
    return this.outputString;
  }
}

const compiler = new JackCompiler(jackFiles);
compiler.main();
