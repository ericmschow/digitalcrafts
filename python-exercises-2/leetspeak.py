leet = {
    'A' : '4',
    'E' : '3',
    'G' : '6',
    'I' : '1',
    'O' : '0',
    'S' : '5',
    'T' : '7'
}
wordList = []
def translator():
    string = input("Please give me a string: ")
    for char in string:
        try:
            leet[char.upper()]
            wordList.append(leet[char.upper()])
        except KeyError:
            wordList.append(char)
    wordStr = ''.join(wordList)
    print(wordStr)

translator()
