def promptWidth():
    return int(input("What is the width? "))
def promptHeight():
    return int(input("What is the height? "))

def looper(height, width):
    for i in range(height):
        print(i)



#checks whether user inputs are positive
def checker(lBound, uBound):
    if lBound > 0 or uBound > 0:
        looper(lBound, uBound)
    else:
        print("ERROR: size cannot be <= 0.")

checker(promptWidth(), promptHeight())
