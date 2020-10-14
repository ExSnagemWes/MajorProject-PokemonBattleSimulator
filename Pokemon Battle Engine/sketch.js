// Pokemon Battle Simulator
// Trent Hatzel
// Started September 23, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
//https://github.com/smogon/damage-calc/blob/master/calc/src/mechanics/gen12.ts(line 157)
//line 255 damage equation copied and slightly modified for variables that would be predefined in this instance

//Convenience. Pressing shift constantly really slows me down
let playerParty;
let cpuParty;
let physical = "ph"
let special = "sp"
let healing = "heal"
let boost = "boost"

let normal = "Normal";
let bug = "Bug";
let grass = "Grass";
let water = "Water";
let fire = "Fire";
let ice = "Ice";
let dragon = "Dragon";
let steel = "Steel";
let fairy = "Fairy";
let fighting = "Fighting";
let dark = "Dark";
let ghost = "Ghost";
let psychic = "Psychic";
let poison = "Poison";
let ground = "Ground";
let rock = "Rock";
let flying = "Flying";
let electric = "Electric";
let none = "---";
let critical = false;



let moves_list = {
  dragon_claw: {
    name: "Dragon Claw",
    type: dragon, 
    power: 80, 
    accuracy: 100, 
    pp: 15, 
    category: physical,
    priority: 0,
    effect: [0, 0]},

  hurricane: {
    name: "Hurricane",
    type: flying,
    power: 110,
    accuracy: 70,
    pp: 10,
    category: special,
    priority: 0,
    effect: [1, 30]},

  extreme_speed: {
    name: "Extreme Speed",
    type: normal,
    power: 80,
    accuracy: 100,
    pp: 5,
    category: physical,
    priority: 2,
    effect: [0,0]},

  roost: {
    name: "Roost",
    type: flying,
    power: 0,
    accuracy: 0,
    pp: 10,
    category: healing,
    priority: 0,
    effect: [2, 50]},

  earthquake: {
    name: "Earthquake",
    type: ground,
    power: 100,
    accuracy: 100,
    pp: 10,
    category: physical,
    priority: 0,
    effect: [0,0]},

  iron_head: {
    name: "Iron Head",
    type: steel,
    power: 80,
    accuracy: 100,
    pp: 15,
    category: physical,
    priority: 0,
    effect: [3, 30]},

  swords_dance: {
    name: "Swords Dance",
    type: normal,
    power: 0,
    accuracy: 0,
    pp: 30,
    category: boost,
    priority: 0,
    effect: [4, 2]},

  flamethrower: {
    name: "Flamethrower",
    type: fire,
    power: 95,
    accuracy: 100,
    pp: 15,
    category: special,
    priority: 0,
    effect: [5, 20]},

  focus_blast: {
    name: "Focus Blast",
    type: fighting,
    power: 120,
    accuracy: 70,
    pp: 5,
    category: special,
    priority: 0,
    effect: [6, 20]},

  air_slash: {
    name: "Air Slash",
    type: flying,
    power: 75,
    accuracy: 95,
    pp: 15,
    category: special,
    priority: 0,
    effect: [3, 30]},

  dragon_pulse: {
    name: "Dragon Pulse",
    type: dragon,
    power: 85,
    accuracy: 100,
    pp: 10,
    category: special,
    priority: 0,
    effect: [0,0]},

  aura_sphere: {
    name: "Aura Sphere",
    type: fighting,
    power: 80,
    accuracy: 0,
    pp: 20,
    category: special,
    priority: 0,
    effect: [0,0]},
  
  hydro_pump: {
    name: "Hydro Pump",
    type: water,
    power: 120,
    accuracy: 80,
    pp: 5,
    category: special,
    priority: 0,
    effect: [0,0]},

  ice_beam: {
    name: "Ice Beam",
    type: ice,
    power: 90,
    accuracy: 100,
    pp: 10,
    category: special,
    priority: 0,
    effect: [7,20]},

  energy_ball: {
    name: "Energy Ball",
    type: grass,
    power: 90,
    accuracy: 100,
    pp: 10,
    category: special,
    priority: 0,
    effect: [6,20]},

  sludge_bomb: {
    name: "Sludge Bomb",
    type: poison,
    power: 90,
    accuracy: 100,
    pp: 10,
    category: special,
    priority: 0,
    effect: [8,30]},

  energy_ball: {
    name: "Energy Ball",
    type: grass,
    power: 90,
    accuracy: 100,
    pp: 10,
    category: special,
    priority: 0,
    effect: [6,20]},

  synthesis: {
    name: "Synthesis",
    type: grass,
    power: 0,
    accuracy: 0,
    pp: 10,
    category: healing,
    priority: 0,
    effect: [2, 50]},

  venoshock: {
    name: "Venoshock",
    type: poison,
    power: 65,
    accuracy: 100,
    pp: 20,
    category: special,
    priority: 0,
    effect: [9, 100]},
  blizzard: {
    name: "Blizzard",
    type: ice,
    power: 120,
    accuracy: 70,
    pp: 5,
    category: special,
    priority: 0,
    effect: [7,20]},
  freeze_dry: {
    name: "Freeze Dry",
    type: ice,
    power: 70,
    accuracy: 10,
    pp: 20,
    category: special,
    priority: 0,
    effect: [10,100]},
  }
  
