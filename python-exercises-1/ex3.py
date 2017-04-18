from time import sleep
verb = input("Give me an infinitive verb: ")
noun = input("Now give me a noun: ")
adj = input("Finally, give me an adjective: ")
print("Get ready for the mad lib sentence!")
sleep(1)
print("Ready?")
sleep(1)
print("You like {0} a(n) {1} {2}!".format(verb.lower(), adj.lower(), noun.lower()))
