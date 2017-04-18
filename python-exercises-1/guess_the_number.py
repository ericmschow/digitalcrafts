from random import randint

secretNumber = randint(1, 10)
maxGuesses = 5
guessCount = 0

print("I am thinking of a number between 1 and 10.")

def guess():
    global guessCount
    global guessesLeft
    global maxGuesses
    guessesLeft = maxGuesses - guessCount
    print("You have {} guesses remaining.".format(guessesLeft))
    rawGuess = input("What is your guess? ")
    try:
        int(rawGuess)
    except ValueError:
        print("Please enter a number.")
        exit(1)
    global guessVal
    guessVal = int(rawGuess)
    guessCount += 1
    if guessCount >= maxGuesses:
        print("You're out of guesses!")
        exit(2)


guess()

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
exit(0)
