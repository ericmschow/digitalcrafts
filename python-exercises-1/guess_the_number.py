secretNumber = 5

print("I am thinking of a number between 1 and 10.")

def guess():
    rawGuess = input("What is your guess? ")
    try:
        int(rawGuess)
    except ValueError:
        print("Please enter a number.")
        exit(1)
    global guessVal
    guessVal = int(rawGuess)


guess()

while guessVal != secretNumber:
    print("Nope, try again.")
    guess()

print("You got it!")