//let damage = 0;
let pokemon = {
dragonite: {
    name: "Dragonite",
    //sprites: [loadImage("sprites/dragonite_front.png"), loadImage("sprites/dragonite_back.png")],
    status: 0,
    base_hp: 356,
    hp: 356,
    attack: 403,
    defense: 226,
    sp_atk: 266,
    sp_def: 236,
    //128 speed IVS
    speed: 176,
    stat_changes: {
      attack: 0,
      defense: 0,
      sp_atk: 0,
      sp_def: 0,
      speed: 0
    },
    type_1: dragon,
    type_2: flying,
    moves: [moves_list.dragon_claw, 
      moves_list.hurricane, 
      moves_list.extreme_speed, 
      moves_list.roost]
},
garchomp: {
  name: "Garchomp",
  //sprites: [loadImage("sprites/garchomp_front.png"), loadImage("sprites/garchomp_back.png")],
  status: 0,
  base_hp: 357,
  hp: 357,
  attack: 359,
  defense: 226,
  sp_atk: 176,
  sp_def: 207,
  speed: 333,
  stat_changes: {
    attack: 0,
    defense: 0,
    sp_atk: 0,
    sp_def: 0,
    speed: 0
  },
  type_1: dragon,
  type_2: ground,
  moves: [moves_list.dragon_claw,
    moves_list.earthquake,
    moves_list.iron_head,
    moves_list.swords_dance]
},
charizard: {
  name: "Charizard",
  //sprites: [loadImage("sprites/charizard_front.png"), loadImage("sprites/charizard_back.png")],
  status: 0,
  base_hp: 297,
  hp: 297,
  attack: 155,
  defense: 192,
  sp_atk: 317,
  sp_def: 207,
  speed: 328,
  stat_changes: {
    attack: 0,
    defense: 0,
    sp_atk: 0,
    sp_def: 0,
    speed: 0
  },
  type_1: fire,
  type_2: flying,
  moves: [moves_list.flamethrower,
    moves_list.dragon_pulse,
    moves_list.air_slash,
    moves_list.focus_blast]
},
blastoise: {
  name: "Blastoise",
  //sprites: [loadImage("sprites/blastoise_front.png"), loadImage("sprites/blastoise_back.png")],
  status: 0,
  base_hp: 362,
  hp: 362,
  attack: 153,
  defense: 236,
  sp_atk: 295,
  sp_def: 247,
  speed: 192,
  stat_changes: {
    attack: 0,
    defense: 0,
    sp_atk: 0,
    sp_def: 0,
    speed: 0
  },
  type_1: water,
  type_2: none,
  moves: [moves_list.hydro_pump,
    moves_list.dragon_pulse,
    moves_list.ice_beam,
    moves_list.aura_sphere]
  },
venusaur: {
  name: "Venusaur",
  //sprites: [loadImage("sprites/venusaur_front.png"), loadImage("sprites/venusaur_back.png")],
  status: 0,
  base_hp: 363,
  hp: 363,
  attack: 152,
  defense: 202,
  sp_atk: 328,
  sp_def: 237,
  speed: 198,
  stat_changes: {
    attack: 0,
    defense: 0,
    sp_atk: 0,
    sp_def: 0,
    speed: 0
  },
  type_1: grass,
  type_2: poison,
  moves: [moves_list.synthesis,
    moves_list.energy_ball,
    moves_list.sludge_bomb,
    moves_list.venoshock]
  },
articuno: {
  name: "Articuno",
  //sprites: [loadImage("sprites/articuno_front.png"), loadImage("sprites/articuno_back.png")],
  status: 0,
  base_hp: 379,
  hp: 379,
  attack: 157,
  defense: 236,
  sp_atk: 317,
  sp_def: 286,
  speed: 212,
  stat_changes: {
    attack: 0,
    defense: 0,
    sp_atk: 0,
    sp_def: 0,
    speed: 0
  },
  type_1: ice,
  type_2: flying,
  moves: [moves_list.hurricane,
    moves_list.blizzard,
    moves_list.roost,
    moves_list.freeze_dry]
  }
}
let pokemon_list = [pokemon.dragonite, pokemon.garchomp, pokemon.charizard, pokemon.blastoise, pokemon.venusaur, pokemon.articuno]

