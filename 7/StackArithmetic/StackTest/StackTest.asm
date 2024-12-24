@17 // constant 17
D=A
@SP
A=M
M=D
@SP
M=M+1
@17 // constant 17
D=A
@SP
A=M
M=D
@SP
M=M+1
// EQ
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@eq_0_true
D;JEQ
// eq_0_false
D=0
@eq_0_end
0;JMP
(eq_0_true)
D=-1
(eq_0_end)
@SP
A=M
M=D
@SP
M=M+1
@17 // constant 17
D=A
@SP
A=M
M=D
@SP
M=M+1
@16 // constant 16
D=A
@SP
A=M
M=D
@SP
M=M+1
// EQ
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@eq_1_true
D;JEQ
// eq_1_false
D=0
@eq_1_end
0;JMP
(eq_1_true)
D=-1
(eq_1_end)
@SP
A=M
M=D
@SP
M=M+1
@16 // constant 16
D=A
@SP
A=M
M=D
@SP
M=M+1
@17 // constant 17
D=A
@SP
A=M
M=D
@SP
M=M+1
// EQ
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@eq_2_true
D;JEQ
// eq_2_false
D=0
@eq_2_end
0;JMP
(eq_2_true)
D=-1
(eq_2_end)
@SP
A=M
M=D
@SP
M=M+1
@892 // constant 892
D=A
@SP
A=M
M=D
@SP
M=M+1
@891 // constant 891
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
@891 // constant 891
D=A
@SP
A=M
M=D
@SP
M=M+1
@892 // constant 892
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
@lt_1_true
D;JLT
// lt_1_false
D=0
@lt_1_end
0;JMP
(lt_1_true)
D=-1
(lt_1_end)
@SP
A=M
M=D
@SP
M=M+1
@891 // constant 891
D=A
@SP
A=M
M=D
@SP
M=M+1
@891 // constant 891
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
@lt_2_true
D;JLT
// lt_2_false
D=0
@lt_2_end
0;JMP
(lt_2_true)
D=-1
(lt_2_end)
@SP
A=M
M=D
@SP
M=M+1
@32767 // constant 32767
D=A
@SP
A=M
M=D
@SP
M=M+1
@32766 // constant 32766
D=A
@SP
A=M
M=D
@SP
M=M+1
// GT
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@gt_0_true
D;JGT
// gt_0_false
D=0
@gt_0_end
0;JMP
(gt_0_true)
D=-1
(gt_0_end)
@SP
A=M
M=D
@SP
M=M+1
@32766 // constant 32766
D=A
@SP
A=M
M=D
@SP
M=M+1
@32767 // constant 32767
D=A
@SP
A=M
M=D
@SP
M=M+1
// GT
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@gt_1_true
D;JGT
// gt_1_false
D=0
@gt_1_end
0;JMP
(gt_1_true)
D=-1
(gt_1_end)
@SP
A=M
M=D
@SP
M=M+1
@32766 // constant 32766
D=A
@SP
A=M
M=D
@SP
M=M+1
@32766 // constant 32766
D=A
@SP
A=M
M=D
@SP
M=M+1
// GT
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=M-D
@gt_2_true
D;JGT
// gt_2_false
D=0
@gt_2_end
0;JMP
(gt_2_true)
D=-1
(gt_2_end)
@SP
A=M
M=D
@SP
M=M+1
@57 // constant 57
D=A
@SP
A=M
M=D
@SP
M=M+1
@31 // constant 31
D=A
@SP
A=M
M=D
@SP
M=M+1
@53 // constant 53
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
@112 // constant 112
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
// Neg
@SP
M=M-1
A=M
D=M
D=-D
@SP
A=M
M=D
@SP
M=M+1
// AND
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=D&M;
@SP
A=M
M=D
@SP
M=M+1
@82 // constant 82
D=A
@SP
A=M
M=D
@SP
M=M+1
// OR
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
D=D|M;
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
