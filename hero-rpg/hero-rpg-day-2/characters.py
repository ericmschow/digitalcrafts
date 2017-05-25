# Module containing characters for Hero RPG

__all__ = ['Hero', 'Goblin', 'Medic', 'Shadow', 'Zombie', 'Lion', 'Wizard']

from random import randint

class Character():
    def __init__(self):
        self.name = 'default'
        self.power = 5
        self.health = 10
        self.bounty = 0
        self.evade = 0

    def attack(self, enemy):
        # character attacks target
        rn = randint(1, 100)
        if rn < enemy.evade:
            print("The {}'s attack missed!".format(self.name))
            #print("DEBUG : rn = ", rn)
        else:
            enemy.health -= self.power
            print("The {} does {} damage to the {}.".format(self.name, self.power, enemy.name))

    def special(self, enemy):
        pass

    def interrupt(self, enemy):
        pass

    def alive(self):
        if self.health > 0:
            return True

    def print_status(self):
        print("The {} has {} health and {} power.".format(self.name, self.health, self.power))


class Hero(Character):
    def __init__(self, healthparam):
        super().__init__()
        self.name = 'hero'
        self.health = healthparam
        self.evade = 20

    def attack(self, enemy):
        damage = self.power
        if randint(1, 100) < enemy.evade:
            print("The {}'s attack missed!".format(self.name))
        else:
            if randint(0, 4) == 4:
                damage *= 2
                print ("Critical hit! Double damage!")
            enemy.health -= damage
            print("The {} does {} damage to the {}.".format(self.name, damage, enemy.name))


class Goblin(Character):
    def __init__(self):
        super().__init__()
        self.health = 6
        self.power = 2
        self.name = 'goblin'
        self.bounty = 5


class Medic(Character):
    def __init__(self):
        super().__init__()
        self.name = 'medic'
        self.health = 8
        self.power = 2
        self.bounty = 7

    def special(self, enemy):
        if randint(0, 4) == 4:
            self.health += 2
            print("Medic healed for 2 health!")

class Shadow(Character):
    def __init__(self):
        super().__init__()
        self.name = 'shadow'
        self.health = 1
        self.power = 1
        self.bounty = 10
        self.evade = 90


class Zombie(Character):
    def __init__(self):
        super().__init__()
        self.name = 'zombie'
        self.health = 0
        self.power = 1

    def alive(self):
        return True # zombie cannot die

    def print_status(self):
        if self.health < 0:
            self.health = 0
            print("The zombie appears unfazed by the attack.")
        print("The {} has {} health and {} power.".format(self.name, self.health, self.power))

class Lion(Character):
    def __init__(self):
        super().__init__()
        self.name = 'lion'
        self.health = 5
        self.power = 3
        self.bounty = 7

    def interrupt(self, enemy):
        if randint(0, 3) == 1:
            print("The lion roars, and the {} is too frightened to attack!".format(enemy.name))
            return True

class Wizard(Character):
    def __init__(self):
        super().__init__()
        self.name = 'wizard'
        self.health = 8
        self.power = 1
        self.bounty = 6

    def attack(self, enemy):
        swap_power = random.random() > 0.5
        if swap_power:
            print("{} swaps power with {} during attack".format(self.name, enemy.name))
            self.power, enemy.power = enemy.power, self.power
        super(Wizard, self).attack(enemy)
        if swap_power:
            self.power, enemy.power = enemy.power, self.power
