day = int(input("Enter a day, 0-6: "))

if day == 0 or day == 6:
    print("Sleep in! It's the weekend!")
elif day in range(1,5):
    print("Go to work!")
elif day > 6:
    print("Please enter a valid day.")
elif day < 0:
    print("What even is a negative day?")
else:
    print("Not sure what you did there, buddy.")
