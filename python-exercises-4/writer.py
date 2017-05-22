import word_histogram

def main():
    filename = input("Please enter a filename. >")
    data = input("Please enter the contents of the file. >")
    with open(filename, 'w') as fh:
        fh.write(data)
    

if __name__ == '__main__':
    main()