function setup() {
  createCanvas(windowWidth, windowHeight);
  playerParty = new Party();
  cpuParty = new Party();
}

function draw() {
  //kill: console.log(pokemon.charizard.hp>damage_check(pokemon.dragonite, pokemon.charizard, pokemon.dragonite.moves[0])
  //raw damage: console.log(damage_check(pokemon.dragonite, pokemon.charizard, pokemon.dragonite.move_1))

}


function damage_check(user, target, move){
  if (move.accuracy < random(100)){
    return 0;
  }
  let user_state = user;
  let target_state = target;
  let crit_chance = 1;
  let damage;
  let effects_list = [0,
  //1 Confuses target
  (target.status = "confused"),
  //2 Heals 1/2 Max Health
  (user.hp += (user.base_hp/2)),
  //3 Flinches target
  (target.status = concat("flinch")),
  //4 Increases Attack
  (user.stat_changes.attack + move.effect[1]),
  //5 Burns Target
  (target.status = "burned"),
  //6 Lowers Sp. Def of target
  (target.stat_changes.sp_def - move.effect[1]),
  //7 Freezes Target
  (target.status = "frozen"),
  //8 Poisons Target
  (target.status = "poisoned"),
  //9 Status Check
  (damage *= hex_check(target)),
  //10 Freeze Dry
  (damage *= freeze_dry_check(target))
]
  user = user_state;
  target = target_state;

  if (move.category === physical){
    damage = Math.floor(
      Math.floor((42 * user.attack * move.power) / target.defense) / 50);
      if (user.status === "burned" && move.category === physical){
        damage *= 0.5;
      }
      if (user.stat_changes.attack >= 0){
        damage *= 1 + (user.stat_changes.attack * 0.5)
      }
      if (target.stat_changes.defense <= -1){
        damage *= 1 + (target.stat_changes.attack * -0.5)
      }

      // if (user.stat_changes.attack <=-1){
      //   damage *= 1 + (user.stat_changes.attack * fix equation)
      // }
  }
  else if (move.category === special){
    damage = Math.floor(
      Math.floor((42 * user.sp_atk * move.power) / target.sp_def) / 50);

      if (user.stat_changes.sp_atk >= 0){
        damage *= 1 + (user.stat_changes.sp_atk * 0.5)
      }
      if (target.stat_changes.sp_def <= -1){
        damage *= 1 + (target.stat_changes.sp_def * -0.5)
      }
  }

  if (move.effect[1] > random(100)){
    effects_list[move.effect[0]];
    if (target.stat_changes.attack < -6){

    }
  }

  damage *= (type_effect(target.type_1, move.type) * type_effect(target.type_2, move.type))

  if ((move.type === user.type_1)||(move.type === user.type_2)){
    damage *= 1.5;
  }
  
  // if (crit_chance>random(16)){
  //   damage *= 1.5;
  // }
  return Math.floor(damage);
}

