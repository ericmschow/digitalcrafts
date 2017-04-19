string = input("Please give me a string: ")

wordList = []
wordStr = ""

def looper():
    for i in range(len(string)):
        # print(string[i]) # print each character
        if string[i].lower() in "aeiou":
            # print("character is vowel")
            if string[i] == string[i-1]:
                #print(string[i] * 4) # print 4 vowels
                appender(string[i] * 4)
            else:
                #print(string[i]) # print just the one vowel
                appender(string[i])
        else:
            #print("character is consonant")
            #print(string[i]) #print each consonant
            appender(string[i])

def appender(char):
    wordList.append(char)

def converter():
    wordStr = ''.join(wordList)
    print(wordStr)

looper()
converter()
