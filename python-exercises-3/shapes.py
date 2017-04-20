from turtle import *

def triangle(size, col, fill="Default"):
    if fill == True:
        begin_fill()
    color(col)
    for i in range(3):
        forward(int(size))
        left(120)
        i =+ 1
    if fill == True:
        end_fill()
    #mainloop()

def square(size, col, fill="Default"):
    if fill == True:
        begin_fill()
    color(col)
    for i in range(4):
        forward(int(size))
        left(90)
        i =+ 1
    if fill == True:
        end_fill()
    #mainloop()

def pentagon(size, col, fill="Default"):
    if fill == True:
        begin_fill()
    color(col)
    for i in range(5):
        forward(int(size))
        left(72)
        i =+ 1
    if fill == True:
        end_fill()
    #mainloop()


def hexagon(size, col, fill="Default"):
    if fill == True:
        begin_fill()
    color(col)
    for i in range(6):
        forward(int(size))
        left(60)
        i =+ 1
    if fill == True:
        end_fill()
    #mainloop()


def octagon(size, col, fill="Default"):
    if fill == True:
        begin_fill()
    color(col)
    for i in range(8):
        forward(int(size))
        left(45)
        i =+ 1
    if fill == True:
        end_fill()
    #mainloop()


def star(size, col, fill="Default"):
    if fill == True:
        begin_fill()
    color(col)
    for i in range(5):
        forward(int(size))
        left(144)
        i =+ 1
    if fill == True:
        end_fill()
    #mainloop()

    #mainloop()

def circler(size, col, fill="Default"):
    if fill == True:
        begin_fill()
    color(col)
    circle(size)
    if fill == True:
        end_fill()
    #mainloop()
