// Pokemon Battle Simulator
// Trent Hatzel
// Started September 23, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
//https://github.com/smogon/damage-calc/blob/master/calc/src/mechanics/gen12.ts(line 157)(line 211)
//line 255 damage equation copied and slightly modified for variables that would be predefined in this instance
//The AI System is derived from my analysis of competetive play via play.pokemonshowdown.com| I have learned much about general and smart play, as well as bad, including predictive skills which I have mostly programmed onto this computer
let playerParty;
let cpuParty;
let activePlayer;
let activeCPU;
let physical = "ph";
let special = "sp";
let healing = "heal";
let boost = "boost";
let status = "status";
let newStatus = false;
let newConfused = 0;
let gameMode = "HP";
let panicModeCounter = 0;

//Convenience. Pressing shift constantly really slows me down
//defines Pokemon Types
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



let movesList = {
  //Defines all attacks and effects, which will be broken down and read in Damage Checker
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
    effect: [2, 100]},

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
  rock_slide: {
    name: "Rock Slide",
    type: rock,
    power: 75,
    accuracy: 90,
    pp: 10,
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
    effect: [4, 100, 2]},

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
    effect: [6, 20, 1]},

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
    accuracy: 10000,
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
    effect: [6,20, 1]},

  sludge_bomb: {
    name: "Sludge Bomb",
    type: poison,
    power: 90,
    accuracy: 100,
    pp: 10,
    category: special,
    priority: 0,
    effect: [8,30]},

  synthesis: {
    name: "Synthesis",
    type: grass,
    power: 0,
    accuracy: 0,
    pp: 10,
    category: healing,
    priority: 0,
    effect: [2, 100]},

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

  stone_edge: {
    name: "Stone Edge",
    type: rock,
    power: 100,
    accuracy: 80,
    pp: 5,
    category: physical,
    priority: 0,
    effect: [11,100]},

  crunch: {
    name: "Crunch",
    type: dark,
    power: 80,
    accuracy: 100,
    pp: 15,
    category: physical,
    priority: 0,
    effect: [12,20,1]},

  avalanche: {
    name: "Avalanche",
    type: ice,
    power: 60,
    accuracy: 100,
    pp: 10,
    category: physical,
    priority: 0,
    effect: [13,100]},

  heavy_slam: {
    name: "Heavy Slam",
    type: steel,
    power: 120,
    accuracy: 85,
    pp: 10,
    category: physical,
    priority: 0,
    effect: [0,0]},
  rest: {
    name: "Rest",
    type: psychic,
    power: 0,
    accuracy: 100,
    pp: 10,
    category: healing,
    priority: 0,
    effect: [14,100]},
  sleep_talk:{
    name: "Sleep Talk",
    type: psychic,
    power: 0,
    accuracy: 100,
    pp: 15,
    category: status,
    priority: 0,
    effect: [15, 100]
  },
  megahorn: {
    name: "Megahorn",
    type: bug,
    power: 120,
    accuracy: 85,
    pp: 10,
    category: physical,
    priority: 0,
    effect: [0,0]},
  close_combat: {
    name: "Close Combat",
    type: fighting,
    power: 120,
    accuracy: 100,
    pp: 5,
    category: physical,
    priority: 0,
    effect: [16,100]},
  struggle: {
    name: "Struggle",
    type: none,
    power: 40,
    accuracy: 100,
    pp: 0,
    category: physical,
    priority: 0,
    effect: [0,0]},
  curse:{
    name: "Curse",
    type: ghost,
    power: 0,
    accuracy: 100, 
    pp: 10, 
    category: boost,
    priority: 0,
    effect: [17, 100]
  }
};
  
