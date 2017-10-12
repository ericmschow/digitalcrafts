"""
@package examples
@author Christopher Gallo
This is the base for all examples. Put what your example does here.
"""
import dis
import string
from pprint import pprint as pp
class example():
    def __init__(self):
        """Setup
        """
        pass
    def sanitize(self, st):
        st = st.lower()
        chars = list(string.ascii_lowercase)
        clean_st = ''
        for letter in st:
            if letter in chars:
                clean_st += letter
        return clean_st
    def main(self, arr): # palindromes
        output = []
        for st in arr:
            st = self.sanitize(st)
            if st == st[::-1]:
                 output.append(st + st[::-1])
        return output

if __name__ == "__main__":
    main = example()
    strings = ['aibohphobia', 'Madam I\'m Adam']
    print(main.main(strings))

    # dis.dis(main) # used to print assembly calls
