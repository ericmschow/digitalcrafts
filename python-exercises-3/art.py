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
k = 2
# below constants used to adjust for origin discrepancy
w = -1215/2
h = -506/2
sizes = {
    1 : 122,
    2 : 138,
    3 : 168
}

# maps each triangle to coords
x = 0
y = 0
size = 1
r = 1.73
tris = {
    32 : (538, 226, 2, 'Blue1', 0), # little blue top center
    31 : (538, 280, 2, 'Grey1', 1), # little grey bottom center
    30 : (438, 107, 3, 'Blue2', 1), # big blue top center
    29 : (607, 399, 3, 'Grey4', 0), # big grey right of 2
    17 : (292, 146, 3, 'Green2', 0), #right green quad
    24 : (293, 146, 1, 'Green1', 1), #small green
    25 : (354, 252, 3, 'Green3', 0), #dark green
    16 : (209, 0, 3, 'Green2', 1), # top left dark green quad
    1 : (0, 146, 3, 'Green1', 0), # green left trap
    8 : (84, 0, 3, 'Green1', 1), # green center trap
    9 : (124, 146, 3, 'Green1', 0), # green right trap
    26 : (354, 252, 3, 'Blue3', 1), # blue 3
    23 : (293, 360, 1, 'Blue1', 0), #small blue
    18 : (292, 360, 3, 'Blue2', 1), #right blue quad
    15 : (208, 505, 3, 'Blue2', 0), #left blue quad
    7 : (83, 506, 3, 'Blue1', 0), # blue center trap
    2 : (2, 360, 3, 'Blue1', 1), # blue left trap
    10 : (124, 360, 3, 'Blue1', 1), # blue right trap
    27 : (692, 253, 3, 'Orange3', 1), # gross orange
    28 : (692, 253, 3, 'Grey3', 0), # mid gray above gross orange
    22 : (800, 359, 1, 'Orange1', 0), # small orange
    14 : (838, 505, 3, 'Orange2', 0), # orange right quad
    19 : (755, 359, 3, 'Orange2', 1), # orange left quad
    11 : (923, 360, 3, 'Orange1', 1), # orange left trap
    6 : (1006, 506, 3, 'Orange1', 0), # orange center trap
    3 : (1088, 360, 3, 'Orange1', 1), # orange right trap
    21 : (799, 146, 1, 'Grey1', 1), # small grey
    13 : (837, 1, 3, 'Grey2', 1), # grey right quad
    20 : (754, 146, 3, 'Grey2', 0), # grey left quad
    12 : (923, 146, 3, 'Grey1', 0), # grey left trap
    5 : (1007, 0, 3, 'Grey1', 1), # grey center trap
    4 : (1092, 145, 3, 'Grey1', 0) # grey right trap
}


def main():
    ###setworldcoordinates(0, 620, 1220, 115)
    #screensize(canvwidth=1215, canvheight=506)
    #setup(width=1215*2, height=506*2)
    speed(00)
    def looper():
        for i in range(1, 33):
            triTuple = tris[i]
            placerator(triTuple[0], triTuple[1])
            if triTuple[4] == 1:
                makeTri(triTuple[2], triTuple[3], flip=True)
            else:
                makeTri(triTuple[2], triTuple[3])

    # makes tri given 1/2/3 or Color#
    def makeTri(siz, col, flip='Default'):
        if flip == True:
            sh.triangleFlip((sizes[siz])/k, colors[col], fill=True)
        else:
            sh.triangle((sizes[siz])/k, colors[col], fill=True)


    def placerator(xcoord, ycoord):
        up()
        setx((int(xcoord)+w)/k)
        sety(-(int(ycoord)+h)/k)
        down()

    # count the number of triangles that have been made
    def trackTri():
        pass

    #makeTri(100, colors['Green1'[0]], colors['Green1'[1]], colors['Green1'[2]])
    #makeTri(3, 'Orange3')
    #makeTri(2, 'Green2', flip=True)
    #makeTri(1, 'Grey4')
    looper()
    hideturtle()

if __name__ == '__main__':
    main()
    mainloop()
