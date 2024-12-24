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
@SP
M=M-1
A=M
D=M
@THAT
M=D // THAT=*SP
@0 // constant 0
D=A
@SP
A=M
M=D
@SP
M=M+1
@THAT // D=THAT
D=M // D=*THAT
@0
D=D+A // D=*THAT+0 => addr
@addr
M=D
@SP
M=M-1
A=M
D=M
@addr
A=M
M=D
@1 // constant 1
D=A
@SP
A=M
M=D
@SP
M=M+1
@THAT // D=THAT
D=M // D=*THAT
@1
D=D+A // D=*THAT+1 => addr
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
@0
D=D+A // D=*ARG+0 => addr
A=D // @addr
D=M // D=*addr
@SP
A=M
M=D
@SP
M=M+1
@2 // constant 2
D=A
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
(LOOP)
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
@SP
M=M-1
A=M
D=M
@COMPUTE_ELEMENT
D;JNE
@END
0;JMP
(COMPUTE_ELEMENT)
@THAT // D=THAT
D=M // D=*THAT
@0
D=D+A // D=*THAT+0 => addr
A=D // @addr
D=M // D=*addr
@SP
A=M
M=D
@SP
M=M+1
@THAT // D=THAT
D=M // D=*THAT
@1
D=D+A // D=*THAT+1 => addr
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

@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@1 // constant 1
D=A
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
@SP
M=M-1
A=M
D=M
@THAT
M=D // THAT=*SP
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
@1 // constant 1
D=A
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
@LOOP
0;JMP
(END)
