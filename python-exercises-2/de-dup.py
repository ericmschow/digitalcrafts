listGiven = ["green", 3, "for", 3, "green", 5, 8]
listOutput = []

def checker():
    for i in range(0, len(listGiven)):
        # remove and store item from listGiven
        item = listGiven.pop(i)
        print("listGiven is currently {0} after the pop. This is loop {1}".format(listGiven, i))
        # if item does not have a copy remaining in the list, append it to
        # listOutput, and reinsert into listGiven
        if item not in listOutput:
            listOutput.append(item)
            listGiven.insert(i, item)
            print("The item is \"{}\" and is not in.".format(item))
            print("listGiven is currently {0} and \nlistOutput is currently {1}".format(listGiven, listOutput))
        else:
            listGiven.insert(i, item)
            print("The item is \"{}\" and is in because else statement.".format(item))
            print("listGiven is currently {0} and \nlistOutput is currently {1}".format(listGiven, listOutput))
        print("New iteration. \n")
checker()
print("The output list is: ")
print(listOutput)
print("The original list is: ")
print(listGiven)
