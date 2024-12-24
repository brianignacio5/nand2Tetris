@3030 // constant 3030
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
M=M-1
A=M
D=M
@THIS
M=D // THIS=*SP
@3040 // constant 3040
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
M=M-1
A=M
D=M
@THAT
M=D // THAT=*SP
@32 // constant 32
D=A
@SP
A=M
M=D
@SP
M=M+1
@THIS // D=THIS
D=M // D=*THIS
@2
D=D+A // D=*THIS+2 => addr
@addr
M=D
@SP
M=M-1
A=M
D=M
@addr
A=M
M=D
@46 // constant 46
D=A
@SP
A=M
M=D
@SP
M=M+1
@THAT // D=THAT
D=M // D=*THAT
@6
D=D+A // D=*THAT+6 => addr
@addr
M=D
@SP
M=M-1
A=M
D=M
@addr
A=M
M=D

@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1

@THAT
D=M
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
@THIS // D=THIS
D=M // D=*THIS
@2
D=D+A // D=*THIS+2 => addr
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
@THAT // D=THAT
D=M // D=*THAT
@6
D=D+A // D=*THAT+6 => addr
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
