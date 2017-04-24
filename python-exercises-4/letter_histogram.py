histogram = {}

def letter_histogram(word):
    for char in word:
        count = word.count(char)
        if char not in histogram:
            histogram.update({char:count})
    print (histogram)

def main():
    word = input("Please give me a word. >")
    letter_histogram(word)

if __name__ == '__main__':
    main()