function type_effect(pokemon_type, move_type){
  if (pokemon_type === normal){
    if (move_type === fighting){
      return 2;
    }
    else if (move_type === ghost){
      return 0;
    }
    return 1;
  }

  else if (pokemon_type === bug){

    if (move_type === fire || move_type === rock || move_type === flying){
      return 2;
    }
    else if (move_type === fighting || move_type === grass || move_type === ground){
      return 0.5;
    }
    return 1;
  }

  else if (pokemon_type === electric){
    if (move_type === ground){
      return 2;
    }
    else if (move_type === flying || move_type === steel || move_type === electric){
      return 0.5;
    }
    return 1;
  }

  else if (pokemon_type === flying){
    if (move_type === ice || move_type === rock || move_type === electric){
      return 2;
    }
    else if (move_type === bug || move_type === grass || move_type === fighting){
      return 0.5;
    }
    else if (move_type === ground){
      return 0;
    }
    else{
      return 1;
    }
  }
  
  else if (pokemon_type === dragon){
    if (move_type === fairy || move_type === dragon || move_type === ice){
      return 2;
    }
    else if (move_type === grass || move_type === fire || move_type ===  water || move_type === electric){
      return 0.5;
    }
    else{
      return 1;
    }
  }

  else if (pokemon_type === ice){
    if (move_type === rock || move_type === steel || move_type === fire || move_type === fighting){
      return 2;
    }
    else if (move_type === ice){
      return 0.5;
    }
    else{
      return 1;
    }
  }
  
  else if (pokemon_type === fairy){
    if (move_type === poison || move_type === steel){
      return 2;
    }
    else if (move_type === fighting || move_type === bug || move_type === dark){
      return 0.5;
    }
    else if (move_type === dragon){
      return 0;
    }
    return 1;
  }

  else if (pokemon_type === water){
    if (move_type === electric || move_type === grass){
      return 2;
    }
    else if (move_type === fire|| move_type === ice || move_type === water || move_type === steel){
      return 0.5;
    }
    return 1;
  }

  else if (pokemon_type === fire){
    if (move_type === water || move_type === rock || move_type === ground){
      return  2;
    }
    else if (move_type === ice || move_type === steel || move_type === bug || move_type === grass || move_type === fire){
      return 0.5;
    }
    return 1;
  }

  else if (pokemon_type === steel){
    if (move_type === fighting || move_type === fire || move_type === ground){
      return 2;
    }
    else if (move_type === normal || move_type === rock || move_type === fairy || move_type === dragon || move_type === flying || move_type === bug || move_type === steel || move_type === psychic || move_type === grass ){
      return 0.5;
    }

    else if (move_type === poison){
      return 0;
    }
    return 1;
  }

  else if (pokemon_type === psychic){
    if (move_type === dark || move_type === ghost || move_type === bug){
      return 2;
    }
    else if (move_type === fighting || move_type === psychic){
      return 0.5;
    }
    return 1;
  }

  else if (pokemon_type === dark){
    if (move_type === fairy || move_type === fighting || move_type === bug){
      return 2;
    }
    else if (move_type === dark || move_type === ghost){
      return 0.5;
    }
    else if (move_type === psychic){
      return 0;
    }
    return 1;
  }

  else if (pokemon_type === fighting){
    if (move_type === psychic || move_type === flying || move_type === fairy){
      return 2;
    }
    if (move_type === bug || move_type === dark){
      return 0.5;
    }
    return 1;
  }

  else if (pokemon_type === ghost){
    if (move_type === ghost || move_type === dark){
      return 2;
    }
    else if (move_type === bug){
      return 0.5;
    }
    else if (move_type === normal || move_type === fighting){
      return 0;
    }
  }

  else if (pokemon_type === poison){
    if (move_type === ground || move_type === psychic){
      return 2;
    }
    else if (move_type === grass || move_type === bug || move_type === fighting || move_type === fairy){
      return 0.5;
    }
    return 1;
  }

  else if (pokemon_type === grass){
    if (move_type === fire || move_type === ice || move_type === bug || move_type === poison || move_type === flying){
      return 2;
    }

    else if (move_type === ground || move_type === grass || move_type === electric){
      return 0.5;
    }
  }

  else if (pokemon_type === ground){
    if (move_type === water || move_type === grass || move_type === ice){
      return 2;
    }
    
    else if (move_type === rock || move_type === poison){
      return 0.5;
    }

    else if (move_type === electric){
      return 0;
    }
    return 1;
  }

  else if (pokemon_type === rock){
    if (move_type === steel || move_type === ground || move_type === grass || move_type === water || move_type === fighting){
      return 0;
    }
    else if (move_type === normal || move_type === flying || move_type === fire){
      return 0.5;
    }
    return 1;
  }
  else if (pokemon_type === none){
    return 1;
  }
  console.log("Error: TYPE data unknown");

}

