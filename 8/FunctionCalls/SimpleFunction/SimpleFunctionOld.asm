(SimpleFunction.test)
@LCL // D=LCL
D=M // D=*LCL
@0
D=D+A // D=*LCL+0 => addr
A=D // @addr
D=M // D=*addr
@SP
A=M
M=D
@SP
M=M+1
@LCL // D=LCL
D=M // D=*LCL
@1
D=D+A // D=*LCL+1 => addr
A=D // @addr
D=M // D=*addr
@SP
A=M
M=D
@SP
M=M+1
@LCL // D=LCL
D=M // D=*LCL
@0
D=D+A // D=*LCL+0 => addr
A=D // @addr
D=M // D=*addr
@SP
A=M
M=D
@SP
M=M+1
@LCL // D=LCL
D=M // D=*LCL
@1
D=D+A // D=*LCL+1 => addr
A=D // @addr
D=M // D=*addr
@SP
A=M
M=D
@SP
M=M+1
// Add
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=D+M
@SP
A=M
M=D
@SP
M=M+1
// NOT
@SP
M=M-1
A=M
D=M
D=!D;
@SP
A=M
M=D
@SP
M=M+1
@ARG // D=ARG
D=M // D=*ARG
@0
D=D+A // D=*ARG+0 => addr
A=D // @addr
D=M // D=*addr
@SP
A=M
M=D
@SP
M=M+1
// Add
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=D+M
@SP
A=M
M=D
@SP
M=M+1
@ARG // D=ARG
D=M // D=*ARG
@1
D=D+A // D=*ARG+1 => addr
A=D // @addr
D=M // D=*addr
@SP
A=M
M=D
@SP
M=M+1
// Sub
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@SP
A=M
M=D
@SP
M=M+1
//Return
@LCL
D=M // LCL
@5
D=D-A // LCL-5
A=D
D=M // *(LCL - 5)
@retAddr
M=D
@ARG // D=ARG
D=M // D=*ARG
@0
D=D+A // D=*ARG+0 => addr
@addr
M=D
@SP
M=M-1
A=M
D=M
@addr
A=M
M=D
// Put return value to caller
@ARG
A=M+1
D=A
@SP
M=D
// Restore THAT
@LCL
D=M
@1
A=D-A // LCL - 1
D=M
@THAT // THAT = *(LCL - 1)
M=D
// Restore THIS
@LCL
D=M
@2
A=D-A // LCL - 2
D=M
@THIS
M=D // THIS = *(LCL - 2)
// Restore ARG
@LCL
D=M
@3
A=D-A // LCL - 3
D=M
@ARG
M=D // ARG = *(LCL - 3)
// Restore LCL
@LCL
D=M
@4
A=D-A // LCL - 4
D=M
@LCL
M=D // LCL = *(LCL - 4)
// go to return address
@retAddr
A=M
0;JMP
