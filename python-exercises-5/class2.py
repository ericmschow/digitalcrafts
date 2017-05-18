class Person(object):
    def __init__(self, name, email, phone):
        self.__name = name
        self.email = email
        self.phone = phone
        self.friends = []
        self.greeting_count = 0
        self.people_greeted = []

    def __str__(self):
        return 'Person: {} {} {}'.format(self.name, self.email, self.phone)

    def greet(self, other_person):
        print("Hello, {}, I am {}!".format(other_person.name, self.name))
        self.greeting_count += 1
        if other_person not in self.people_greeted:
            self.people_greeted.append(other_person)

    def print_contact_info(self):
        print("{0}'s email: {1}', {0}'s phone number: {2}".format(self.name, self.email, self.phone))

    def add_friend(self, other_person):
        self.friends.append(other_person)

    def num_friends(self):
        print(len(self.friends))

    def num_unique_people_greeted(self):
        print("I have greeted {} people!".format(len(self.people_greeted)))

class Vehicle(object):
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year

    def print_info(self):
        print(self.year, self.make, self.model, sep=' ')

def main():
    sonny = Person('Sonny', 'sonny@hotmail.com', '483-485-4948')
    jordan = Person('Jordan', 'jordan@aol.com', '495-586-3546')
    dee_ann = Person('Dee Ann', 'deeann@gmail.com', '281-355-2432')
    car = Vehicle('Nissan', 'Leaf', 2015)

    #jordan.friends.append(sonny)
    #sonny.friends.append(jordan)

    #print(len(jordan.friends))
    sonny.print_contact_info()
    jordan.print_contact_info()
    car.print_info()
    sonny.add_friend(jordan)
    jordan.add_friend(sonny)
    #print(len(jordan.friends))
    jordan.num_friends()
    sonny.greet(jordan)
    sonny.greet(jordan)
    print(sonny.greeting_count)
    sonny.num_unique_people_greeted()
    sonny.greet(dee_ann)
    sonny.num_unique_people_greeted()
    print(sonny.greeting_count)

if __name__ == '__main__':
    main()
