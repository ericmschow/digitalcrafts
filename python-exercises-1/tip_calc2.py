raw_bill = input("What is the total bill amount? Please omit the dollar sign. ")

def sanitize():
    global bill
    try:
        bill = float(raw_bill)
        return True
    except ValueError:
        print("Please enter just the number, with no special characters.")
        quit(1)


if sanitize():
    bill = float(raw_bill)

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
    print("The tip amount is ${:.2f}.".format(tip))
    print("And the total bill is ${:.2f}.".format(total))
    print("Each person owes ${:.2f}".format(share))

if bill >= 0:
    tipCalc()
else:
    print("Please enter a positive number.")
