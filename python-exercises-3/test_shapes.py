import shapes as sh
from turtle import *

def test(size, color, fill='Default'): # runs all shapes
    sh.triangle(size, color)
    #forward(300)
    sh.square(size, color)
    #forward(300)
    sh.pentagon(size, color)
    #forward(300)
    sh.hexagon(size, color)
    #forward(300)
    sh.octagon(size, color)
    #forward(300)
    sh.star(size, color)
    #forward(300)
    sh.circler(size, color)
    #forward(300)
    #mainloop()

def tritest():
    sh.triangle(50, 'red')

def squaretest():
    sh.square(100, 'blue', fill=True)

if __name__ == '__main__':
    test(50, 'green')
    #tritest()
    #squaretest()
    mainloop()
