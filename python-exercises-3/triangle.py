from turtle import *

def triangle(size, col, fill="Default"):
    color(col)
    if fill == True:
        begin_fill()
    for i in range(3):
        forward(int(size))
        left(120)
        i =+ 1
    end_fill()
    #mainloop()


if __name__ == '__main__':
    triangle(100, 'green2', fill=True)
    triangle(90, 'forest green', fill=True)
    triangle(80, 'dark green', fill=True)
    triangle(70, 'green yellow', fill=True)
    mainloop()
