import shapes as sh
from turtle import *
from random import randint

def main():
    bgcolor('black')
    hideturtle()
    speed(0)
    def looper():
        for i in range(20):
            placerator()
            statsloop = stellerator()
            print ("In loop, tuple passed to star: ", statsloop)
            sh.star(statsloop[0], statsloop[1], statsloop[2])
            i =+ 1
    # sets turtle to random location
    def placerator():
        up()
        setx(randint(-200, 200))
        sety(randint(-200, 200))
        setheading(randint(0, 360))
        down()
    #returns tuple with random size and color
    def stellerator():
        col = ''
        size = randint(3, 8)
        colornum = randint(1, 4)
        if colornum == 1:
            col = 'white'
        elif colornum == 2:
            col = 'yellow'
        else:
            col = 'red'
        stats = (size, col, 'fill=True')
        # print(stats)
        return stats

    looper()

if __name__ == '__main__':
    main()
    mainloop()
