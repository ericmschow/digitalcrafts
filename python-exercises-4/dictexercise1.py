phonebook = {
  'Alice': '703-493-1834',
  'Bob': '857-384-1234',
  'Elizabeth': '484-584-2923'
}

def main():
    print(phonebook['Elizabeth'])
    phonebook['Kareem'] = '938-489-1234'
    del phonebook['Elizabeth']
    phonebook['Bob'] = '968-345-2345'
    print(phonebook)



if __name__ == '__main__':
    main()
