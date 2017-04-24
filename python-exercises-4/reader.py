def main():
    filename = input("Please enter a filename. >")
    with open(filename, 'r') as fh:
        txt = fh.read()
    print( txt)

if __name__ == '__main__':
    main()
