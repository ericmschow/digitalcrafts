Cel = int(input("Please enter the temperature in Celsius: "))

def celToFahr(user):
    Fahr = user * 1.8 + 32
    if user < -273:
        print("Please enter a temperature that is physically possible! :)")
    else:
        print(Fahr)

celToFahr(Cel)
