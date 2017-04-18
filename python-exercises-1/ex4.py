# prompt user for day number
day = int(input("Day (0-6)? "))

# define functions for each day, test switch equivalent since python lacks
def Sun():
    print("Sunday")
def Mon():
    print("Monday")
def Tue():
    print("Tuesday")
def Wed():
    print("Wednesday")
def Thu():
    print("Thursday")
def Fri():
    print("Friday")
def Sat():
    print("Saturday")

# dict to map numbers to functions
weekday = {
    0 : Sun,
    1 : Mon,
    2 : Tue,
    3 : Wed,
    4 : Thu,
    5 : Fri,
    6 : Sat
}

if day > 6:
    print ("Please enter a number below 6")

elif day < 0:
    print ("What even is a negative day?")

else:
    weekday[day]()
