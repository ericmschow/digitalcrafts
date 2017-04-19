def promptLo():
    return int(input("Where would you like to start? "))
def promptHi():
    return int(input("Where would you like to stop? "))

def looper(lBound, uBound):
    for i in range(lBound, uBound+1):
        print(i)
def checker(lBound, uBound):
    if lBound < uBound:
        looper(lBound, uBound)
    else:
        print("ERROR: start not less than end.")

#looper(promptLo(), promptHi())
checker(promptLo(), promptHi())
