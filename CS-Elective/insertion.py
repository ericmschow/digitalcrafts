"""
@package examples
@author Christopher Gallo
This is the base for all examples. Put what your example does here.
"""
import dis
from pprint import pprint as pp
class example():
    def __init__(self):
        """Setup
        """
        pass
    def main(self, arr): # insertion sort
        length = len(arr)
        for i in range (0, length):
            temp = arr[i]
            x = i - 1
            while x >= 0 and arr[x] > temp:
                arr[x + 1] = arr[x]
                x = x-1
            arr[x + 1] = temp
if __name__ == "__main__":
    main = example()
    arr = [42, 23, 1, 5, 56, 234, 64, 45, 76]
    main.main(arr)
    print(arr)
    # dis.dis(main) # used to print assembly calls
