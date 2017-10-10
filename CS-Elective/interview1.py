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
    def mathfn(self, num, max):
        max -= 1
        p = int(max / num)
        sum = num * (p * (p + 1)) / 2
        return int(sum)
    def main(self):
        max = 50000000
        sum = 0
        # for i in range(3, max):
        #     if i % 3 == 0 or i % 5 == 0:
        #         sum += i
        sum += (self.mathfn(3, max) + self.mathfn(5, max) - self.mathfn(15, max))
        return sum
if __name__ == "__main__":
    main = example()
    sum = main.main()
    print(sum)
