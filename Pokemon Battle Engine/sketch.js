// Pokemon Battle Simulator
// Trent Hatzel
// Started September 23, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
//https://github.com/smogon/damage-calc/blob/master/calc/src/mechanics/gen12.ts(line 157)(line 211)
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
    accuracy: 100,
    pp: 20,
    category: special,
    priority: 0,
    effect: [10,100]},
  struggle: {
    name: "Struggle",
    type: none,
    power: 40,
    accuracy: 100,
    pp: 0,
    category: physical,
    priority: 0,
    effect: [0,0]},
  }
  
//let damage = 0;
let pokemon = {
dragonite: {
    name: "Dragonite",
    //sprites: [loadImage("sprites/dragonite_front.png"), loadImage("sprites/dragonite_back.png")],
    status: 0,
    flinch: false,
    status_timer: 0,
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
  flinch: false,
  status_timer: 0,
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
  flinch: false,
  status_timer: 0,
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
  flinch: false,
  status_timer: 0,
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
  flinch: false,
  status_timer: 0,
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
  flinch: false,
  status_timer: 0,
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
    background(255)
    noSmooth();
    playerParty.summary(0,20)
    cpuParty.summary(width-200,20)
  //kill: console.log(pokemon.charizard.hp>damage_check(pokemon.dragonite, pokemon.charizard, pokemon.dragonite.moves[0])
  //raw damage: console.log(damage_check(pokemon.dragonite, pokemon.charizard, pokemon.dragonite.move_1))

}


function damage_check(attacker, defender, move, isBattle){
  let attacker_state = attacker;
  let defender_state = defender;
  let crit_chance = 1;
  let damage;
  if (isBattle === false){
    if (move.category === healing || move.category === boost){
      return 0;
    }
  }
  
  attacker = attacker_state;
  defender = defender_state;
  
  if (move.category === physical){
    damage = Math.floor(
      Math.floor((42 * attacker.attack * move.power) / defender.defense) / 50);
      if (attacker.status === "burned" && move.category === physical){
        damage *= 0.5;
      }
      if (attacker.stat_changes.attack >= 0){
        damage *= 1 + (attacker.stat_changes.attack * 0.5)
      }
      if (defender.stat_changes.defense <= -1){
        damage *= 1 + (defender.stat_changes.defense * -0.5)
      }
      
      // if (attacker.stat_changes.attack <=-1){
        //   damage *= 1 + (attacker.stat_changes.attack * fix equation)
        // }
      }
  else if (move.category === special){
    damage = Math.floor(
      Math.floor((42 * attacker.sp_atk * move.power) / defender.sp_def) / 50);
      
      if (attacker.stat_changes.sp_atk >= 0){
        damage *= 1 + (attacker.stat_changes.sp_atk * 0.5)
      }
      if (defender.stat_changes.sp_def <= -1){
        damage *= 1 + (defender.stat_changes.sp_def * -0.5)
      }
    }
    
  if (move.effect[0] === 9){
    //9 Status check
    damage *= hex_check(defender)}
  if (move.effect[0] === 10){
    //10 Freeze Dry
    damage *= freeze_dry_check(defender)}
  
  damage *= (type_effect(defender.type_1, move.type) * type_effect(defender.type_2, move.type))
  
  if ((move.type === attacker.type_1)||(move.type === attacker.type_2)){
    damage *= 1.5;
  }
  if (isBattle === true){
    
    if (move.type === fire){
      if (attacker.status === "Frozen"){
        attacker.status === "thawed";
      }
    }
    if (attacker.flinch){
      attacker.flinch = false;
      return "Flinched"
    }
    if (attacker.status === "Paralyzed"){
      if (Math.round(random(3))===1){
        return "paralyzed"
      }
    }
    if (attacker.status === "Frozen"){
      if (Math.round(random(5))===1){
        attacker.status = "thawed";
      }
      else{
        return "frozen";
      }
    }
    if (move.accuracy < random(100)){
      return "missed";
    }
    if (attacker.status === "Confused"){
      if (Math.round(random(2))===1){
        return "confused"
      }
    }
    if (crit_chance>random(16)){
      damage *= 1.5;
      critical = true
    }
    if (!(move.effect[0] === 9 || move.effect[0] === 10)){
      if(move.effect[1]>random(100)){
        if (move.effect[0] === 1){
          //1 Confuses defender
          defender.status = "Confused"}
        if (move.effect[0] === 2){
          //2 Heals 1/2 Max Health
          attacker.hp += (attacker.base_hp/2)
          return "healed"}
        if (move.effect[0] === 3){
          //3 Flinches defender
          defender.flinch = true}
        if (move.effect[0] === 4){
          //4 Increases Attack
          attacker.stat_changes.attack + move.effect[1]}
        if (move.effect[0] === 5){
          //5 Burns defender
          defender.status = "Burned"}
        if (move.effect[0] === 6){
          //6 Lowers Sp. Def of defender
          defender.stat_changes.sp_def - move.effect[1]}
        if (move.effect[0] === 7){
          //7 Freezes defender
          defender.status = "Frozen"}
        if (move.effect[0] === 8){
          //8 Poisons defender
          defender.status = "Poisoned"}        
      }
    }
    
    //
    damage = Math.floor((damage * random(217, 255)) / 255)
    }
    
  else{
    //Produces the minimal damage value for a more careful AI
    damage = Math.floor(damage * (217/255))
  }
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
    return 1;
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
  console.log("The Defender type is "+ pokemon_type)
  console.log("The Attack Type is " + move_type)

}

function freeze_dry_check(defender){
  if (defender.type_1 === water || defender.type_2 === water){
    return 4;
  }
  return 1;
}

function hex_check(defender){
  if (defender.status !== 0){
    return 2;
  }
  return 1;
}

function find_best_damage(attacker, defender){
  let damage_holder = [];
  for (let i = 0; i<attacker.moves.length; i++){
    damage_holder.push(damage_check(attacker, defender, attacker.moves[i], false))
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
  console.log("The Damage outputs are "+damage_holder)
}

function find_best_pokemon(attacker_party, defender){
  let best_damage = 0;
  let best_choice = 0
  for (let i = 0; i<6; i++){
    let attack_damage = damage_check(attacker_party.base_list[i], defender, attacker_party.base_list[i].moves[find_best_damage(attacker_party.base_list[i], defender)], false)
    if (attack_damage > best_damage){
      best_choice = i
    }
  }
  return best_choice
}

function turn_in_action(player, cpu, player_attack, cpu_attack){
  //implement paralysis speed drop
  // if (player_attack.priority !== cpu_attack.priority){
  //   if (player_attack.priority > cpu_attack.priority){
  //     let player_output = damage_check(player, cpu, player_attack, true)
  //     //player attack
  //     turn_data_check(player_output, player, cpu, player_attack)

  //     if (cpu.hp>0){
  //       let cpu_output = damage_check(cpu, player, cpu_attack, true)
  //       //cpu attack
  //       turn_data_check(cpu_output, cpu, player, cpu_attack)
  //     }
  //   }
  //   else{
  //     let cpu_output = damage_check(cpu, player, cpu_attack, true)
  //       //cpu attack
  //       turn_data_check(cpu_output, cpu, player, cpu_attack)

  //     if (player.hp>0){
  //       let player_output = damage_check(player, cpu, player_attack, true)
  //     //player attack
  //     turn_data_check(player_output, player, cpu, player_attack)
  //     }
  //   }
  // }
  if (player.speed > cpu.speed){
    let player_output = damage_check(player, cpu, player_attack, true)
      //player attack
      turn_data_check(player_output, player, cpu, player_attack)

      if (cpu.hp>0){
        let cpu_output = damage_check(cpu, player, cpu_attack, true)
        //cpu attack
        turn_data_check(cpu_output, cpu, player, cpu_attack)
      }
    }
  else{
    let cpu_output = damage_check(cpu, player, cpu_attack, true)
        //cpu attack
        turn_data_check(cpu_output, cpu, player, cpu_attack)

      if (player.hp>0){
        let player_output = damage_check(player, cpu, player_attack, true)
      //player attack
      turn_data_check(player_output, player, cpu, player_attack)}
  }
}

function turn_data_check(move_result, attacker, defender, move){
  let attacking = true
  if (attacker.status === "thawed"){
    console.log(attacker.name+" thawed from the ice.");
    attacker.status = 0;}
  if (attacker.status === "woke"){
    console.log(attacker.name+" woke up!");
    attacker.status = 0;}
  if (attacker.status === "sleep"){
    console.log("It's fast asleep!");
    attacker.status_timer --;
    attacking = false
    if (attacker.status_timer === 0){
      attacker.status === "woke";
    }
  }
  if (attacker.status === "confused"){
    console.log(attacker.name +" is confused!")
  }
  if (move_result === "confused"){
    attacker.hp =- damage_check(attacker, attacker, moves_list.struggle, true)
    console.log("It hurt itself in it's confusion!")
    attacking = false;
    if (attacker.hp < 0){
      attacker.hp = 0;
      attacker.status = "Fainted";
    }
  }
  if (move_result === "paralyzed"){
    console.log("It's fully paralyzed!");
    attacking = false;
  }
  
  if (attacking === "true"){
    console.log(attacker.name+" used "+move.name+"!")
    if (move_result === "missed"){
      console.log("It's attack missed.")
    }
    else{
      defender.hp -= move_result;
      if (defender.hp < 0){
        defender.hp = 0;
        defender.status = "Fainted";
      }
      let effectiveness = (type_effect(defender.type_1, move.type) * type_effect(defender.type_2, move.type))
      if (effectiveness < 1){
        console.log("It's super effective!")
      }
      else if(effectiveness === 0){
        console.log("It doesn't effect "+defender.name+"...")
      }
      else if(effectiveness > 1){
        console.log("It's not very effective!")
      }
    }
  }
  if (defender.hp === 0){
    console.log(defender.name+" fainted!")
  }
  if (attacker.hp === 0){
    console.log(attacker.name+" fainted!")
  }

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
  summary(x, y){
    let temporary_party_list = [this.slot_1, this.slot_2, this.slot_3, this.slot_4, this.slot_5, this.slot_6];
    let offset = y;
    for (let i = 0; i<6; i++){
      textFont("Courier New")
      //image(temporary_party_list[i].sprites[1], x-80, offset, 80, 80)
      textStyle(BOLD)
      text(temporary_party_list[i].name+"       Lvl. 100", x, offset-10)
      text("HP: "+temporary_party_list[i].hp+"/"+temporary_party_list[i].base_hp, x+110, offset+5)
      text("Attack: "+temporary_party_list[i].attack, x+110, offset+15)
      text("Defense: "+temporary_party_list[i].defense, x+110, offset+25)
      text("Sp. Atk: "+temporary_party_list[i].sp_atk, x+110, offset+35)
      text("Sp. Def: "+temporary_party_list[i].sp_def, x+110, offset+45)
      text("Speed: "+temporary_party_list[i].speed, x+110, offset+55)
      textStyle(ITALIC)
      textStyle()
      text(temporary_party_list[i].type_1, x,offset+10)
      text(temporary_party_list[i].type_2, x+(temporary_party_list[i].type_1.length*8),offset+10)
      textStyle(NORMAL)
      if (temporary_party_list[i].status !== 0){
        text(temporary_party_list[i].status, x, offset)}
      text(temporary_party_list[i].moves[0].name, x, offset+25)
      //text(temporary_party_list[i].moves[0].pp, (temporary_party_list[i].moves[0].name.length*8), offset+25)
      text(temporary_party_list[i].moves[1].name, x, offset+35)
      //text(temporary_party_list[i].moves[1].pp, (temporary_party_list[i].moves[1].name.length*8), offset+35)
      text(temporary_party_list[i].moves[2].name, x, offset+45)
      //text(temporary_party_list[i].moves[2].pp, (temporary_party_list[i].moves[2].name.length*8), offset+45)
      text(temporary_party_list[i].moves[3].name, x, offset+55)
      //text(temporary_party_list[i].moves[3].pp, (temporary_party_list[i].moves[3].name.length*8), offset+55)
      offset += 80;
    }
  }
}
