histogram = {}

def word_histogram(text):
    words = text.split(' ')
    for word in words:
        count = words.count(word)
        if word not in histogram and word != '': # to prevent logging spaces
            histogram.update({word:count})

def letter_histogram(word):
    for char in word:
        count = word.count(char)
        if char not in histogram:
            histogram.update({char:count})

def main():
    filename = input("Please enter a filename. > ")
    with open(filename, 'r') as fh:
        txt = fh.read()
    letter_histogram(txt)
    print(histogram)
    histogram.clear()
    word_histogram(txt)
    print(histogram)


if __name__ == '__main__':
    main()
