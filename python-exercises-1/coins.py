from time import sleep
desire = int(input("How many coins do you want? "))
count = 0

while count != desire:
    print("You have {} coins.".format(count))
    rawDecision = input("Would you like another coin? ")
    if rawDecision.lower() == "yes":
        count += 1
        sleep(.1)
    elif rawDecision.lower() == "no":
        print("More for me!")
        break
    else:
        print("Please enter yes or no.")
        sleep(.25)

if count != desire:
    sleep(1)
    print("You could have had it all.")
else:
    print("You have all the coins you wanted.")
