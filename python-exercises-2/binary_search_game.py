direction = 10
maxGuess = 100
minGuess = 0

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
    guess = 50
    while direction != 0:
        print("Loop pre func Guess is: ", guess)
        print("Loop pre func Direction is: ", direction)
        print("Loop pre func Minguess is: ", minGuess, " and maxGuess is: ", maxGuess)
        guess = binarySearch(guess, minGuess, maxGuess)
        getDirection(guess)
        print("Loop post func Guess is: ", guess)
        print("Loop post Direction is: ", direction)
        print("Loop post Minguess is: ", minGuess, " and maxGuess is: ", maxGuess)

def binarySearch(guess_in, lower_param, upper_param):
    print("DEBUG>",
    "guess_in is ",
    guess_in,
    ". lower_param is ",
    lower_param,
    ". upper_param is ",
    upper_param
    )
    if direction == 10:
        pass
    elif direction == 1:
        global guess
        print("I'll guess higher.")
        lower_bound = guess_in + 1
        upper_bound = upper_param
        guess = ((lower_bound + upper_bound) / 2)
        print(type(guess))
    #    return guess
    elif direction == 2:
        print("Let's handle lower later.")
    else:
        print("Error code 2 in binarySearch function.")
        quit(2)

start()
