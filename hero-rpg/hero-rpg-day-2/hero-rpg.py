#!/usr/bin/env python3

"""
In this simple RPG game, the hero fights the goblin. He has the options to:
1. fight goblin
2. do nothing - in which case the goblin will attack him anyway
3. flee
"""
from characters import *
import items
from random import randint
from time import sleep



class Menu():
    coins = 0
    health = 10
    def __init__(self):
        pass
    def begin_battle(self, battle):
        #battlemenucoins = menucoins
        hero = Hero(self.health)
        ENEMYLIST = [Zombie(), Goblin(), Medic(), Lion(), Shadow()]
        enemy = ENEMYLIST[randint(0, len(ENEMYLIST)-1)]
        print("Beginning battle...")
        return battle.start_combat(hero, enemy, self)#, battlemenucoins)
    def enter_store(self, storeparam):
        store = storeparam
        store.open_store(self)
    def in_menu(self, inventory, battle, storeparam):
        store = storeparam
        print("""\nYou have the following options:
        1. Venture forth into the fields. You have {} health.
        2. Enter the store. You have {} gold coins.
        3. Quit Hero RPG.
        """.format(self.health, self.coins))
        inpt = input("What would you like to do? > ")
        if inpt == '1':
            winnings = self.begin_battle(battle)

            import traceback
            if type(winnings) == int:
                self.coins += int(winnings)

            # except ValueError:
            #     traceback.print_exc()
            #
            # except TypeError:
            #     traceback.print_exc()

        elif inpt == '2':
            self.enter_store(storeparam)

        elif inpt == '3':
            print ('Bye!')
            quit()


class Store():
    def __init__(self):
        pass
    inv = [] # list of items
    def open_store(self, menu):
        print(dir(items))
        for item in items:
            if '__' not in item:
                self.inv.append(item)
        print("Welcome to the store! You have {} coins to spend.".format(menu.coins))
        print("These are the items we have available:")
        for i in range(len(storeinv)):
            if item.count > 0:
                print("{}. {} | Effect: {} | Cost: {}".format(i, item.name, item.effect, item.cost))

class Combat():
    def start_combat(self, hero, enemy, menu):#, coins):
        print("\nA {} draws near.".format(enemy.name))
        while enemy.alive() and hero.alive():
            hero.print_status()
            enemy.print_status()

            print()
            print("What do you want to do?")
            print("1. fight {}".format(enemy.name))
            print("2. do nothing")
            print("3. flee")
            print("> ", end=' ')
            inpt = input()
            if inpt == "1":
                if enemy.interrupt(hero) == True:  # if enemy interrupt passes
                    pass # attack does not happen
                else:
                    hero.attack(enemy)
            elif inpt == "2": # do nothing
                pass
            elif inpt == "3":
                print("You managed to escape!")
                return False
            else:
                print("Invalid inpt {}".format(inpt))

            if enemy.alive():
                enemy.attack(hero)
                enemy.special(hero)
            else:
                print("You have defeated the {}.".format(enemy.name))
                print("You have earned {} gold coins.".format(enemy.bounty))
                coins = enemy.bounty
                menu.health = hero.health
                return coins

            if not hero.alive():
                print("\n...\n...\nYou are dead.\n...\n...")
                quit(0)

def main():

#    coins = 0
    inventory = []

    menu = Menu()
    battle = Combat()
    store = Store()

    print("\n\n\nWelcome to HERO RPG!")
    #print('Menu.coins before while loop is ',menu.coins)
    while 1:
        winnings = menu.in_menu(inventory, battle, store)
        #print('Menu.coins in while loop is ',menu.coins)
        #try:
        #    int(winnings)
        #    coins += winnings
        #except TypeError:
        #    pass
        #except ValueError:
        #    pass


if __name__ == "__main__":
    main()
