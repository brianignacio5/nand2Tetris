// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/4/Fill.asm

// Runs an infinite loop that listens to the keyboard input. 
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel. When no key is pressed, 
// the screen should be cleared.

(INIT)
@KBD
D=M
@BLACK
D;JGT

(WHITE)
@screen_color
M=0
@LSTART
0;JMP

(BLACK)
@screen_color
M=-1

(LSTART)
@SCREEN
D=A
@addr
M=D
@8191
D=A
@screen_end
M=D // 8K Memory
(LOOP)
// Get screen scolor
@screen_color
D=M 
// RAM[SCREEN + i] = 0
@addr
A=M
M=D
// addr + 1
@addr
M=M+1
//decrement n
@screen_end
M=M-1
@LOOP
M;JGE
//Go back to check key pressed
@INIT
0;JMP
