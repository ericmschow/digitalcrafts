from random import randint


def start():
    global secretNumber
    global maxGuesses
    global guessCount
    secretNumber = randint(1, 10)
    maxGuesses = 5
    guessCount = 0
    print("I am thinking of a number between 1 and 10.")
    # get first guess from player
    guess()
    # initialize loop
    engine()

def guess():
    global guessCount
    global guessesLeft
    global maxGuesses
    guessesLeft = maxGuesses - guessCount
    print("You have {} guesses remaining.".format(guessesLeft))
    rawGuess = input("What is your guess? >")
    try:
        int(rawGuess)
    except ValueError:
        print("Please enter a number. You have forfeited the game.")
        replay()
    global guessVal
    guessVal = int(rawGuess)
    guessCount += 1
    if guessCount >= maxGuesses:
        print("You're out of guesses!")
        replay()

def engine():
    while guessVal != secretNumber:
        if guessVal < secretNumber:
            print("Too low!")
            guess()
        elif guessVal > secretNumber:
            print("Too high!")
            guess()
        else:
            print("You shouldn't see this!")
            exit(3)
    print("You got it!")
    replay()

def replay():
    again = input("Would you like to play again? (Y or N) >")
    if again.lower() == "y":
        print("Okay, game restarting!\n")
        start()
    elif again.lower() == "n":
        print("See you next mission.")
        exit(2)
    else:
        print("Please enter Y or N.")
        replay()

start()