function freeze_dry_check(target){
  if (target.type_1 === water || target.type_2 === water){
    return 4;
  }
  return 1;
}

function hex_check(target){
  if (target.status !== 0){
    return 2;
  }
  return 1;
}

function find_best_damage(user, target){
  let damage_holder = [];
  for (let i = 0; i<user.moves.length; i++){
    damage_holder.push(damage_check(user, target, user.moves[i]))
  }
  //return damage_holder
  if (damage_holder[0] === max(damage_holder)){
   return 0;
  }
  else if (damage_holder[1] === max(damage_holder)){
    return 1;
   }
  else if (damage_holder[2] === max(damage_holder)){
    return 2;
   }
  else if (damage_holder[3] === max(damage_holder)){
    return 3;
   }
}

function find_best_pokemon(user_party, target){
  let best_damage = 0;
  let best_choice = 0
  for (let i = 0; i<6; i++){
    let attack_damage = damage_check(user_party.base_list[i], target, user_party.base_list[i].moves[find_best_damage(user_party.base_list[i], target)])
    if (attack_damage > best_damage){
      best_choice = i
    }
  }
  return best_choice
}

class Party {
  constructor(){
    this.slot_1 = random(pokemon_list),
    this.slot_2 = random(pokemon_list),
    this.slot_3 = random(pokemon_list),
    this.slot_4 = random(pokemon_list),
    this.slot_5 = random(pokemon_list),
    this.slot_6 = random(pokemon_list),
    this.base_list = [this.slot_1, this.slot_2, this.slot_3, this.slot_4, this.slot_5, this.slot_6]
  }
  summary(){
    let temporary_party_list = [this.slot_1, this.slot_2, this.slot_3, this.slot_4, this.slot_5, this.slot_6];
    let offset = mouseY;
    for (let i = 0; i<6; i++){
      textFont("Courier New")
      //image(temporary_party_list[i].sprites[1], mouseX-80, offset, 80, 80)
      textStyle(BOLD)
      text(temporary_party_list[i].name+"      Lvl. 100", mouseX, offset-10)
      text("HP: "+temporary_party_list[i].hp, mouseX+100, offset+5)
      text("Attack: "+temporary_party_list[i].attack, mouseX+100, offset+15)
      text("Defense: "+temporary_party_list[i].defense, mouseX+100, offset+25)
      text("Sp. Atk: "+temporary_party_list[i].sp_atk, mouseX+100, offset+35)
      text("Sp. Def: "+temporary_party_list[i].sp_def, mouseX+100, offset+45)
      text("Speed: "+temporary_party_list[i].speed, mouseX+100, offset+55)
      textStyle(ITALIC)
      textStyle()
      text(temporary_party_list[i].type_1, mouseX,offset+10)
      text(temporary_party_list[i].type_2, mouseX+(temporary_party_list[i].type_1.length*8),offset+10)
      textStyle(NORMAL)
      if (temporary_party_list[i].status !== 0){
        text(temporary_party_list[i].status, mouseX, offset)}
      text(temporary_party_list[i].moves[0].name, mouseX, offset+25)
      text(temporary_party_list[i].moves[1].name, mouseX, offset+35)
      text(temporary_party_list[i].moves[2].name, mouseX, offset+45)
      text(temporary_party_list[i].moves[3].name, mouseX, offset+55)
      offset += 80;
    }
  }
}

function mouseClicked(){
  playerParty.summary()
}