import pygame
import os
import time
from random import randint
from math import sqrt
import numpy

# if joystick stuff doesn't go here it breaks

pygame.init()
pygame.joystick.init()
# Get count of joysticks
joystick_count = pygame.joystick.get_count()

# For each joystick:
for i in range(joystick_count):
    joystick = pygame.joystick.Joystick(i)
    joystick.init()

class Background():
    def __init__(self):
        #super().__init__()
        self.image = pygame.image.load(os.path.join('images', 'background.png'))

class Character(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.xpos = 100
        self.ypos = 100
        self.speed = 2 # pixels per move step
        self.direction = 'default'
        self.image = pygame.image.load(os.path.join('images', 'hero.png'))
        self.wait_timer = 0
        self.rect = self.image.get_rect()
        self.image_w, self.image_h = self.image.get_size()
        self.rect.move(self.xpos, self.ypos)
        self.rect.topleft = (self.xpos, self.ypos)
        self.rect.bottomright = (self.xpos + self.image_w, self.ypos + self.image_h)
    #    engine.sprite_list.add(self)
        #engine.character_list.add(self)
    def bounding_update(self):
        #self.rect = self.image.get_rect()
        #self.image_w, self.image_h = self.image.get_size()
        #self.rect.move(self.xpos, self.ypos)
        #self.rect.topleft = (self.xpos, self.ypos)
        #self.rect.bottomright = (self.xpos + self.image_w, self.ypos + self.image_h)
        pass

    def move(self, direction):
        K = 0.707 # factor to correct for diagonal speed advantage
        if self.direction == 'default':
            pass
        elif self.direction == 'left':
            self.xpos -= self.speed
            if self.xpos < 0:
                self.xpos = engine.width - 32 # hero sprite width
        elif self.direction == 'right':
            self.xpos = (self.xpos + self.speed) % engine.width
        elif self.direction == 'up':
            self.ypos -= self.speed
            if self.ypos < 0:
                self.ypos = engine.height
        elif self.direction == 'down':
            self.ypos = ((self.ypos + self.speed)) % engine.height

        elif self.direction == 'upleft':
            self.xpos -= self.speed * K
            if self.xpos < 0:
                self.xpos = engine.width - 32 # hero sprite width
            self.ypos -= self.speed * K
            if self.ypos < 0:
                self.ypos = engine.height
        elif self.direction == 'upright':
            self.xpos = (self.xpos + self.speed * K) % engine.width
            self.ypos -= self.speed * K
            if self.ypos < 0:
                self.ypos = engine.height
        elif self.direction == 'downleft':
            self.xpos -= self.speed * K
            if self.xpos < 0:
                self.xpos = engine.width - 32 # hero sprite width
            self.ypos = ((self.ypos + self.speed * K)) % engine.height
        elif self.direction == 'downright':
            self.xpos = (self.xpos + self.speed * K) % engine.width
            self.ypos = ((self.ypos + self.speed * K)) % engine.height
        else:
            print('Error in {} move function.'.format(self))

class Hero(Character):
    def __init__(self):
        super().__init__()
        self.xpos = 256
        self.ypos = 240
        self.speed = 1.8
        self.image = pygame.image.load(os.path.join('images', 'hero.png'))
        engine.sprite_list.add(self)

    def move(self, direction):
        K = 0.707 # factor to correct for diagonal speed advantage
        if self.xpos < 32:
            self.xpos = 32
        elif self.xpos > 448:
            self.xpos = 448
        elif self.ypos < 32:
            self.ypos = 32
        elif self.ypos > 416:
            self.ypos = 416
        else:
            if self.direction == 'default':
                pass
            elif self.direction == 'left':
                self.xpos -= self.speed
                if self.xpos < 0:
                    self.xpos = engine.width - 32 # hero sprite width
            elif self.direction == 'right':
                self.xpos = (self.xpos + self.speed) % engine.width
            elif self.direction == 'up':
                self.ypos -= self.speed
                if self.ypos < 0:
                    self.ypos = engine.height
            elif self.direction == 'down':
                self.ypos = ((self.ypos + self.speed)) % engine.height

            elif self.direction == 'upleft':
                self.xpos -= self.speed * K
                if self.xpos < 0:
                    self.xpos = engine.width - 32 # hero sprite width
                self.ypos -= self.speed * K
                if self.ypos < 0:
                    self.ypos = engine.height
            elif self.direction == 'upright':
                self.xpos = (self.xpos + self.speed * K) % engine.width
                self.ypos -= self.speed * K
                if self.ypos < 0:
                    self.ypos = engine.height
            elif self.direction == 'downleft':
                self.xpos -= self.speed * K
                if self.xpos < 0:
                    self.xpos = engine.width - 32 # hero sprite width
                self.ypos = ((self.ypos + self.speed * K)) % engine.height
            elif self.direction == 'downright':
                self.xpos = (self.xpos + self.speed * K) % engine.width
                self.ypos = ((self.ypos + self.speed * K)) % engine.height
            else:
                print('Error in {} move function.'.format(self))

class Enemy(Character):
    def __init__(self):
        super().__init__()
        self.saferange = 45
        self.xpos = int(randint(0, engine.width-32))
        self.ypos = int(randint(0, engine.height-32))
        while self.xpos in range(int(engine.width/2-self.saferange), int(engine.width/2+self.saferange)):
            self.xpos = int(randint(0, engine.width-32))
        while self.ypos in range(int(engine.width/2-self.saferange), int(engine.width/2+self.saferange)):
            self.ypos = int(randint(0, engine.height-32))
        self.image = pygame.image.load(os.path.join('images', 'monster.png'))

    def check_coll(self, hero):
        distance = sqrt(((hero.xpos - self.xpos) ** 2) + ((hero.ypos - self.ypos) ** 2))
        if distance < 32:
            if self.name == 'goblin':
                engine.goblincollvar = True
            elif self.name == 'monster':
                engine.monstercollvar = True
            else:
                print("Error in {}.check_coll".format(self))
        else:
            return False

    def pick_dir(self):
        direction = randint(0, 7)
        if direction == 0:
            self.direction = 'up'
        elif direction == 4:
            self.direction = 'upleft'
        elif direction == 1:
            self.direction = 'left'
        elif direction == 5:
            self.direction = 'downleft'
        elif direction == 2:
            self.direction = 'down'
        elif direction == 6:
            self.direction = 'downright'
        elif direction == 3:
            self.direction = 'right'
        elif direction == 7:
            self.direction = 'upright'
        else:
            print("Error in {}}.pick_dir()".format(self))

class Monster(Enemy):
    def __init__(self):
        super().__init__()
        self.image = pygame.image.load(os.path.join('images', 'monster.png'))
        self.name = 'monster'
        engine.sprite_list.add(self)


class Goblin(Enemy):
    def __init__(self):
        super().__init__()
        directions = ['up','left','down','right']
#        self.image = pygame.image.load(os.path.join('images', 'goblin.png'))
#        self.newColor = (randint(0, 128), randint(0, 255), randint(0, 255), 64)
#        self.mask = self.image
#        self.mask.fill(self.newColor)
#        self.image = self.image.blit(self.mask, self.image)
#        self.rect = self.colorize(self.rect, self.newColor)
#        self.mask = pygame.Surface.subsurface(self.image)
#        self.mask.set_alpha(128)
#        self.mask.fill(newColor)
        self.direction = directions[randint(0,3)] # sets default cardinal dir
        self.speed = 1.5 * randint(5, 12)/10
        self.name = 'goblin'
        self.wait_timer += randint(1, 60)
        self.origSurface = pygame.image.load(os.path.join('images', 'goblin.png'))
        self.origSurface.convert_alpha()
        self.coloredSurface = self.origSurface.copy()
        self.color_surface(self.coloredSurface, randint(150, 200), randint(150, 200), randint(150, 200))
        self.image = self.coloredSurface
        engine.sprite_list.add(self)

    def color_surface(self, surface, red, green, blue):
        arr = pygame.surfarray.pixels3d(surface)
        arr[:,:,0] = red
        arr[:,:,1] = green
        arr[:,:,2] = blue

   def colorize(self, rect, newColor):
       rect = rect
       # zero out RGB values
       # image.fill((0, 0, 0, 255), None, pygame.BLEND_RGBA_MULT)
       # add in new RGB values
       rect.fill(newColor[0:3] + (0,), None, pygame.BLEND_RGBA_ADD)
       rect.set_alpha(128)
       return rect

class Engine():

    def __init__(self):

        self.level = 1
        self.collisionvar = 0
        self.width = 512
        self.height = 480
        self.blue_color = (97, 159, 182)
        self.sprite_list = pygame.sprite.Group()
        self.screen = pygame.display.set_mode((self.width, self.height))
        pygame.display.set_caption('Catch the Monster!')

    def main(self):
        clock = pygame.time.Clock()
        self.goblincollvar = False
        self.monstercollvar = False
        # Game initialization
        bg = Background()
        self.sprite_list.empty()

        # initialize characters
        hero = Hero()
        enemylist = []
        monster = Monster()
        goblins = list()
        for i in range(self.level):
            goblins.append(Goblin())
        #print('pre loop goblins is ', goblins)

        stop_game = False
        while not stop_game:
            pygame.init()
            for event in pygame.event.get():
                # Event handling
                pygame.init()
                keys = pygame.key.get_pressed()
                if event.type == pygame.QUIT:
                    stop_game = True

                if keys[pygame.K_UP] and keys[pygame.K_LEFT]:
                    hero.direction = 'upleft'
                elif keys[pygame.K_UP] and keys[pygame.K_RIGHT]:
                    hero.direction = 'upright'
                elif keys[pygame.K_DOWN] and keys[pygame.K_LEFT]:
                    hero.direction = 'downleft'
                elif keys[pygame.K_DOWN] and keys[pygame.K_RIGHT]:
                    hero.direction = 'downright'
                elif keys[pygame.K_DOWN]:
                    hero.direction = 'down'
                elif keys[pygame.K_UP]:
                    hero.direction = 'up'
                elif keys[pygame.K_LEFT]:
                    hero.direction = 'left'
                elif keys[pygame.K_RIGHT]:
                    hero.direction = 'right'
                else:
                    hero.direction = 'default'
        #joystick controls   axis 0 left-right neg-pos, axis 1 up-down neg-pos
                if joystick.get_axis(0) < -.5 and joystick.get_axis(1) < -.5:
                    hero.direction = 'upleft'
                elif joystick.get_axis(0) > .5 and joystick.get_axis(1) < -.5:
                    hero.direction = 'upright'
                elif joystick.get_axis(0) < -.5 and joystick.get_axis(1) > .5:
                    hero.direction = 'downleft'
                elif joystick.get_axis(0) > .5 and joystick.get_axis(1) > .5:
                    hero.direction = 'downright'
                elif joystick.get_axis(1) > .5:
                    hero.direction = 'down'
                elif joystick.get_axis(1) < -.5:
                     hero.direction = 'up'
                elif joystick.get_axis(0) < -.5:
                    hero.direction = 'left'
                elif joystick.get_axis(0) > .5:
                    hero.direction = 'right'
                else:
                    hero.direction = 'default'

                if event.type == pygame.KEYDOWN:
                    # if keys[pygame.K_UP] and keys[pygame.K_LEFT]:
                    #     hero.direction = 'upleft'
                    # elif keys[pygame.K_UP] and keys[pygame.K_RIGHT]:
                    #     hero.direction = 'upright'
                    # elif keys[pygame.K_DOWN] and keys[pygame.K_LEFT]:
                    #     hero.direction = 'downleft'
                    # elif keys[pygame.K_DOWN] and keys[pygame.K_RIGHT]:
                    #     hero.direction = 'downright'
                    # elif keys[pygame.K_DOWN]:
                    #     hero.direction = 'down'
                    # elif keys[pygame.K_UP]:
                    #     hero.direction = 'up'
                    # elif keys[pygame.K_LEFT]:
                    #     hero.direction = 'left'
                    # elif keys[pygame.K_RIGHT]:
                    #     hero.direction = 'right'
                    if event.key == 113: # Q for Quit
                        stop_game = True

                if event.type == pygame.JOYBUTTONDOWN:
                    if joystick.get_button(2) == True: # Q for Quit
                        stop_game = True

            # Game logic

            # characters movement
            if monster.wait_timer == 15: # triggers direction change
                monster.pick_dir()
            monster.wait_timer = (monster.wait_timer + randint(0, 1)) % 30 # every N frames
            monster.move(monster.direction) # move in direction with each step

            for goblin in goblins:
                if goblin.wait_timer == 15:
                    goblin.pick_dir()
                goblin.wait_timer = (goblin.wait_timer + randint(0, 1)) % 25
                goblin.move(goblin.direction)
                goblin.bounding_update()
                goblin.check_coll(hero)

            hero.move(hero.direction)

            # check collisions

            monster.check_coll(hero)

            self.screen.fill(self.blue_color)
            # Render background image
            self.screen.blit(bg.image, (0, 0))
            # Game display
            # render sprites

            pygame.sprite.Group.draw(self.sprite_list, self.screen)

            # render level text

            font = pygame.font.SysFont('arial', 30)
            stats = font.render('LEVEL '+str(self.level), True, (255, 255, 255))
            self.screen.blit(stats, (425, 5))

            #update changes
            # all goblin checks moved to for goblins loop to conserve resources

            hero.bounding_update()
            monster.bounding_update()
            pygame.display.update()

            if self.monstercollvar or self.goblincollvar:
                break

            clock.tick(60)

        if not stop_game:
            self.playAgain(hero, bg)
        else:
            pygame.quit()

    def playAgain(self, heroparam, bgparam):
    #    print("GOT HERE")
        pygame.init()
        hero = heroparam
        bg = bgparam
        self.screen.fill(self.blue_color)
        self.screen.blit(bg.image,(0, 0))
        self.screen.blit(hero.image, (hero.xpos, hero.ypos))
        font = pygame.font.SysFont('comicsansms', 30)
        if self.goblincollvar:
            text1 = font.render("You lose! Press start or spacebar to play again!", True, (230, 20, 20))
            self.level = 1
        else:
            text1 = font.render("You win! Press start or spacebar to play again!", True, (126, 126, 255))
            self.level += 1
        text2 = font.render("Press (B) or Q to quit", True, (10, 10, 10))
        self.screen.blit(text1, (25, 240))
        self.screen.blit(text2, (160, 280))
        pygame.display.update()
    #    self.sprite_list.empty()
        hero.direction = 'default'
        stop_game = False

        while not stop_game:

            for event in pygame.event.get():
            # Event handling
                keys = pygame.key.get_pressed()
                if event.type == pygame.QUIT:
                    stop_game = True

                if event.type == pygame.KEYDOWN:

                    if event.key == 113: # Q for Quit
                        stop_game = True
                    elif event.key == pygame.K_SPACE:
                        self.sprite_list.empty()
                        pygame.display.update()
                        engine.main()

                if event.type == pygame.JOYBUTTONDOWN:

                    if joystick.get_button(2) == True: # Q for Quit
                        stop_game = True
                    elif joystick.get_button(6) == True or joystick.get_button(7) == True or joystick.get_button(1):
                        self.sprite_list.empty()
                        pygame.display.update()
                        engine.main()
        pygame.quit()


if __name__ == '__main__':
    engine = Engine()
    engine.main()
