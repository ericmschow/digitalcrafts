"""
@package examples
@author Christopher Gallo
This is the base for all examples. Put what your example does here.
"""
from pprint import pprint as pp
class example():
    def __init__(self):
        """Setup
        """
        pass
    def main(self):
        max = 50000000
        sum = 0
        for i in range(3, max):
            if i % 3 == 0 or i % 5 == 0:
                sum += i
        return sum
if __name__ == "__main__":
    main = example()
    sum = main.main()
    print(sum)
