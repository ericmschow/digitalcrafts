def promptWidth():
    return int(input("What is the width? "))
def promptHeight():
    return int(input("What is the height? "))

def looper(height, width):
    for i in range(height):
        #print(i)
        if i == 0 or i == height - 1:
            print("*" * width)
        else:
            print("*" + " " * (width - 2) + "*")

#checks whether user inputs are positive
def checker(lBound, uBound):
    print(lBound, uBound, sep=' ')
    if lBound > 0 and uBound > 0:
        looper(lBound, uBound)
    else:
        print("ERROR: size cannot be <= 0.")

checker(promptWidth(), promptHeight())
