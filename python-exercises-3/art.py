import shapes as sh
from turtle import *

# logo has three sizes of triangles
# logo has 13 colors:
#   3 shades each of green, blue, orange, and grey
colors = {
   'Green1' : '#7BC242',
   'Green2' : '#5B893E',
   'Green3' : '#447764',
   'Blue1' : '#1E8ECE',
   'Blue2' : '#0D6FB8',
   'Blue3' : '#1466A2',
   'Grey1' : '#BCBDBF',
   'Grey2' : '#A6AAAB',
   'Grey3' : '#949597',
   'Grey4' : '#6D6E70',
   'Orange1' : '#F89F1F',
   'Orange2' : '#F47820',
   'Orange3' : '#C28254'
    }
# 3 sizes, 1, 2, 3
sizes = {
    1 : 37.5,
    2 : 87.5/2,
    3: 50
}
# maps each triangle to coords
x = 0
y = 0
size = 1
tris = {
    1 : (-100, -100, 3, 'Green1', 0),
    2 : (90, 125, 3, 'Green1', 1),
    3 : (100, 100, 3, 'Green1', 0), #upper left 3 < ^
    4 : (-100, 100, 3, 'Green2', 1),
    5 : (100, -100, 3, 'Green2', 0), #top left dark green
    6 : (-150, 75, 1, 'Green1', 1), #small green
    7 : (-150, -150, 3, 'Green3', 0),
    8 : (100, 150, 3, 'Blue2', 1), # big blue top center
    9 : (0, 50/4, 2, 'Blue1', 0), # little blue top center
    10 : (0, -50/4, 2, 'Grey1', 1), # little grey bottom center
    11 : (x, y, size, 'color', 0),
    12 : (x, y, size, 'color', 0),
    13 : (x, y, size, 'color', 0),
    14 : (x, y, size, 'color', 0),
    15 : (x, y, size, 'color', 0),
    16 : (x, y, size, 'color', 0),
    17 : (x, y, size, 'color', 0),
    18 : (x, y, size, 'color', 0),
    19 : (x, y, size, 'color', 0),
    20 : (x, y, size, 'color', 0),
    21 : (x, y, size, 'color', 0),
    22 : (x, y, size, 'color', 0),
    23 : (x, y, size, 'color', 0),
    24 : (x, y, size, 'color', 0),
    25 : (x, y, size, 'color', 0),
    26 : (x, y, size, 'color', 0),
    27 : (x, y, size, 'color', 0),
    28 : (x, y, size, 'color', 0),
    29 : (x, y, size, 'color', 0),
    30 : (x, y, size, 'color', 0),
    31 : (x, y, size, 'color', 0),
    32 : (x, y, size, 'color', 0),
}

def main():
    def looper():
        for i in range(1, 11):
            triTuple = tris[i]
            placerator(triTuple[0], triTuple[1])
            if triTuple[4] == 1:
                makeTri(triTuple[2], triTuple[3], flip=True)
            else:
                makeTri(triTuple[2], triTuple[3])

    # makes tri given 1/2/3 or Color#
    def makeTri(siz, col, flip='Default'):
        if flip == True:
            sh.triangleFlip(sizes[siz], colors[col], fill=True)
        else:
            sh.triangle(sizes[siz], colors[col], fill=True)


    def placerator(xcoord, ycoord):
        up()
        setx(int(xcoord))
        sety(int(ycoord))
        down()

    # count the number of triangles that have been made
    def trackTri():
        pass

    #makeTri(100, colors['Green1'[0]], colors['Green1'[1]], colors['Green1'[2]])
    #makeTri(3, 'Orange3')
    #makeTri(2, 'Green2', flip=True)
    #makeTri(1, 'Grey4')
    looper()

if __name__ == '__main__':
    main()
    mainloop()
