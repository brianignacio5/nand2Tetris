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
      !this.keywords.has(this.currentToken) &&
      lastCharRead !== " " &&
      !this.symbols.has(lastCharRead)
    ) {
      this.currentToken += lastCharRead;
      lastCharRead = this.fileInput[++this.currentIndex];
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
  tokenizer = null;
  indent = 0;

  constructor(tokenizer) {
    this.tokenizer = tokenizer;
  }

  compileClass() {
    this.fileOutput += `${"\t".repeat(this.indent)}<class>${os.EOL}`;
    this.indent += 1;
    this.processStr("class");
    this.processStr(this.tokenizer.currentToken);
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
    this.processStr(["static", "field"]);
    this.processStr(["int", "char", "boolean", this.tokenizer.identifier()]);
    this.processStr(this.tokenizer.currentToken);
    while (this.tokenizer.currentToken === ",") {
      this.processStr(",");
      this.processStr(this.tokenizer.identifier());
    }
    this.processStr(";");
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</classVarDec>${os.EOL}`;
  }

  compileSubroutine() {
    this.fileOutput += `${"\t".repeat(this.indent)}<subroutineDec>${os.EOL}`;
    this.indent += 1;
    this.processStr(["constructor", "function", "method"]);
    this.processStr([
      "void",
      "int",
      "char",
      "boolean",
      this.tokenizer.identifier(),
    ]);
    this.processStr(this.tokenizer.currentToken);
    this.processStr("(");
    this.compileParameterList();
    this.processStr(")");
    this.compileSubroutineBody();
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</subroutineDec>${os.EOL}`;
  }

  compileParameterList() {
    this.fileOutput += `${"\t".repeat(this.indent)}<parameterList>${os.EOL}`;
    if (
      this.tokenizer.currentToken === "int" ||
      this.tokenizer.currentToken === "char" ||
      this.tokenizer.currentToken === "boolean" ||
      this.tokenizer.identifier() === "identifier"
    ) {
      this.indent += 1;
      this.processStr(["int", "char", "boolean", this.tokenizer.identifier()]);
      this.processStr(this.tokenizer.identifier());
      while (this.tokenizer.currentToken === ",") {
        this.processStr(",");
        this.processStr([
          "int",
          "char",
          "boolean",
          this.tokenizer.identifier(),
        ]);
        this.processStr(this.tokenizer.identifier());
      }
      this.indent -= 1;
    }
    this.fileOutput += `${"\t".repeat(this.indent)}</parameterList>${os.EOL}`;
  }

  compileSubroutineBody() {
    this.fileOutput += `${"\t".repeat(this.indent)}<subroutineBody>${os.EOL}`;
    this.indent += 1;
    this.processStr("{");
    while (this.tokenizer.currentToken === "var") {
      this.compileVarDec();
    }
    this.compileStatements();
    this.processStr("}");
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</subroutineBody>${os.EOL}`;
  }

  compileVarDec() {
    this.fileOutput += `${"\t".repeat(this.indent)}<varDec>${os.EOL}`;
    this.indent += 1;
    this.processStr("var");
    this.processStr(["int", "char", "boolean", this.tokenizer.identifier()]);
    this.processStr(this.tokenizer.identifier());
    while (this.tokenizer.currentToken === ",") {
      this.processStr(",");
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
    this.processStr(this.tokenizer.identifier());
    if (this.tokenizer.currentToken === "[") {
      this.processStr("[");
      this.compileExpression();
      this.processStr("]");
    }
    this.processStr("=");
    this.compileExpression();
    this.processStr(";");
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
    this.processStr("{");
    this.compileStatements();
    this.processStr("}");
    if (this.tokenizer.currentToken === "else") {
      this.processStr("else");
      this.processStr("{");
      this.compileStatements();
      this.processStr("}");
    }
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</ifStatement>${os.EOL}`;
  }

  compileWhile() {
    this.fileOutput += `${"\t".repeat(this.indent)}<whileStatement>${os.EOL}`;
    this.indent += 1;
    this.processStr("while");
    this.processStr("(");
    this.compileExpression();
    this.processStr(")");
    this.processStr("{");
    this.compileStatements();
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
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</doStatement>${os.EOL}`;
  }

  compileReturn() {
    this.fileOutput += `${"\t".repeat(this.indent)}<returnStatement>${os.EOL}`;
    this.indent += 1;
    this.processStr("return");
    if (this.tokenizer.currentToken !== ";") {
      this.compileExpression(); // optional
    }
    this.processStr(";");
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
      this.processStr(this.tokenizer.symbol());
      this.fileOutput += `${"\t".repeat(this.indent)}<term>${os.EOL}`;
      this.indent += 1;
      this.compileTerm();
    }
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</term>${os.EOL}`;
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</expression>${os.EOL}`;
  }

  compileTerm() {
    let varName = this.tokenizer.identifier();
    if (varName) {
      this.processStr(varName);
      if (this.tokenizer.currentToken === "[") {
        // Check for varname[expression]
        this.processStr("[");
        this.compileExpression();
        this.processStr("]");
      } else if (this.tokenizer.currentToken === "(") {
        // Check for varname(expressionList)
        this.processStr("(");
        this.compileExpressionList();
        this.processStr(")");
      } else if (this.tokenizer.currentToken === ".") {
        this.processStr(".");
        this.processStr(this.tokenizer.identifier());
        this.processStr("(");
        this.compileExpressionList();
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
      this.processStr(["~", "-"]);
      this.fileOutput += `${"\t".repeat(this.indent)}<term>${os.EOL}`;
      this.indent += 1;
      this.compileTerm();
      this.fileOutput += `${"\t".repeat(this.indent)}</term>${os.EOL}`;
      this.indent -= 1;
    } else {
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
    if (this.tokenizer.currentToken !== ")") {
      this.compileExpression();
      while (this.tokenizer.currentToken === ",") {
        this.processStr(",");
        this.compileExpression();
      }
    }
    this.indent -= 1;
    this.fileOutput += `${"\t".repeat(this.indent)}</expressionList>${os.EOL}`;
  }

  processStr(str) {
    const tokenType = this.tokenizer.tokenTypeAsString();
    const tokenValue = this.tokenizer.currentTokenAsXML();
    if (str instanceof Array) {
      for (const strElem of str) {
        if (tokenValue === strElem) {
          this.fileOutput += `${"\t".repeat(
            this.indent
          )}<${tokenType}> ${this.tokenizer.currentTokenAsXML()} </${tokenType}>${
            os.EOL
          }`;
          break;
        }
      }
    } else if (tokenValue === str) {
      this.fileOutput += `${"\t".repeat(
        this.indent
      )}<${tokenType}> ${this.tokenizer.currentTokenAsXML()} </${tokenType}>${
        os.EOL
      }`;
    } else {
      this.fileOutput += "syntax error for " + str + os.EOL;
    }
    this.tokenizer.advance();
  }
}

class JackAnalyzer {
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
      this.fileOutput = compilationDatabase.fileOutput;
      this.close(filePath, false);
    }
  }

  tokens() {
    for (const filePath of this.filePathArr) {
      this.tokenizer = new Tokenizer(filePath);
      this.tokenizer.advance();
      this.generateTokens();
    }
  }

  generateTokens(filepath) {
    this.fileOutput = "";
    this.fileOutput += `<tokens>${os.EOL}`;
    do {
      this.tokenizer.advance();
      const tokenType = this.tokenizer.tokenTypeAsString();
      this.fileOutput += `<${tokenType}> ${this.tokenizer.currentTokenAsXML()} </${tokenType}>${
        os.EOL
      }`;
    } while (this.tokenizer.hasMoreTokens());
    this.fileOutput += `</tokens>${os.EOL}`;
    this.close(filepath);
  }

  close(filePath, tokens = true) {
    let fileExt = tokens ? "T-NEW.xml" : "-NEW.xml";
    fs.writeFile(
      filePath.replace(".jack", fileExt),
      analyzer.fileOutput,
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log(
            `${filePath.replace(".jack", fileExt)}  written successfully`
          );
        }
      }
    );
    this.fileOutput = "";
  }
}

const analyzer = new JackAnalyzer(jackFiles);
analyzer.main();
