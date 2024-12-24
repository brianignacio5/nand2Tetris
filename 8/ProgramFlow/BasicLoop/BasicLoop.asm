@0 // constant 0
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
@LOOP
D;JNE
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
