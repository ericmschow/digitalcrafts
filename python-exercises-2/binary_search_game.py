#!/usr/bin/env python3


# prompts user for whether guess is higher, lower, or correct and returns string
def getStringResponse(num):
    print("My guess is: {}".format(num))
    return(input("Was my guess too high, too low, or correct? \n> "))

# parses user string, sets direction to 1 if low, or 2 if high
def stringParser(response):
    global direction
    if "correct" in response.lower():
    #    print("DEBUG> stringParser returned 0: correct") # DEBUG
        direction = 0
    elif "low" in response.lower():
    #    print("DEBUG> stringParser returned 1: too low") # DEBUG
        direction = 1
    elif "high" in response.lower():
    #    print("DEBUG> stringParser returned 2: too high") # DEBUG
        direction = 2
    else:
        print("I don't understand. Ending.")        # TODO add reinitialize somehow
        quit(1)

# calls above two functions properly
def getDirection(arg):
    return stringParser(getStringResponse(arg))

def start():
    #guess = 50
    while direction != 0:
        #print("Loop pre func Guess is: ", guess)
        #print("Loop pre func Direction is: ", direction)
        #print("Loop pre func minGuess is: ", minGuess, " and maxGuess is: ", maxGuess)
        #print("Tuple pre binarySearch is: ", limits)
        limits = binarySearch() # stores limits in tuple
        #print("Tuple post binarySearch is: ", limits)
        global guess
        guess = guesser(limits)
        getDirection(guess)
        #print("Loop post func Guess is: ", guess)
        #print("Loop post Direction is: ", direction)
        #print("Loop post minGuess is: ", minGuess, " and maxGuess is: ", maxGuess)

# returns new guess from limits tuple
def guesser(limits):
    newGuess = round((limits[0]+limits[1])/2)
    return newGuess

# calculates new limits based on direction and returns (min, max) tuple
def binarySearch():
#    print("DEBUG>",
#    "guess_in is ",
#    guess_in,
#    ". lower_param is ",
#    lower_param,
#    ". upper_param is ",
#    upper_param
#    )
    global guess
    global maxGuess
    global minGuess
    
    if direction == 10:
        return 0, 100
    elif direction == 1:
        print("I'll guess higher. Updating minimum guess.")
        minGuess = guess + 1
        limits = (minGuess, maxGuess)
        return limits
    elif direction == 2:
        print("Let's handle lower later.")
        print("I'll guess lower. Updating maximum guess.")
        maxGuess = guess - 1
        limits = (minGuess, maxGuess)
        return limits
    else:
        print("Error code 2 in binarySearch function.")
        quit(2)

if __name__ == "__main__":
    direction = 10
    maxGuess = 100
    minGuess = 0
    start()
