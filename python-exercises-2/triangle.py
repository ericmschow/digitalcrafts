def promptHeight():
    return int(input("What is the height? "))

def looper(height):
    for i in range(1, height+1):
        # print(i) # debug print line
        print(
        " " * (height - i),
        "*" * (2 * i - 1),
        " " * (height - i)
        )


#checks whether user inputs are positive
def checker(lBound):
    # print(lBound) # debug print line
    if lBound > 0:
        looper(lBound)
    else:
        print("ERROR: size cannot be <= 0.")

checker(promptHeight())
