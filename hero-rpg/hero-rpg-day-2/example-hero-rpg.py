#!/usr/bin/env python3

"""
Added a store. The hero can now buy a tonic or a sword. A tonic will add 2 to the hero's health wherease a sword will add 2 power.
"""

import random
import time

class Character(object):
    def __init__(self):
        self.name = '<undefined>'
        self.health = 10
        self.power = 5
        self.coins = 20

    def alive(self):
        return self.health > 0

    def attack(self, enemy):
        if not self.alive():
            return
        print("{} attacks {}".format(self.name, enemy.name))
        enemy.receive_damage(self.power)
        time.sleep(1.5)

    def receive_damage(self, points):
        self.health -= points
        print("{} received {} damage.".format(self.name, points))
        if self.health <= 0:
            print("{} is dead.".format(self.name))

    def print_status(self):
        print("{} has {} health and {} power.".format(self.name, self.health, self.power))

class Hero(Character):
    def __init__(self):
        self.name = 'hero'
        self.health = 10
        self.power = 5
        self.coins = 20

    def restore(self):
        self.health = 10
        print("Hero's heath is restored to {}!".format(self.health))
        time.sleep(1)

    def buy(self, item):
        self.coins -= item.cost
        item.apply(hero)

class Goblin(Character):
    def __init__(self):
        self.name = 'goblin'
        self.health = 6
        self.power = 2

class Wizard(Character):
    def __init__(self):
        self.name = 'wizard'
        self.health = 8
        self.power = 1

    def attack(self, enemy):
        swap_power = random.random() > 0.5
        if swap_power:
            print("{} swaps power with {} during attack".format(self.name, enemy.name))
            self.power, enemy.power = enemy.power, self.power
        super(Wizard, self).attack(enemy)
        if swap_power:
            self.power, enemy.power = enemy.power, self.power

class Battle(object):
    def do_battle(self, hero, enemy):
        print("=====================")
        print("Hero faces the {}".format(enemy.name))
        print("=====================")
        while hero.alive() and enemy.alive():
            hero.print_status()
            enemy.print_status()
            time.sleep(1.5)
            print("-----------------------")
            print("What do you want to do?")
            print("1. fight {}".format(enemy.name))
            print("2. do nothing")
            print("3. flee")
            print("> ", end=' ')
            inpt = int(input())
            if inpt == 1:
                hero.attack(enemy)
            elif inpt == 2:
                pass
            elif inpt == 3:
                print("Goodbye.")
                exit(0)
            else:
                print("Invalid input {}".format(inpt))
                continue
            enemy.attack(hero)
        if hero.alive():
            print("You defeated the {}".format(enemy.name))
            return True
        else:
            print("YOU LOSE!")
            return False

class Tonic(object):
    cost = 5
    name = 'tonic'
    def apply(self, character):
        character.health += 2
        print("{}'s health increased to {}.".format(character.name, character.health))

class Sword(object):
    cost = 10
    name = 'sword'
    def apply(self, hero):
        hero.power += 2
        print("{}'s power increased to {}.".format(hero.name, hero.power))

class Store(object):
    # If you define a variable in the scope of a class:
    # This is a class variable and you can access it like
    # Store.items => [Tonic, Sword]
    items = [Tonic, Sword]
    def do_shopping(self, hero):
        while True:
            print("=====================")
            print("Welcome to the store!")
            print("=====================")
            print("You have {} coins.".format(hero.coins))
            print("What do you want to do?")
            for i in range(len(Store.items)):
                item = Store.items[i]
                print("{}. buy {} ({})".format(i + 1, item.name, item.cost))
            print("10. leave")
            input = int(input("> "))
            if input == 10:
                break
            else:
                ItemToBuy = Store.items[input - 1]
                item = ItemToBuy()
                hero.buy(item)

if __name__ == "__main__":
    hero = Hero()
    enemies = [Goblin(), Wizard()]
    battle_engine = Battle()
    shopping_engine = Store()

    for enemy in enemies:
        hero_won = battle_engine.do_battle(hero, enemy)
        if not hero_won:
            print("YOU LOSE!")
            exit(0)
        shopping_engine.do_shopping(hero)

    print("YOU WIN!")