//let damage = 0;
let pokemon = {
  dragonite: {
    name: "Dragonite",
    //sprites: [loadImage("sprites/dragonite_front.png"), loadImage("sprites/dragonite_back.png")],
    status: 0,
    bound: false,
    boundBy: none,
    boundTimer: 0,
    confused: false,
    confusedTimer: 0,
    leechSeed: false,
    // item: 0,
    // ability: 0,
    flinch: false,
    statusTimer: 0,
    baseHP: 356,
    hp: 356,
    attack: 403,
    defense: 226,
    sp_atk: 266,
    sp_def: 236,
    speed: 176,
    statModifiers: {
      attack: 0,
      defense: 0,
      sp_atk: 0,
      sp_def: 0,
      speed: 0
    },
    type1: dragon,
    type2: flying,
    moves: [movesList.dragon_claw, 
      movesList.hurricane, 
      movesList.extreme_speed, 
      movesList.roost]
  },
  garchomp: {
    name: "Garchomp",
    //sprites: [loadImage("sprites/garchomp_front.png"), loadImage("sprites/garchomp_back.png")],
    status: 0,
    bound: false,
    boundBy: none,
    boundTimer: 0,
    confused: false,
    confusedTimer: 0,
    leechSeed: false,
    // item: 0,
    // ability: 0,
    flinch: false,
    statusTimer: 0,
    baseHP: 357,
    hp: 357,
    attack: 359,
    defense: 226,
    sp_atk: 176,
    sp_def: 207,
    speed: 333,
    statModifiers: {
      attack: 0,
      defense: 0,
      sp_atk: 0,
      sp_def: 0,
      speed: 0
    },
    type1: dragon,
    type2: ground,
    moves: [movesList.dragon_claw,
      movesList.earthquake,
      movesList.iron_head,
      movesList.swords_dance]
  },
  charizard: {
    name: "Charizard",
    //sprites: [loadImage("sprites/charizard_front.png"), loadImage("sprites/charizard_back.png")],
    status: 0,
    bound: false,
    boundBy: none,
    boundTimer: 0,
    confused: false,
    confusedTimer: 0,
    leechSeed: false,
    // item: 0,
    // ability: 0,
    flinch: false,
    statusTimer: 0,
    baseHP: 297,
    hp: 297,
    attack: 155,
    defense: 192,
    sp_atk: 317,
    sp_def: 207,
    speed: 328,
    statModifiers: {
      attack: 0,
      defense: 0,
      sp_atk: 0,
      sp_def: 0,
      speed: 0
    },
    type1: fire,
    type2: flying,
    moves: [movesList.flamethrower,
      movesList.dragon_pulse,
      movesList.air_slash,
      movesList.focus_blast]
  },
  blastoise: {
    name: "Blastoise",
    //sprites: [loadImage("sprites/blastoise_front.png"), loadImage("sprites/blastoise_back.png")],
    status: 0,
    bound: false,
    boundBy: none,
    boundTimer: 0,
    confused: false,
    confusedTimer: 0,
    leechSeed: false,
    // item: 0,
    // ability: 0,
    flinch: false,
    statusTimer: 0,
    baseHP: 362,
    hp: 362,
    attack: 153,
    defense: 236,
    sp_atk: 295,
    sp_def: 247,
    speed: 192,
    statModifiers: {
      attack: 0,
      defense: 0,
      sp_atk: 0,
      sp_def: 0,
      speed: 0
    },
    type1: water,
    type2: none,
    moves: [movesList.hydro_pump,
      movesList.dragon_pulse,
      movesList.ice_beam,
      movesList.aura_sphere]
  },
  venusaur: {
    name: "Venusaur",
    //sprites: [loadImage("sprites/venusaur_front.png"), loadImage("sprites/venusaur_back.png")],
    status: 0,
    bound: false,
    boundBy: none,
    boundTimer: 0,
    confused: false,
    confusedTimer: 0,
    leechSeed: false,
    // item: 0,
    // ability: 0,
    flinch: false,
    statusTimer: 0,
    baseHP: 363,
    hp: 363,
    attack: 152,
    defense: 202,
    sp_atk: 328,
    sp_def: 236,
    speed: 199,
    statModifiers: {
      attack: 0,
      defense: 0,
      sp_atk: 0,
      sp_def: 0,
      speed: 0
    },
    type1: grass,
    type2: poison,
    moves: [movesList.synthesis,
      movesList.energy_ball,
      movesList.sludge_bomb,
      movesList.venoshock]
  },
  articuno: {
    name: "Articuno",
    //sprites: [loadImage("sprites/articuno_front.png"), loadImage("sprites/articuno_back.png")],
    status: 0,
    bound: false,
    boundBy: none,
    boundTimer: 0,
    confused: false,
    confusedTimer: 0,
    leechSeed: false,
    // item: 0,
    // ability: 0,
    flinch: false,
    statusTimer: 0,
    baseHP: 379,
    hp: 379,
    attack: 157,
    defense: 236,
    sp_atk: 317,
    sp_def: 286,
    speed: 212,
    statModifiers: {
      attack: 0,
      defense: 0,
      sp_atk: 0,
      sp_def: 0,
      speed: 0
    },
    type1: ice,
    type2: flying,
    moves: [movesList.hurricane,
      movesList.blizzard,
      movesList.roost,
      movesList.freeze_dry]
  },
  tyranitar: {
    name: "Tyranitar",
    //sprites: [loadImage("sprites/tyranitar_front.png"), loadImage("sprites/tyranitar_back.png")],
    status: 0,
    bound: false,
    boundBy: none,
    boundTimer: 0,
    confused: false,
    confusedTimer: 0,
    leechSeed: false,
    // item: 0,
    // ability: 0,
    flinch: false,
    statusTimer: 0,
    baseHP: 404,
    hp: 404,
    attack: 403,
    defense: 256,
    sp_atk: 226,
    sp_def: 236,
    speed: 114,
    statModifiers: {
      attack: 0,
      defense: 0,
      sp_atk: 0,
      sp_def: 0,
      speed: 0
    },
    type1: rock,
    type2: dark,
    moves: [movesList.stone_edge, 
      movesList.crunch, 
      movesList.avalanche, 
      movesList.earthquake]
  },
  aggron: {
    name: "Aggron",
    //sprites: [loadImage("sprites/aggron_front.png"), loadImage("sprites/aggron_back.png")],
    status: 0,
    bound: false,
    boundBy: none,
    boundTimer: 0,
    confused: false,
    confusedTimer: 0,
    leechSeed: false,
    // item: 0,
    // ability: 0,
    flinch: false,
    statusTimer: 0,
    baseHP: 344,
    hp: 344,
    attack: 256,
    defense: 396,
    sp_atk: 156,
    sp_def: 249,
    speed: 95,
    statModifiers: {
      attack: 0,
      defense: 0,
      sp_atk: 0,
      sp_def: 0,
      speed: 0
    },
    type1: steel,
    type2: dragon,
    moves: [movesList.heavy_slam, 
      movesList.curse, 
      movesList.rest, 
      movesList.sleep_talk]
  },
  heracross: {
    name: "Heracross",
    //sprites: [loadImage("sprites/heracross_front.png"), loadImage("sprites/heracross_back.png")],
    status: 0,
    bound: false,
    boundBy: none,
    boundTimer: 0,
    confused: false,
    confusedTimer: 0,
    leechSeed: false,
    // item: 0,
    // ability: 0,
    flinch: false,
    statusTimer: 0,
    baseHP: 341,
    hp: 341,
    attack: 383,
    defense: 186,
    sp_atk: 114,
    sp_def: 226,
    speed: 220,
    stat_changes: {
      attack: 0,
      defense: 0,
      sp_atk: 0,
      sp_def: 0,
      speed: 0
    },
    type1: bug,
    type2: fighting,
    moves: [movesList.megahorn, 
      movesList.rock_slide, 
      movesList.swords_dance, 
      movesList.close_combat]
  }
};
let pokemon_list = [pokemon.dragonite, pokemon.garchomp, pokemon.charizard, pokemon.blastoise, pokemon.venusaur, pokemon.articuno, pokemon.tyranitar, pokemon.aggron, pokemon.heracross];

