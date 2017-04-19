def prompter():
    return int(input("How big is the square? >"))

def squarer(size):
    for i in range(size):
        print ("*" * size)

squarer(prompter())
