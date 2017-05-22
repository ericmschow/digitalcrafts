from matplotlib import pyplot
import json
x_list = []
y_list = []

def main():
    filename = input("Please enter a filename. > ")
    with open(filename, 'r') as fh:
        dictImported = json.load(fh)
    data = dict(dictImported)
    #data = dictImported['data']
    for pair in data['data']:
        #print(pair)
        x_list.append(pair[0])
        y_list.append(pair[1])
    print(x_list," , ",y_list)

    pyplot.plot(x_list, y_list)
    pyplot.show()


if __name__ == '__main__':
    main()
