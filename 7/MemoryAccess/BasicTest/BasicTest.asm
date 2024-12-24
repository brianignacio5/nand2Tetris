@10 // constant 10
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL // D=LCL
D=M // D=*LCL
@0
D=D+A // D=*LCL+0 => addr
@addr
M=D
@SP
M=M-1
A=M
D=M
@addr
A=M
M=D
@21 // constant 21
D=A
@SP
A=M
M=D
@SP
M=M+1
@22 // constant 22
D=A
@SP
A=M
M=D
@SP
M=M+1
@ARG // D=ARG
D=M // D=*ARG
@2
D=D+A // D=*ARG+2 => addr
@addr
M=D
@SP
M=M-1
A=M
D=M
@addr
A=M
M=D
@ARG // D=ARG
D=M // D=*ARG
@1
D=D+A // D=*ARG+1 => addr
@addr
M=D
@SP
M=M-1
A=M
D=M
@addr
A=M
M=D
@36 // constant 36
D=A
@SP
A=M
M=D
@SP
M=M+1
@THIS // D=THIS
D=M // D=*THIS
@6
D=D+A // D=*THIS+6 => addr
@addr
M=D
@SP
M=M-1
A=M
D=M
@addr
A=M
M=D
@42 // constant 42
D=A
@SP
A=M
M=D
@SP
M=M+1
@45 // constant 45
D=A
@SP
A=M
M=D
@SP
M=M+1
@THAT // D=THAT
D=M // D=*THAT
@5
D=D+A // D=*THAT+5 => addr
@addr
M=D
@SP
M=M-1
A=M
D=M
@addr
A=M
M=D
@THAT // D=THAT
D=M // D=*THAT
@2
D=D+A // D=*THAT+2 => addr
@addr
M=D
@SP
M=M-1
A=M
D=M
@addr
A=M
M=D
@510 // constant 510
D=A
@SP
A=M
M=D
@SP
M=M+1
@5 // TEMP
D=A
@6
D=D+A // D=(TEMP+6) => addr
@addr
M=D
@SP
M=M-1
A=M
D=M
@addr
A=M
M=D
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
@THAT // D=THAT
D=M // D=*THAT
@5
D=D+A // D=*THAT+5 => addr
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
@THIS // D=THIS
D=M // D=*THIS
@6
D=D+A // D=*THIS+6 => addr
A=D // @addr
D=M // D=*addr
@SP
A=M
M=D
@SP
M=M+1
@THIS // D=THIS
D=M // D=*THIS
@6
D=D+A // D=*THIS+6 => addr
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
@5 // D=TEMP
D=A
@6
D=D+A // D=(TEMP+6) => addr
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
