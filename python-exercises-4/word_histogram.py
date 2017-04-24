histogram = {}

def word_histogram(text):
    words = text.split(' ')
    for word in words:
        count = words.count(word)
        if word not in histogram and word != '': # to prevent logging spaces
            histogram.update({word:count})

def counter():
    countList = []
    for key, value in histogram.items():
        string = value, key
        countList.append(string)
    countList.sort(reverse=True)
    return(countList)

def main():
    text = input("Please give me some text. >")
    word_histogram(text)
    sortedList = counter()
    print("The top three words are: \n1. {}\n2. {}\n3. {}".format(sortedList[0][1], sortedList[1][1], sortedList[2][1]))

if __name__ == '__main__':
    main()
