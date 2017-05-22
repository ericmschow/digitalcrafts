import io
import random
import string

def main():
    fh = io.StringIO()
    N = int(input("How many bytes to write? > "))
    N = '1' * N
    while True:
        #N = int(input("How many bytes to write? > "))
        #N = '1' * N
        fh.write(N)
        print(fh.tell())

if __name__ == '__main__':
    main()
