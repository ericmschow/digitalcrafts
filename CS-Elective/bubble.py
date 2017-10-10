"""
@package examples
@author Christopher Gallo
This is the base for all examples. Put what your example does here.
"""
from pprint import pprint as pp
class bubble_sort():
    def __init__(self):
        """Setup
        """
        pass
    def main(self, arr):
        is_sorted = False
        while is_sorted is False:
            is_sorted = True
            for i in range(0, len(my_array)):
                if i + 1 == len(my_array):
                    continue
                if my_array[i] > my_array[i+1]:
                    temp = my_array[i]
                    my_array[i] = my_array[i+1]
                    my_array[i+1] = temp
                    is_sorted = False

        return arr
if __name__ == "__main__":
    my_array = [3, 1, 8, 9, 7, 5]
    main = bubble_sort()
    result = main.main(my_array)
    print(result)