function setup() {
  createCanvas(windowWidth, windowHeight);
  playerParty = new Party();
  cpuParty = new Party();
  activePlayer = playerParty.slot_1;
  activeCPU = cpuParty.slot_1;
}

function draw() {
  background(255);
  noSmooth();
  playerParty.summary(0,20);
  cpuParty.summary(width-200,20);
}


function damageCalculator(attacker, defender, move, isBattle){
  let attackerModdedSpeed = attacker.speed;
  let defenderModdedSpeed = defender.speed;
  if (attacker.status === "Paralyzed"){
    attackerModdedSpeed *= 0.5;
  }
  if (attacker.statModifiers.speed > 0){
    attackerModdedSpeed += attacker.statModifiers.speed * (0.5*attackerModdedSpeed);
  }
  if (defender.status === "Paralyzed"){
    defenderModdedSpeed *= 0.5;
  }
  if (defender.statModifiers.speed > 0){
    defenderModdedSpeed += defender.statModifiers.speed * (0.5*defenderModdedSpeed);
  }
  let criticalHitChance = 1;
  let damage;
  if (isBattle === false){
    if (move.category === healing || move.category === boost || move.category === status){
      return 0;
    }
  }
  
  if (move.category === physical){
    damage = Math.floor(
      Math.floor(42 * attacker.attack * move.power / defender.defense) / 50);
    if (attacker.status === "burned" && move.category === physical){
      damage *= 0.5;
    }
    if (attacker.statModifiers.attack >= 0){
      damage *= 1 + attacker.statModifiers.attack * 0.5;
    }
    if (defender.statModifiers.defense <= -1){
      damage *= 1 + defender.statModifiers.defense * -0.5;
    }
      
    // if (attacker.statModifiers.attack <=-1){
    //   damage *= 1 + (attacker.statModifiers.attack * fix equation)
    // }
  }
  else if (move.category === special){
    damage = Math.floor(
      Math.floor(42 * attacker.sp_atk * move.power / defender.sp_def) / 50);
      
    if (attacker.statModifiers.sp_atk >= 0){
      damage *= 1 + attacker.statModifiers.sp_atk * 0.5;
    }
    if (defender.statModifiers.sp_def <= -1){
      damage *= 1 + defender.statModifiers.sp_def * -0.5;
    }
  }
    
  if (move.effect[0] === 9){
    //9 Status check
    damage *= hexCheck(defender);
  }
  if (move.effect[0] === 10){
    //10 Freeze Dry (Super Effective against Water, in spite of Ice Type being resisted)
    damage *= freezeDryCheck(defender);
  }
  
  damage *= typeEffectivenessChecker(defender.type1, move.type) * typeEffectivenessChecker(defender.type2, move.type);
  
  if (move.type === attacker.type1||move.type === attacker.type2){
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
      return "Flinched";
    }
    if (attacker.status === "Paralyzed"){
      if (Math.round(random(3))===1){
        return "paralyzed";
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
    if (move.accuracy!== 0){
      if (move.accuracy < random(100)){
        return "missed";
      }
    }
    if (attacker.status === "Confused"){
      attacker.confusedTimer --;
      if (attacker.confusedTimer >0){
        if (Math.round(random(2))===1){
          return "confused";
        }
      }
      
    }
    
    if (!(move.effect[0] === 9 || move.effect[0] === 10)){
      if(move.effect[1]>=random(100)){
        if (move.effect[0] === 1){
          //1 Confuses defender
          defender.confused = true;
          defender.confusedTimer = random(2,5);
          newConfused = 1;
        }
        if (move.effect[0] === 2){
          //2 Heals 1/2 Max Health
          return "healed";
        }
        if (move.effect[0] === 3){
          //3 Flinches defender
          defender.flinch = true;
        }
        
        if (move.effect[0] === 4){
          //4 Increases Attack
          attacker.statModifiers.attack + move.effect[2];
          return "boost";
        }
        if (move.effect[0] === 5 && defender.status === 0 && defender.type1 !== fire && defender.type2 !== fire){
          //5 Burns defender
          newStatus = true;
          defender.status = "Burned";
        }
        if (move.effect[0] === 6){
          //6 Lowers Sp. Def of defender
          defender.statModifiers.sp_def - move.effect[2];
        }
        if (move.effect[0] === 7 && defender.status === 0 && defender.type1 !== ice && defender.type2 !== ice){
          //7 Freezes defender
          newStatus = true;
          defender.status = "Frozen";
        }
        if (move.effect[0] === 8 && defender.status === 0 && !(defender.type1 === poison || defender.type2 === steel) && !(defender.type2 === poison || defender.type1 === steel)){
          //8 Poisons defender
          newStatus = true;
          defender.status = "Poisoned";
        }
        if (move.effect[0] === 11){
          //Higher Critical Hit ratio
          criticalHitChance ++;
        }
        if (move.effect[0] === 12){
          //- Defense
          defender.statModifiers.defense - move.effect[2];
        }
        if (move.effect[0] === 13){
          //Doubles Damage if user is slower
          if (attackerModdedSpeed < defenderModdedSpeed){
            damage *= 2;
          }
        }    
        if (move.effect[0] === 14){
          if (attacker.status !== "Sleeping"){
            attacker.statusTimer += 2;
            attacker.hp = attacker.baseHP;
          }
          return "rest";
        }
        if (move.effect[0] === 15){
          //Sleep Talk
          return "sleep talk";
        }
        if (move.effect[0] === 16){
          //Close Combat Stat Drops
          attacker.statModifiers.defense --;
          attacker.statModifiers.sp_def --;
        }
        if (move.effect[0] === 17){
          attacker.statModifiers.attack ++;
          attacker.statModifiers.defense ++;
          attacker.statModifiers.speed --;
          return "boost";
        }    
      }
    }
    if (criticalHitChance>random(16)){
      damage *= 1.5;
      critical = true;
    }
    //
    damage = Math.floor(damage * random(217, 255) / 255);
  }
    
  else{
    //Produces the minimal damage value for a more careful AI
    damage = Math.floor(damage * (217/255));
  }
  return Math.floor(damage);
}
      
function typeEffectivenessChecker(pokemon_type, move_type){
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
    else if (move_type === normal || move_type === rock || move_type === fairy || move_type === dragon || move_type === flying || move_type === bug || move_type === steel || move_type === psychic || move_type === grass || move_type === ice){
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
    else if (move_type === grass || move_type === bug || move_type === fighting || move_type === fairy || move_type === poison){
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
      return 2;
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
  console.log("The Defender type is "+ pokemon_type);
  console.log("The Attack Type is " + move_type);

}

function freezeDryCheck(defender){
  if (defender.type1 === water || defender.type2 === water){
    return 4;
  }
  return 1;
}

function hexCheck(defender){
  if (defender.status !== 0){
    return 2;
  }
  return 1;
}

function findBestDamage(attacker, defender){
  let damageHolder = [];
  let highestDamage = 0;
  for (let i = 0; i<attacker.moves.length; i++){
    damageHolder.push(damageCalculator(attacker, defender, attacker.moves[i], false));
    if (damageHolder[i] >= damageHolder[highestDamage]){
      highestDamage = [i];
    }
  }
  
  return highestDamage;
}

function findBestOffensivePkemon(attacker_party, defender){
  let highestDamageOutput = [0,0];
  for (let i = 0; i<6; i++){
    let damage = damageCalculator(attacker_party.base_list[i], defender, attacker_party.base_list[i].moves[findBestDamage(attacker_party.base_list[i], defender)], false);
    if (damage > highestDamageOutput[0]){
      highestDamageOutput[0] = damage;
      highestDamageOutput[1] = i;
    }
  }
  return highestDamageOutput[1];
}

function turnInProgress(player, cpu, player_attack, cpu_attack){
  let turnDataLogs = [];
  let playerModdedSpeed = player.speed;
  let cpuModdedSpeed = cpu.speed;
  if (player.status === "Paralyzed"){
    playerModdedSpeed *= 0.5;
  }
  if (player.statModifiers.speed > 0){
    playerModdedSpeed += player.statModifiers.speed * (0.5*playerModdedSpeed);
  }
  else if (player.statModifiers.speed < 0) {
    if (cpu.status === "Paralyzed"){
      cpuModdedSpeed *= 0.5;
    }
  }
  //implement paralysis speed drop
  if (player_attack.priority !== cpu_attack.priority){
    if (player_attack.priority > cpu_attack.priority){
      let player_output = damageCalculator(player, cpu, player_attack, true);
      //player attack
      turnDataLogs.push(turn_data_check(player_output, player, cpu, player_attack));

      if (cpu.hp>0){
        let cpu_output = damageCalculator(cpu, player, cpu_attack, true);
        //cpu attack
        turnDataLogs.push(turn_data_check(cpu_output, cpu, player, cpu_attack));
      }
    }
    else{
      let cpu_output = damageCalculator(cpu, player, cpu_attack, true);
      //cpu attack
      turnDataLogs.push(turn_data_check(cpu_output, cpu, player, cpu_attack));

      if (player.hp>0){
        let player_output = damageCalculator(player, cpu, player_attack, true);
        //player attack
        turnDataLogs.push(turn_data_check(player_output, player, cpu, player_attack));
      }
    }
  }
  else if (playerModdedSpeed > cpuModdedSpeed){
    //Player Moves first
    let player_output = damageCalculator(player, cpu, player_attack, true);
    //player attack
    turnDataLogs.push(turn_data_check(player_output, player, cpu, player_attack));
    
    if (cpu.hp>0){
      let cpu_output = damageCalculator(cpu, player, cpu_attack, true);
      //cpu attack
      turnDataLogs.push(turn_data_check(cpu_output, cpu, player, cpu_attack));
    }
  }
  else{
    //CPU Moves first
    let cpu_output = damageCalculator(cpu, player, cpu_attack, true);
    //cpu attack
    turnDataLogs.push(turn_data_check(cpu_output, cpu, player, cpu_attack));

    if (player.hp>0){
      let player_output = damageCalculator(player, cpu, player_attack, true);
      //player attack
      turnDataLogs.push(turn_data_check(player_output, player, cpu, player_attack));
    }
  }
  turnDataLogs.push(post_turn_effects(player, cpu));
  turnDataLogs.push(post_turn_effects(cpu, player));
  if (cpu.status === "Fainted"){
    turnDataLogs.push("CPU was defeated!");
    turnDataLogs.push("CPU: You should be wearing shorts. They're soft and comfortable and easy to move in!");
    // findBestOffensivePkemon(cpuParty, player)
  }

  if (player.status === "Fainted"){
    turnDataLogs.push("Select your next Pokemon");
  }

  turnDataLogs = blank_array_clear(turnDataLogs);
  return turnDataLogs;
}

function turn_data_check(attackResult, attacker, defender, move){
  //Starts by checking if status ailments would inhibit attacking (decided in the isBattle portion of damageCalculator)
  let turnDataLogs = [];
  let attackToUse = move;
  let attacking = true;
  let sleepTalking = false;
  if (attackResult === "frozen"){
    turnDataLogs.push("It's frozen solid!");
    
    attacking = false;
  }
  if (attacker.status === "thawed"){
    turnDataLogs.push(attacker.name+ " thawed from the ice!");
    
    attacker.status = 0;
  }

  if (attacker.status === "Sleeping" && attackResult !== "rest"){
    //Checks if it is time to wake up, then responds accordingly
    if (attacker.statusTimer === 0){
      turnDataLogs.push([attacker.name+ " woke up!"]);
      attacker.status = 0;
    }
    else{
      turnDataLogs.push("It's fast asleep!");
      attacking = false;
    }
  }

  if (attackResult === "sleep talk"){
    if (attacker.status === "Sleeping"){
      sleepTalking = true;
      attacking = true;
      attackToUse = attacker.moves[Math.round(random(2))];
      attackResult =damageCalculator(attacker, defender, attackToUse, true);
    }
  }

  

  if (attacker.confused === true){
    if (attacker.confusedTimer === 0){
      turnDataLogs.push(attacker.name+" snapped out of it's confusion!");
      attacker.confused = false;
    }
    else{
      turnDataLogs.push(attacker.name + " is confused!");
    }
    
  }
  if (attackResult === "confused"){
    attacker.hp =- damageCalculator(attacker, attacker, movesList.struggle, true);
    turnDataLogs.push("It hurt itself in it's confusion!");
    
    attacking = false;
    turnDataLogs.push(faint_check(attacker));
  }
  if (attackResult === "paralyzed"){
    turnDataLogs.push("It's fully paralyzed!");
    
    attacking = false;
  }
  if (attackResult === "Flinched"){
    turnDataLogs.push(attacker.name+" flinched!");
    attacking = false;
  }
  if (attackResult === "boost"){
    if (attackToUse.name ==="Swords Dance"){
      turnDataLogs.push([attacker.name+ " used ",attackToUse.name , "!"]);
      turnDataLogs.push(attacker.name, "'s Attack Sharply increased!")  ;   
    }
  }
  if (typeof attackResult !== "number"){ 
    if (attackResult === "healed"){
      attacker.hp += Math.floor(attacker.baseHP/2);
      turnDataLogs.push([attacker.name+ " used ",attackToUse.name , "!"]);
      turnDataLogs.push(attacker.name+ " regained health!");
    }
    if (attacker.hp> attacker.baseHP){
      attacker.hp = attacker.baseHP;
    }
    else if (attackResult === "rest"){
      if (sleepTalking === true){
        turnDataLogs.push(attacker.name+" used Sleep Talk!");
        turnDataLogs.push(attacker.name+" used Rest!");
        turnDataLogs.push("But it failed!");
        attacking = false;
      }  
      else if (attackToUse === movesList.rest){
        turnDataLogs.push(attacker.name+" used "+attackToUse.name+"!");
        turnDataLogs.push(attacker.name+" fell asleep!");
        turnDataLogs.push(attacker.name+" regained health!");
        attacker.status === "Sleeping";
        attacking = false;
      }
      
    }
    attacking = false;
  }
  //Move Disabled checked
  if (attacking === true){
    turnDataLogs.push([attacker.name+ " used ",attackToUse.name , "!"]);
    //Move disabled false
    
    
    //animations.get(attackToUse.name)
    //animation input
    if (attackResult === "missed"){
      turnDataLogs.push("It's attack missed.");
     
    }
    else{
      defender.hp -= attackResult;
      if (gameMode === "%"){
        turnDataLogs.push(Math.round(10000*(attackResult/defender.baseHP+defender.hp/defender.baseHP))/100+"%  --> "+Math.max(Math.round(10000*(defender.hp/defender.baseHP)),0)/100+"%","-"+Math.round(10000*(attackResult/defender.baseHP))/100+"%");
      }
      else{
        turnDataLogs.push(attackResult+defender.hp+"HP  --> "+ Math.max(defender.hp, 0)+"HP","-"+attackResult+"HP");
      }
      let effectiveness = typeEffectivenessChecker(defender.type1, attackToUse.type) * typeEffectivenessChecker(defender.type2, attackToUse.type);
      if (attackToUse.name === "Freeze Dry"){
        effectiveness *= freezeDryCheck(defender);
      }
      if (effectiveness > 1.1){
        turnDataLogs.push("It's super effective!");
       
      }
      else if(effectiveness === 0){
        turnDataLogs.push("It doesn't effect "+defender.name+ "...");
       
      }
      else if(effectiveness < 0.9){
        turnDataLogs.push("It's not very effective!");
       
      }
      if (critical === true){
        turnDataLogs.push("Critical hit!");
       
        critical = false;
      }
    }
  }
  if (newStatus === true){
    turnDataLogs.push(defender.name+" was "+defender.status+"!");
    newStatus = false;
  }
  turnDataLogs.push(faint_check(defender));
  turnDataLogs = blank_clear(turnDataLogs);
  return turnDataLogs;
}



function post_turn_effects(pokemon, pokemon_2){
  let post_results = [];
  pokemon.statusTimer --;
  pokemon.boundTimer --;
  if (pokemon.status === "Poisoned"){
    pokemon.hp -= Math.floor(pokemon.baseHP/8);
    post_results.push(pokemon.name+" is poisoned!");
    post_results.push(faint_check(pokemon));
  }
  if (pokemon.status === "Burned"){
    pokemon.hp -= Math.floor(pokemon.baseHP/16);
    post_results.push(pokemon.name+" is burned!");
    post_results.push(faint_check(pokemon));
  }
  if (pokemon.status === "Badly Poisoned"){
    pokemon.hp -= Math.floor(pokemon.baseHP/16*-pokemon.statusTimer);
    post_results.push(pokemon.name+" is badly poisoned!");
    post_results.push(faint_check(pokemon));
  }
  if (pokemon.bound === true){
    if (pokemon.boundTimer > 0){
      pokemon.hp -= Math.floor(pokemon.baseHP/8);
      post_results.push(pokemon.name+" was hurt by"+pokemon.boundBy+"!");
      post_results.push(faint_check(pokemon));
    }
    else{
      post_results.push(pokemon.name+" was freed from "+pokemon.boundBy);
      pokemon.boundBy = "";
      pokemon.bound = false;
    }
  }
  if (pokemon.leechSeed === true){
    pokemon.hp -= Math.floor(pokemon.baseHP/8);
    pokemon_2.hp += Math.floor(pokemon.baseHP/8);
    post_results.push(pokemon.name+"'s health was sapped by Leech Seed!");
    post_results.push(faint_check(pokemon));
  }
  post_results = blank_clear(post_results);
  return post_results;
}


function faint_check(pokemon){
  if (pokemon.hp <= 0){
    pokemon.hp = 0;
    pokemon.status = "Fainted";
    return pokemon.name+ " fainted!";
  }
  return "";
}
function blank_clear(list){
  let new_list = list;
  for(let i = new_list.length-1; i>=0; i --){
    if (new_list[i].length<=1){
      new_list.splice(i, 1);
    }
  }
  return new_list;
}
function blank_array_clear(list){
  let new_list = list;
  for(let i = new_list.length-1; i>=0; i --){
    if (new_list[i] === []){
      new_list.splice(i, 1);
    }
  }
  return new_list;
}

function aiMoveSelect(cpu, player, cpuSpeed, playerSpeed){
  //data guide| 0 = has-FILLER-Move? | 1 = FILLER-MoveNumber
  let priorityCheck = [false, 0];
  let healCheck = [false, 0];
  let boostCheck = [false, 0];
  let hasKillMove = false;
  let bestKillMove = 0;
  let moveCanKill = [false, false, false, false];

  
  
  //Checks through moves, and learns what the options are
  //IF multiple of the same type of move(boost/heal) exist, it WOULD choose the move further in the list, but no reliable movesets would feature 2 boost moves or 2 healing moves so I'm not designing an evaluator for those conditions
  for (let i = 0; i < cpu.moves.length; i++){
    //Checks if it has a priority move
    if (cpu.moves[i].priority>0){
      priorityCheck[0] = true;
      priorityCheck[1] = i;
    }

    //Checks if it has a healing move
    if (cpu.moves[i].category === healing){
      healCheck[0] = true;
      healCheck[1] = i;
    }

    //Checks if it has a boosting move
    if (cpu.moves[i].category === boost){
      boostCheck[0] = true;
      boostCheck[1] = i;
    }

    if (cpu.moves[i].power !== 0){
      //Checks if any moves can kill
      if (damageCalculator(cpu, player, cpu.moves[i], false)>player.hp){
        //Sets kill moves and evaluates them. If multiple kill moves exist, it checks which move has the best accuracy and assigns that move as the bestKillMove
        moveCanKill[i] = true;

        if (hasKillMove === false){
          hasKillMove = true;
          bestKillMove = i;
        }
        else{
          if (cpu.moves[i].accuracy > cpu.moves[bestKillMove].accuracy){
            bestKillMove = i;
          }
        }

      }
    }
  }


  //Checks if a) The Computer can attack before the player, b) It has the ability to Faint the player| If it can land a blow to KO the player, it will. This plays off of later AI commands. This
  if (cpuSpeed > playerSpeed && hasKillMove === true || priorityCheck[0] === true && moveCanKill[priorityCheck[1]]){
    //Clarifies if it is using a Priority move
    if (moveCanKill[priorityCheck[1]] === true){
      return cpu.moves[priorityCheck[1]];
    }

    //Picks the best move it has with the ability to faint the target definitively (unless data changes afterwards)
    return cpu.moves[bestKillMove];
  
  }

  //Prevents computer from wasting time if it's at risk of dying irregardless (a real bad matchup) and hits as hard as it can anyways
  if (cpu.baseHP < damageCalculator(player, cpu, player.moves[findBestDamage(player, cpu)], false)){
    return cpu.moves[findBestDamage(cpu, player)];
  }

  //Checks if CPU is about to lose (if it were faced with another CPU)
  if (cpu.hp < damageCalculator(player, cpu, player.moves[findBestDamage(player, cpu)], false)){
    //Avoids outsmarting the AI into repeatedly spamming a priority move, as after being on the edge of death. Only works for 2 turns before it defaults back to normal patterns, and it will not fall for the same behaviour again, even if it might be detrimental in the future. This is because real players are likely to attempt it again.
    if (panicModeCounter <= 1){
      //If it can heal before it gets killed, it will. If it knows the player toyed with it once already, even if it doesn't move first, it will attempt healing
      if (healCheck[0] === true && (cpuSpeed > playerSpeed || panicModeCounter >= 1)){
        return cpu.moves[healCheck[1]];
      }
      //If it can do one last priority attack before it dies in a last-ditch attempt, even if it can't kill, it will (even a little is better than nothing)
      else if(priorityCheck[0] === true){
        panicModeCounter ++;
        return cpu.moves[priorityCheck[1]];
      }
    }
  }
  //The computer knows it shouldn't be at risk of dying immediately, so it plays no desperate measures


  //Checks if it would be in kill range next turn (if it were faced with another CPU), and prepares to heal in response to avoid this
  if (cpu.hp < 2*damageCalculator(player, cpu, player.moves[findBestDamage(player, cpu)], false) && playerSpeed > cpuSpeed){
    if (healCheck[0] === true){
      return cpu.moves[healCheck[1]];
    }
  }

  //If near full health, it will use a boosting move
  if (cpu.hp > cpu.baseHP*0.75){
    if(boostCheck[0] === true){
      return cpu.moves[boostCheck[1]];
    }
  }
  //If there are no undue risks, the CPU will strike with it's best overalll move against the player (best balance between Damage and Accuracy)
  if (cpu.hp > cpu.baseHP*0.4){
    return cpu.moves[findBestOverallMove(cpu, player)];
  }
  //If none of these conditions are true (Below 40% and not at risk of dying/has no healing or priority moves), it will use it's strongest move regardless of the risk factor
  return cpu.moves[findBestDamage(cpu, player)];
}

function findBestOverallMove(attacker, defender){
  let resultList = [];
  let bestOutcome = 0;
  for (let i = 0; i < attacker.moves.length; i++){
    let riskRecalc = damageCalculator(attacker, defender, attacker.moves[i], false);
    riskRecalc = (riskRecalc*2 + attacker.moves[i].accuracy)/3;
    resultList.push(riskRecalc);
    if (riskRecalc < resultList[bestOutcome] || resultList.length === 1){
      bestOutcome = i;
    }
  }
  return bestOutcome;
}


class Party {
  constructor(){
    this.slot_1 = random(pokemon_list),
    this.slot_2 = random(pokemon_list),
    this.slot_3 = random(pokemon_list),
    this.slot_4 = random(pokemon_list),
    this.slot_5 = random(pokemon_list),
    this.slot_6 = random(pokemon_list),
    this.base_list = [this.slot_1, this.slot_2, this.slot_3, this.slot_4, this.slot_5, this.slot_6];
  }
  summary(x, y){
    let temporaryPartyList = [this.slot_1, this.slot_2, this.slot_3, this.slot_4, this.slot_5, this.slot_6];
    let offset = y;
    for (let i = 0; i<temporaryPartyList.length; i++){
      textFont("Courier New");
      //image(temporaryPartyList[i].sprites[1], x-80, offset, 80, 80)
      textStyle(BOLD);
      text(temporaryPartyList[i].name+ "       Lvl. 100", x, offset-10);
      text("HP: "+temporaryPartyList[i].hp+"/"+temporaryPartyList[i].baseHP, x+110, offset+5);
      text("Attack: "+temporaryPartyList[i].attack, x+110, offset+15);
      text("Defense: "+temporaryPartyList[i].defense, x+110, offset+25);
      text("Sp. Atk: "+temporaryPartyList[i].sp_atk, x+110, offset+35);
      text("Sp. Def: "+temporaryPartyList[i].sp_def, x+110, offset+45);
      text("Speed: "+temporaryPartyList[i].speed, x+110, offset+55);
      textStyle(ITALIC);
      textStyle();
      text(temporaryPartyList[i].type1, x,offset+10);
      text(temporaryPartyList[i].type2, x+temporaryPartyList[i].type1.length*8,offset+10);
      textStyle(NORMAL);
      if (temporaryPartyList[i].status !== 0){
        text(temporaryPartyList[i].status, x, offset);
      }
      text(temporaryPartyList[i].moves[0].name, x, offset+25);
      text(temporaryPartyList[i].moves[0].pp, x+temporaryPartyList[i].moves[0].name.length*8, offset+25);
      text(temporaryPartyList[i].moves[1].name, x, offset+35);
      text(temporaryPartyList[i].moves[1].pp, x+temporaryPartyList[i].moves[1].name.length*8, offset+35);
      text(temporaryPartyList[i].moves[2].name, x, offset+45);
      text(temporaryPartyList[i].moves[2].pp, x+temporaryPartyList[i].moves[2].name.length*8, offset+45);
      text(temporaryPartyList[i].moves[3].name, x, offset+55);
      text(temporaryPartyList[i].moves[3].pp, x+temporaryPartyList[i].moves[3].name.length*8, offset+55);
      offset += 80;
    }
  }
}