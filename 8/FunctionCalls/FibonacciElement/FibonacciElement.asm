// Bootstrap code
@256
D=A
@SP
M=D
// call Sys.init 0
@Sys.init$ret.0
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
// call goto function Sys.init
@Sys.init
0;JMP
(Sys.init$ret.0)
(Main.fibonacci)
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
// LT
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@lt_0_true
D;JLT
// lt_0_false
D=0
@lt_0_end
0;JMP
(lt_0_true)
D=-1
(lt_0_end)
@SP
A=M
M=D
@SP
M=M+1
@SP
M=M-1
A=M
D=M
@Main.fibonacci$N_LT_2
D;JNE
@Main.fibonacci$N_GE_2
0;JMP
(Main.fibonacci$N_LT_2)
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
(Main.fibonacci$N_GE_2)
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
// call Main.fibonacci 1
@Main.fibonacci$ret.0
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
// call goto function Main.fibonacci
@Main.fibonacci
0;JMP
(Main.fibonacci$ret.0)
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
// call Main.fibonacci 1
@Main.fibonacci$ret.1
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
// call goto function Main.fibonacci
@Main.fibonacci
0;JMP
(Main.fibonacci$ret.1)
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
(Sys.init)
@4 // constant 4
D=A
@SP
A=M
M=D
@SP
M=M+1
// call Main.fibonacci 1
@Main.fibonacci$ret.2
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
// call goto function Main.fibonacci
@Main.fibonacci
0;JMP
(Main.fibonacci$ret.2)
(Sys.init$END)
@Sys.init$END
0;JMP
