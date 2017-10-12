"""
@package examples
@author Christopher Gallo
This is the base for all examples. Put what your example does here.
"""
from pprint import pprint as pp
class selection_sort():
    def __init__(self):
        """Setup
        """
        pass
    def main(self, arr):
        length = len(arr)
        for i in range (0, length):
            low_index = i
            for x in range(i, length):
                if arr[x] < arr[low_index]:
                    low_index = x
            if low_index != i:
                temp = arr[i]
                arr[i] = arr[low_index]
                arr[low_index] = temp
            print(arr)
        return arr
if __name__ == "__main__":
    my_array = [3, 1, 8, 9, 7, 5, 15, 12, 10, 2]
    main = selection_sort()
    result = main.main(my_array)
    print(result)
