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
(Class1.set)
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
@Class1.0
M=D
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
@Class1.1
M=D
@0 // constant 0
D=A
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
(Class1.get)
@Class1.0
D=M
@SP
A=M
M=D
@SP
M=M+1
@Class1.1
D=M
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
(Class2.set)
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
@Class2.0
M=D
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
@Class2.1
M=D
@0 // constant 0
D=A
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
(Class2.get)
@Class2.0
D=M
@SP
A=M
M=D
@SP
M=M+1
@Class2.1
D=M
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
@6 // constant 6
D=A
@SP
A=M
M=D
@SP
M=M+1
@8 // constant 8
D=A
@SP
A=M
M=D
@SP
M=M+1
// call Class1.set 2
@Class1.set$ret.0
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
@2 // nArgs
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
// call goto function Class1.set
@Class1.set
0;JMP
(Class1.set$ret.0)
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
@23 // constant 23
D=A
@SP
A=M
M=D
@SP
M=M+1
@15 // constant 15
D=A
@SP
A=M
M=D
@SP
M=M+1
// call Class2.set 2
@Class2.set$ret.0
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
@2 // nArgs
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
// call goto function Class2.set
@Class2.set
0;JMP
(Class2.set$ret.0)
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
// call Class1.get 0
@Class1.get$ret.0
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
// call goto function Class1.get
@Class1.get
0;JMP
(Class1.get$ret.0)
// call Class2.get 0
@Class2.get$ret.0
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
// call goto function Class2.get
@Class2.get
0;JMP
(Class2.get$ret.0)
(Sys.init$END)
@Sys.init$END
0;JMP
