hp = [int(input("HP: ")),int(input("EV: "))]
atk = [int(input("Attack: ")),int(input("EV: "))]
dfs = [int(input("Defense: ")), int(input("EV: "))]
sp_atk = [int(input("Sp. Atk: ")), int(input("EV: "))]
sp_def = [int(input("Sp. Def: ")),int(input("EV: "))]
speed = [int(input("Speed: ")),int(input("EV: "))]
level = 100

print(((2*hp[0]+31+(hp[1]/4))/100)*level+10)

for stat in (atk, dfs, sp_atk, sp_def, speed):
    print((((2*stat[0]+31+(stat[1]/4))*level)/100)+5)
