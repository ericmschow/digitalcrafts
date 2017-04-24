def prompter():
    print("""
    ELECTRONIC PHONE BOOK
    =====================
    1. Look up an entry
    2. Set an entry
    3. Delete an entry
    4. List all entries
    5. Save phonebook
    6. Load saved book
    7. Quit""")
    choice = int(input("What would you like to do? (1-7) > "))
    if choice not in range(1, 8):
        print("Please enter a choice from the options above.")
        prompter()
    else:
        return choice

book = {
    'John' : {'email' : 'john@gmail.com', 'phone' : '555-5555', 'website' : 'www.default.com'}
}

def lookup():
    name = input('Please give me a name. >')
    print("Information for {}: ".format(name))
    print("\tEmail: {}\n\tPhone: {}\n\tWebsite: {}".format(book[name]['email'], book[name]['phone'], book[name]['website']))
    main()

def entryset():
    name = input('Please give me the name of the new contact to enter. >')
    phone = input("Please give me {}'s phone number. >".format(name))
    email = input("Please give me {}'s email address. >".format(name))
    website = input("Please give me {}'s website. >".format(name))
    info = {'phone' : phone, 'email' : email, 'website' : website}
    book.update({name : info})
    print('Entry stored for {}'.format(name))
    main()

def deleter():
    name = input("Please give me the name of the contact to delete. > ")
    try:
        del book[name]
    except KeyError:
        print ("Error: {} not in phonebook. ".format(name))
        main()
    else:
        print ("Entry for {} deleted. ".format(name))
    main()

def listall():
    if book == {}:
        print("No entries in book.")
    else:
        for key, value in book.items():
            print("Information for {}: ".format(key))
            print("\tEmail: {}\n\tPhone: {}\n\tWebsite: {}".format(value['email'], value['phone'], value['website']))
    main()

def saver():
    pass

def loader():
    pass

def main():
    choice = prompter()
    if choice == 1:
        lookup()
    elif choice == 2:
        entryset()
    elif choice == 3:
        deleter()
    elif choice == 4:
        listall()
    elif choice == 5:
        saver()
    elif choice == 6:
        loader()
    elif choice == 7:
        print("Bye!")
        quit(0)
    else:
        print("Error in main if tree.")


if __name__ == '__main__':
    main()
