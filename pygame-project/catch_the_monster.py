import pygame
import os
import time
from random import randint

class Background():
    def __init__(self):
        #super().__init__()
        self.image = pygame.image.load(os.path.join('images', 'background.png'))

# class Bounding():
#     def __init__(self):
#         self.xpos = 32
#         self.ypos = 32
#         self.image = pygame.Surface((448, 416))
#         self.image.set_colorkey((0, 0, 0))
#         self.rect = self.image.get_rect()


# class Bounding(pygame.sprite.Sprite):
#     def __init__(self):
#         super().__init__()
#         self.xpos = 32
#         self.ypos = 32
#         self.image = pygame.Surface((448, 416))   # 448, 416
#         #self.image.set_colorkey((0, 0, 0))
#         self.rect = self.image.get_rect()
#         engine.sprite_list.add(self)

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
        engine.sprite_list.add(self)
        #engine.character_list.add(self)
    def bounding_update(self):
        self.rect = self.image.get_rect()
        self.image_w, self.image_h = self.image.get_size()
        self.rect.move(self.xpos, self.ypos)
        self.rect.topleft = (self.xpos, self.ypos)
        self.rect.bottomright = (self.xpos + self.image_w, self.ypos + self.image_h)

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
        self.image = pygame.image.load(os.path.join('images', 'hero.png'))#.convert()
        engine.hero_sprite_list.add(self)
        #self.inbounds = 1

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

class Monster(Character):
    def __init__(self):
        super().__init__()
        self.xpos = randint(0, engine.width-32)
        self.ypos = randint(0, engine.height-32)
        self.image = pygame.image.load(os.path.join('images', 'monster.png'))#.convert()
        engine.monster_sprite_list.add(self)

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
            print("Error in Monster().pick_dir()")


class Engine():

    width = 512
    height = 480
    blue_color = (97, 159, 182)
    character_list = pygame.sprite.Group()
    sprite_list = pygame.sprite.Group()
    hero_sprite_list = pygame.sprite.Group()
    monster_sprite_list = pygame.sprite.Group()


    def main(self):
        pygame.init()
        screen = pygame.display.set_mode((self.width, self.height))
        pygame.display.set_caption('Catch the Monster!')
        clock = pygame.time.Clock()

        # Game initialization
        bg = Background()
    #    bounding = Bounding()
        hero = Hero()
        monster = Monster()
        collisionvar = hero.rect.colliderect(monster.rect) # returns 1 if collide
        # while collisionvar:
        #     monster.xpos = randint(0, self.width-32)
        #     monster.ypos = randint(0, self.height-32)

        stop_game = False
        while not stop_game:
            for event in pygame.event.get():
                # Event handling
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
                    if event.key == pygame.K_SPACE and collisionvar == 1:
                        engine.main()
                    # elif event.key == 273 and event.key == 276:
                    #     hero.direction = 'upleft'
                    # elif event.key == 273 and event.key == 275:
                    #     hero.direction = 'upright'
                    # elif event.key == 274 and event.key == 276:
                    #     hero.direction = 'downleft'
                    # elif event.key == 274 and event.key == 275:
                    #     hero.direction = 'downright'
                # elif event.type == pygame.KEYUP:
                #     if event.key in range (273, 277):
                #         hero.direction = 'default'

            # Game logic

            # characters movement
            if monster.wait_timer == 0: # triggers direction change
                monster.pick_dir()
            monster.wait_timer = (monster.wait_timer + 1) % 90 # every N frames
            monster.move(monster.direction) # move in direction with each step
            hero.move(hero.direction)

            # collision detection
            collisionvar = hero.rect.colliderect(monster.rect) # returns 1 if collide
            if collisionvar == 1:
                screen.fill(self.blue_color)
                screen.blit(bg.image,(0, 0))
                screen.blit(hero.image, (hero.xpos, hero.ypos))
                font = pygame.font.SysFont('comicsansms', 50)
                text = font.render("You win! Press spacebar to play again!", True, (0, 0, 255))
                screen.blit(text, (256, 240))

            else:
                pass


            # Draw background
            screen.fill(self.blue_color)
            # Render background image
            screen.blit(bg.image, (0, 0))
            # Draw bounding box over image
        #    screen.blit(bounding.image, (bounding.xpos, bounding.ypos))

            # Game display
            # render sprites

            screen.blit(hero.image, (hero.xpos, hero.ypos)) # render heroSpr
            screen.blit(monster.image, (monster.xpos, monster.ypos))

            #update changes
            # hero.rect = hero.image.get_rect()
            # monster.rect = monster.image.get_rect()
            hero.bounding_update()
            monster.bounding_update()



            pygame.display.update()
            clock.tick(60)



        pygame.quit()

if __name__ == '__main__':
    engine = Engine()
    engine.main()
