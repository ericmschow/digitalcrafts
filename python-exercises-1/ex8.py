bill = float(input("What is the total bill amount? Please omit the dollar sign. "))
rawServiceLevel = input("How did they do? Good, fair, or bad? ")
partySize = int(input("How many people are in your party? "))

serviceLevel = rawServiceLevel.lower()

tipAmount = {
    "good" : .2,
    "fair" : .15,
    "bad" : .1
}

def tipCalc():
    tip = bill * tipAmount[serviceLevel]
    total = bill + tip
    share = total / partySize
    print("The tip amount is ${}.".format(tip))
    print("And the total bill is ${}.".format(total))
    print("Each person owes ${}".format(share))


tipCalc()
