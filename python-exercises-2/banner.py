def prompter():
    return input("Please give me a string: >")

def bannerizer(string):
    print(
    "*" * (len(string) + 4),
    "\n* {} *".format(string),
    "\n" + "*" * (len(string) + 4)
    )

bannerizer(prompter())
