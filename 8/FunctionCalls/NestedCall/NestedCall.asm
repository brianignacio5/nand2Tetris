// Bootstrap code
@256
D=A
@SP
M=D
// call Sys.Sys.init 0
@Sys.Sys.init$ret.0
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
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
// ARG = SP - 5 - nArgs
@SP
D=M
@5
D=D-A
@0 // nArgs
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
// call goto function Sys.Sys.init
@Sys.Sys.init
0;JMP
(Sys.Sys.init$ret.0)
(Sys.Sys.init)
@4000 // constant 4000
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
@5000 // constant 5000
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
// call Sys.Sys.main 0
@Sys.Sys.main$ret.0
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
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
// ARG = SP - 5 - nArgs
@SP
D=M
@5
D=D-A
@0 // nArgs
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
// call goto function Sys.Sys.main
@Sys.Sys.main
0;JMP
(Sys.Sys.main$ret.0)
@5 // TEMP
D=A
@1
D=D+A // D=(TEMP+1) => addr
@addr
M=D
@SP
M=M-1
A=M
D=M
@addr
A=M
M=D
(Sys.Sys.init$LOOP)
@Sys.Sys.init$LOOP
0;JMP
(Sys.Sys.main)
// Local 0 
@0 // constant 0
D=A
@SP
A=M
M=D
@SP
M=M+1
// Local 1 
@0 // constant 0
D=A
@SP
A=M
M=D
@SP
M=M+1
// Local 2 
@0 // constant 0
D=A
@SP
A=M
M=D
@SP
M=M+1
// Local 3 
@0 // constant 0
D=A
@SP
A=M
M=D
@SP
M=M+1
// Local 4 
@0 // constant 0
D=A
@SP
A=M
M=D
@SP
M=M+1
@4001 // constant 4001
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
@5001 // constant 5001
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
@200 // constant 200
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL // D=LCL
D=M // D=*LCL
@1
D=D+A // D=*LCL+1 => addr
@addr
M=D
@SP
M=M-1
A=M
D=M
@addr
A=M
M=D
@40 // constant 40
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL // D=LCL
D=M // D=*LCL
@2
D=D+A // D=*LCL+2 => addr
@addr
M=D
@SP
M=M-1
A=M
D=M
@addr
A=M
M=D
@6 // constant 6
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL // D=LCL
D=M // D=*LCL
@3
D=D+A // D=*LCL+3 => addr
@addr
M=D
@SP
M=M-1
A=M
D=M
@addr
A=M
M=D
@123 // constant 123
D=A
@SP
A=M
M=D
@SP
M=M+1
// call Sys.Sys.add12 1
@Sys.Sys.add12$ret.0
D=A
@SP
A=M
M=D
@SP
M=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
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
// ARG = SP - 5 - nArgs
@SP
D=M
@5
D=D-A
@1 // nArgs
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
// call goto function Sys.Sys.add12
@Sys.Sys.add12
0;JMP
(Sys.Sys.add12$ret.0)
@5 // TEMP
D=A
@0
D=D+A // D=(TEMP+0) => addr
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
@2
D=D+A // D=*LCL+2 => addr
A=D // @addr
D=M // D=*addr
@SP
A=M
M=D
@SP
M=M+1
@LCL // D=LCL
D=M // D=*LCL
@3
D=D+A // D=*LCL+3 => addr
A=D // @addr
D=M // D=*addr
@SP
A=M
M=D
@SP
M=M+1
@LCL // D=LCL
D=M // D=*LCL
@4
D=D+A // D=*LCL+4 => addr
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
//Return
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
(Sys.Sys.add12)
@4002 // constant 4002
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
@5002 // constant 5002
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
@12 // constant 12
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
//Return
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
