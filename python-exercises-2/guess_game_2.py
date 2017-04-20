maxGuess = 100
minGuess = 0
guess = 50
inc = 1

# prompts user for whether guess is higher, lower, or correct and returns string
def getResponse(num):
    print("My guess is: {}".format(num))
    return(input("Was my guess too high, too low, or correct? \n> "))

# parses user string, returns 0 if correct, 1 if low, 2 if high
def stringParser(response):
    if "correct" in response.lower():
    #    print("DEBUG> stringParser returned 0: correct") # DEBUG
        return 0
    elif "low" in response.lower():
    #    print("DEBUG> stringParser returned 1: too low") # DEBUG
        return 1
    elif "high" in response.lower():
    #    print("DEBUG> stringParser returned 2: too high") # DEBUG
        return 2
    else:
        print("I don't understand. Ending.")        # TODO add reinitialize somehow
        quit(1)

# sets up default guess and loop
def start():
    # set guess = 50 to set up binary search
    global guess
    global direction
    global maxGuess
    global minGuess
    global inc
    # direction is returned from stringParser
    direction = stringParser(getResponse(round((maxGuess+minGuess)/2)))
    print("That was my first guess!")
    #ans = searcher(direction, minGuess, maxGuess)
    ans = 10
    while ans != 0: # don't put function evaluation in loop statement
        inc += 1
        #ans = guesser(direction, searcher(direction, minGuess, maxGuess))
        #ans = searcher(direction, guess, minGuess, maxGuess)
        ans = guesser(direction, guess)
        #direction = ans
        print("\nI have guessed {} times!".format(inc))
        #direction = stringParser(getResponse(guess))

    # when user responds correct, loop ends
    print("Hooray! I win! It took me {} tries!".format(inc))
    #quit(0)

# guess higher/lower in binary search based on response
# should call searcher function to receive new guess
# applies binary searcher
def guesser(direction, guesserguess):
    #maxGuess = guess
    global maxGuess
    global minGuess
    #print("DEBUG> direction received by guesser is {}".format(direction))
    if direction == 0:
        return 0
    # if user says guess is too low, guess halfway between guess & 100
    elif direction == 1:
        #                  100 - 50 / 2 = 25 = diff
    #    diff = round((maxGuess - guess) / 2)
    #    maxGuess = guess
    #    print("DEBUG> In guesser: Diff: {}, direction: {}, maxGuess: {}, minGuess: {}".format(diff, direction, maxGuess, minGuess)) # DEBUG - print diff
    #    guess = diff + guess
        print("Okay, let me guess something higher.\n")
        #guess = searcher(direction, minGuess, maxGuess)
        #return stringParser(getResponse(guesserguess))
        return stringParser(getResponse(searcher(1, minGuess, maxGuess)))
    #if user says guess is too high, guess halfway between guess and 0
    elif direction == 2:
    #    diff = round(guess / 2)
    #    print("DEBUG> In guesser: Diff: {}, direction: {}, maxGuess: {}, minGuess: {}".format(diff, direction, maxGuess, minGuess)) # DEBUG - print diff
    #    guess = guess - diff
        print("Okay, let me guess something lower.\n")
        #guess = searcher(direction, minGuess, maxGuess)
        #return stringParser(getResponse(guesserguess))
        return stringParser(getResponse(searcher(2, minGuess, maxGuess)))
    else:
        print("Error in guesser function. Ending code 2.")
        quit(2)

# returns new guess after performing binary search
def searcher(direction, searchminGuess, searchmaxGuess):
    global guess
    print("DEBUG> In searcher before math: direction: {}, searcmaxGuess: {}, searcminGuess: {}".format(direction, searchmaxGuess, searchminGuess)) # DEBUG
    if direction == 1: # too low, want return higher guess
        # minGuess is the previous guess plus 1
        searchminGuess = guess + 1
        # return new Guess - half of difference between limits
        newGuess = searchmaxGuess - (round((searchmaxGuess - searchminGuess)/2))
        print("DEBUG> In searcher after math: newGuess: {}, direction: {}, maxGuess: {}, minGuess: {}".format(newGuess, direction, searchmaxGuess, searchminGuess)) # DEBUG
        #guess = newGuess
        return newGuess

    elif direction == 2: # too high, want return lower guess
        # maxGuess is set to the previous guess minus 1
        searchmaxGuess = guess - 1
        # return new guess - average of limits added to guess
        newGuess = (round((searchmaxGuess + searchminGuess)/2))
        print("DEBUG> In searcher after math: newGuess: {}, direction: {}, maxGuess: {}, minGuess: {}".format(newGuess, direction, searchmaxGuess, searchminGuess)) # DEBUG
        #guess = newGuess
        return newGuess
    else:
        print("Error in searcher function. Ending code 3.")
        quit(3)

start()
#searcher(direction, guess, minGuess, maxGuess)
