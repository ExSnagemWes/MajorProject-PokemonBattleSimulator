// Pokemon Battle Simulator
// Trent Hatzel
// Started September 23, 2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
//https://github.com/smogon/damage-calc/blob/master/calc/src/mechanics/gen12.ts(line 157)(line 211)
//https://www.spriters-resource.com/game_boy_advance/pokemonfireredleafgreen/sheet/3866/
//line 255 damage equation copied and slightly modified for variables that would be predefined in this instance
//The AI System is derived from my analysis of competetive play via play.pokemonshowdown.com| I have learned much about general and smart play, as well as bad, including predictive skills which I have mostly programmed onto this computer
let playerParty, data, cpuParty, activePlayer, activeCPU, backgroundMap, playerX, playerY, cpuX, cpuY, music, spriteScale;
let trainerClasses = ["Hiker", "Youngster", "Beauty", "Trainer", "Bugcatcher", "Pokemaniac", "Triathlete", "Ninja", "Wanderer", "Gentleman", "Biker", "Hex Maniac", "Leader", "Boss", "Gambler", "Old Man",];
let names = ["Todd", "Valerie", "Saidy", "Yash", "Sam", "Dave", "Kianna", "Mathew", "Vince", "Carl", "Billie", "Joanna", "Keanu", "Ike", "Natalia", "Taylor", "Emma", "Winston", "Wade", "James", "Kari", "Mark", "Bean", "Emilia", "Kenneth", "Nigel", "Cassandra", "Rias", "Lance", "Agatha", "Bruno", "Lorelei", "Wallace", "Brock", "Misty", "Lt. Surge", "Blaine", "Giovanni", "Jessie", "Erika", "Sabrina", "Koga"];
let opponentName;
let physical = "Physical";
let special = "Special";
let shock = "Shock";
let healing = "Healing";
let boost = "Boost/Cripple";
let status = "Other";
let newStatus = false;
let newConfused = 0;
let newBound = false;

let moveSelected = 0;


let gameMode = "HP";
let panicModeCounter = 0;
let statusUsed = false;

let readerBusy = true;
let readerProgress = -1;
let resetReader = false;
let switchStarted = false;
let textInterface = "Press 'Spacebar' to begin, and '-' and '=/+' to navigate your attack choice. ";

let critical = false;
let gameEnded = false;

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

  dazzling_gleam: {
    name: "Dazzling Gleam",
    type: fairy, 
    power: 80, 
    accuracy: 100, 
    pp: 10, 
    category: special,
    priority: 0,
    effect: [0, 0]},

  hyper_voice: {
    name: "Hyper Voice",
    type: normal, 
    power: 90, 
    accuracy: 100, 
    pp: 10, 
    category: special,
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

  signal_beam: {
    name: "Signal Beam",
    type: bug,
    power: 75,
    accuracy: 100,
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
    effect: [-1,0]},

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

  dark_pulse: {
    name: "Dark Pulse",
    type: dark,
    power: 80,
    accuracy: 100,
    pp: 15,
    category: special,
    priority: 0,
    effect: [3, 20]},

  body_slam: {
    name: "Body Slam",
    type: normal,
    power: 85,
    accuracy: 100,
    pp: 15,
    category: physical,
    priority: 0,
    effect: [18, 30]},
  
  fire_blast: {
    name: "Fire Blast",
    type: fire,
    power: 120,
    accuracy: 85,
    pp: 5,
    category: special,
    priority: 0,
    effect: [5, 30]},

  mystical_fire: {
    name: "Mystical Fire",
    type: fire,
    power: 75,
    accuracy: 100,
    pp: 10,
    category: special,
    priority: 0,
    effect: [19, 100, 1]},

  skitter_smack: {
    name: "Skitter Smack",
    type: bug,
    power: 75,
    accuracy: 100,
    pp: 10,
    category: physical,
    priority: 0,
    effect: [19, 100, 1]},

  moonblast: {
    name: "Moonblast",
    type: fairy,
    power: 95,
    accuracy: 100,
    pp: 10,
    category: special,
    priority: 0,
    effect: [19, 30, 1]},
  
  rock_slide: {
    name: "Rock Slide",
    type: rock,
    power: 75,
    accuracy: 90,
    pp: 10,
    category: physical,
    priority: 0,
    effect: [3, 30]},

  thunder_wave: {
    name: "Thunder Wave",
    type: electric,
    power: 0,
    accuracy: 100,
    pp: 30,
    category: status,
    priority: 0,
    effect: [18,100]},

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

  thunderbolt: {
    name: "Thunderbolt",
    type: electric,
    power: 95,
    accuracy: 100,
    pp: 15,
    category: special,
    priority: 0,
    effect: [18, 20]},
  
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
    accuracy: 110,
    pp: 20,
    category: special,
    priority: 0,
    effect: [0,0]},

  psystrike: {
    name: "Psystrike",
    type: psychic,
    power: 100,
    accuracy: 100,
    pp: 10,
    category: shock,
    priority: 0,
    effect: [-2,0]},
  
  scald: {
    name: "Scald",
    type: water,
    power: 80,
    accuracy: 100,
    pp: 15,
    category: special,
    priority: 0,
    effect: [5,30]},

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

  flash_cannon: {
    name: "Flash Cannon",
    type: steel,
    power: 90,
    accuracy: 100,
    pp: 10,
    category: special,
    priority: 0,
    effect: [6,20, 1]},

  bug_buzz: {
    name: "Bug Buzz",
    type: bug,
    power: 90,
    accuracy: 100,
    pp: 10,
    category: special,
    priority: 0,
    effect: [6,20, 1]},

  psychiC: {
    name: "Psychic ",
    type: psychic,
    power: 90,
    accuracy: 100,
    pp: 10,
    category: special,
    priority: 0,
    effect: [6,20, 1]},

  shadow_ball: {
    name: "Shadow Ball",
    type: ghost,
    power: 80,
    accuracy: 100,
    pp: 15,
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

  recover: {
    name: "Recover",
    type: normal,
    power: 0,
    accuracy: 0,
    pp: 10,
    category: healing,
    priority: 0,
    effect: [2, 100]},

  softboiled: {
    name: "Soft-Boiled",
    type: normal,
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

  thunder: {
    name: "Thunder",
    type: electric,
    power: 120,
    accuracy: 70,
    pp: 10,
    category: special,
    priority: 0,
    effect: [18,30]},

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

  razor_shell: {
    name: "Razor Shell",
    type: water,
    power: 75,
    accuracy: 95,
    pp: 15,
    category: physical,
    priority: 0,
    effect: [12,50,1]},
  
  avalanche: {
    name: "Avalanche",
    type: ice,
    power: 60,
    accuracy: 100,
    pp: 10,
    category: physical,
    priority: 0,
    effect: [13,100]},

  gyro_ball: {
    name: "Gyro Ball",
    type: steel,
    power: 75,
    accuracy: 100,
    pp: 10,
    category: physical,
    priority: 0,
    effect: [13,100]},

  payback: {
    name: "Payback",
    type: dark,
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
    effect: [15, 100]},

  megahorn: {
    name: "Megahorn",
    type: bug,
    power: 120,
    accuracy: 85,
    pp: 10,
    category: physical,
    priority: 0,
    effect: [0,0]},

  power_whip: {
    name: "Power Whip",
    type: grass,
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

  draco_meteor: {
    name: "Draco Meteor",
    type: dragon,
    power: 120,
    accuracy: 100,
    pp: 5,
    category: special,
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
    effect: [17, 100]},

  leech_seed:{
    name: "Leech Seed",
    type: grass,
    power: 0,
    accuracy: 100, 
    pp: 10, 
    category: status,
    priority: 0,
    effect: [21, 100]},

  toxic:{
    name: "Toxic",
    type: poison,
    power: 0,
    accuracy: 90, 
    pp: 10, 
    category: status,
    priority: 0,
    effect: [22, 100]},

  calm_mind:{
    name: "Calm Mind",
    type: psychic,
    power: 0,
    accuracy: 100, 
    pp: 30, 
    category: boost,
    priority: 0,
    effect: [20, 100]},

  infestation:{
    name: "Infestation",
    type: bug,
    power: 20,
    accuracy: 100, 
    pp: 20, 
    category: physical,
    priority: 0,
    effect: [23, 100]},
  
  sucker_punch: {
    name: "Sucker Punch",
    type: dark,
    power: 70,
    accuracy: 100,
    pp: 5,
    category: physical,
    priority: 2,
    effect: [-1,0]},

  aqua_jet: {
    name: "Aqua Jet",
    type: water,
    power: 60,
    accuracy: 100,
    pp: 5,
    category: physical,
    priority: 2,
    effect: [-1,0]},
  
  play_rough:{
    name: "Play Rough",
    type: fairy,
    power: 90,
    accuracy: 100,
    pp: 15,
    category: physical,
    priority: 0,
    effect: [11,100]},

  leaf_blade:{
    name: "Leaf Blade",
    type: grass,
    power: 90,
    accuracy: 100,
    pp: 15,
    category: physical,
    priority: 0,
    effect: [11,100]},

  x_scissor:{
    name: "X-Scissor",
    type: bug,
    power: 90,
    accuracy: 100,
    pp: 15,
    category: physical,
    priority: 0,
    effect: [11,100]}

};
let movesArray = Object.entries(movesList);
let moveMap = new Map();


//let damage = 0;
let pokemon;
let pokemonList;
function preload(){
  //Generates all Pokemon data, including sprites
  pokemon = {
    dragonite: {
      name: "Dragonite",
      sprites: [loadImage("sprites/dragonite_front.png"), loadImage("sprites/dragonite_back.png")],
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
      sprites: [loadImage("sprites/garchomp_front.png"), loadImage("sprites/garchomp_back.png")],
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
      sprites: [loadImage("sprites/charizard_front.png"), loadImage("sprites/charizard_back.png")],
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
      sprites: [loadImage("sprites/blastoise_front.png"), loadImage("sprites/blastoise_back.png")],
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
      moves: [movesList.scald,
        movesList.dragon_pulse,
        movesList.ice_beam,
        movesList.aura_sphere]
    },

    venusaur: {
      name: "Venusaur",
      sprites: [loadImage("sprites/venusaur_front.png"), loadImage("sprites/venusaur_back.png")],
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
        movesList.leech_seed]
    },

    articuno: {
      name: "Articuno",
      sprites: [loadImage("sprites/articuno_front.png"), loadImage("sprites/articuno_back.png")],
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
      sprites: [loadImage("sprites/tyranitar_front.png"), loadImage("sprites/tyranitar_back.png")],
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
        movesList.payback, 
        movesList.avalanche, 
        movesList.earthquake]
    },

    aggron: {
      name: "Aggron",
      sprites: [loadImage("sprites/aggron_front.png"), loadImage("sprites/aggron_back.png")],
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
      sprites: [loadImage("sprites/heracross_front.png"), loadImage("sprites/heracross_back.png")],
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
      statModifiers: {
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
    },

    gengar: {
      name: "Gengar",
      sprites: [loadImage("sprites/gengar_front.png"), loadImage("sprites/gengar_back.png")],
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
      baseHP: 261,
      hp: 261,
      attack: 151,
      defense: 157,
      sp_atk: 359,
      sp_def: 186,
      speed: 350,
      statModifiers: {
        attack: 0,
        defense: 0,
        sp_atk: 0,
        sp_def: 0,
        speed: 0
      },
      type1: ghost,
      type2: poison,
      moves: [movesList.shadow_ball, 
        movesList.sludge_bomb, 
        movesList.focus_blast, 
        movesList.dazzling_gleam]
    },

    zapdos: {
      name: "Zapdos",
      sprites: [loadImage("sprites/zapdos_front.png"), loadImage("sprites/zapdos_back.png")],
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
      baseHP: 353,
      hp: 353,
      attack: 196,
      defense: 206,
      sp_atk: 349,
      sp_def: 216,
      speed: 295,
      statModifiers: {
        attack: 0,
        defense: 0,
        sp_atk: 0,
        sp_def: 0,
        speed: 0
      },
      type1: electric,
      type2: flying,
      moves: [movesList.hurricane, 
        movesList.thunder, 
        movesList.roost, 
        movesList.thunder_wave]
    
    },

    moltres: {
      name: "Moltres",
      sprites: [loadImage("sprites/moltres_front.png"), loadImage("sprites/moltres_back.png")],
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
      baseHP: 353,
      hp: 353,
      attack: 184,
      defense: 216,
      sp_atk: 383,
      sp_def: 206,
      speed: 249,
      statModifiers: {
        attack: 0,
        defense: 0,
        sp_atk: 0,
        sp_def: 0,
        speed: 0
      },
      type1: fire,
      type2: flying,
      moves: [movesList.hurricane, 
        movesList.fire_blast, 
        movesList.roost, 
        movesList.mystical_fire]
    },

    mewtwo: {
      name: "Mewtwo",
      sprites: [loadImage("sprites/mewtwo_front.png"), loadImage("sprites/mewtwo_back.png")],
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
      baseHP: 378,
      hp: 378,
      attack: 232,
      defense: 216,
      sp_atk: 447,
      sp_def: 216,
      speed: 335,
      statModifiers: {
        attack: 0,
        defense: 0,
        sp_atk: 0,
        sp_def: 0,
        speed: 0
      },
      type1: psychic,
      type2: none,
      moves: [movesList.psystrike, 
        movesList.recover, 
        movesList.ice_beam, 
        movesList.calm_mind]
    },
     
    snorlax: {
      name: "Snorlax",
      sprites: [loadImage("sprites/snorlax_front.png"), loadImage("sprites/snorlax_back.png")],
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
      baseHP: 524,
      hp: 524,
      attack: 350,
      defense: 166,
      sp_atk: 149,
      sp_def: 257,
      speed: 96,
      statModifiers: {
        attack: 0,
        defense: 0,
        sp_atk: 0,
        sp_def: 0,
        speed: 0
      },
      type1: normal,
      type2: none,
      moves: [movesList.body_slam, 
        movesList.crunch, 
        movesList.rest, 
        movesList.sleep_talk]
    },
    
    blissey: {
      name: "Blissey",
      sprites: [loadImage("sprites/blissey_front.png"), loadImage("sprites/blissey_back.png")],
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
      baseHP: 651,
      hp: 651,
      attack: 22,
      defense: 130,
      sp_atk: 187,
      sp_def: 369,
      speed: 115,
      statModifiers: {
        attack: 0,
        defense: 0,
        sp_atk: 0,
        sp_def: 0,
        speed: 0
      },
      type1: normal,
      type2: none,
      moves: [movesList.softboiled, 
        movesList.toxic, 
        movesList.hyper_voice, 
        movesList.shadow_ball]
    },
    
    shuckle: {
      name: "Shuckle",
      sprites: [loadImage("sprites/shuckle_front.png"), loadImage("sprites/shuckle_back.png")],
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
      baseHP: 243,
      hp: 243,
      attack: 58,
      defense: 496,
      sp_atk: 22,
      sp_def: 614,
      speed: 46,
      statModifiers: {
        attack: 0,
        defense: 0,
        sp_atk: 0,
        sp_def: 0,
        speed: 0
      },
      type1: bug,
      type2: rock,
      moves: [movesList.infestation, 
        movesList.toxic, 
        movesList.rest, 
        movesList.curse]
    },
    
    gardevoir: {
      name: "Gardevoir",
      sprites: [loadImage("sprites/gardevoir_front.png"), loadImage("sprites/gardevoir_back.png")],
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
      baseHP: 277,
      hp: 277,
      attack: 121,
      defense: 166,
      sp_atk: 349,
      sp_def: 267,
      speed: 284,
      statModifiers: {
        attack: 0,
        defense: 0,
        sp_atk: 0,
        sp_def: 0,
        speed: 0
      },
      type1: psychic,
      type2: fairy,
      moves: [movesList.psychiC, 
        movesList.moonblast, 
        movesList.shadow_ball, 
        movesList.thunderbolt]
    },
    
    snom: {
      name: "Snom",
      sprites: [loadImage("sprites/snom_front.png"), loadImage("sprites/snom_back.png")],
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
      baseHP: 263,
      hp: 263,
      attack: 57,
      defense: 159,
      sp_atk: 243,
      sp_def: 149,
      speed: 68,
      statModifiers: {
        attack: 0,
        defense: 0,
        sp_atk: 0,
        sp_def: 0,
        speed: 0
      },
      type1: bug,
      type2: ice,
      moves: [movesList.psychiC, 
        movesList.ice_beam, 
        movesList.dazzling_gleam, 
        movesList.bug_buzz]
    },
  
    jolteon: {
      name: "Jolteon",
      sprites: [loadImage("sprites/jolteon_front.png"), loadImage("sprites/jolteon_back.png")],
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
      baseHP: 271,
      hp: 271,
      attack: 121,
      defense: 156,
      sp_atk: 319,
      sp_def: 227,
      speed: 394,
      statModifiers: {
        attack: 0,
        defense: 0,
        sp_atk: 0,
        sp_def: 0,
        speed: 0
      },
      type1: electric,
      type2: none,
      moves: [movesList.thunderbolt, 
        movesList.thunder_wave, 
        movesList.signal_beam, 
        movesList.shadow_ball]
    },

    absol: {
      name: "Absol",
      sprites: [loadImage("sprites/absol_front.png"), loadImage("sprites/absol_back.png")],
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
      baseHP: 271,
      hp: 271,
      attack: 394,
      defense: 156,
      sp_atk: 167,
      sp_def: 157,
      speed: 249,
      statModifiers: {
        attack: 0,
        defense: 0,
        sp_atk: 0,
        sp_def: 0,
        speed: 0,
      },
      type1: dark,
      type2: fairy,
      moves: [movesList.sucker_punch, 
        movesList.swords_dance, 
        movesList.play_rough, 
        movesList.close_combat]
    },

    golisopod: {
      name: "Golisopod",
      sprites: [loadImage("sprites/golisopod_front.png"), loadImage("sprites/golisopod_back.png")],
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
      baseHP: 354,
      hp: 354,
      attack: 383,
      defense: 316,
      sp_atk: 140,
      sp_def: 216,
      speed: 117,
      statModifiers: {
        attack: 0,
        defense: 0,
        sp_atk: 0,
        sp_def: 0,
        speed: 0
      },
      type1: bug,
      type2: water,
      moves: [movesList.aqua_jet, 
        movesList.skitter_smack, 
        movesList.razor_shell, 
        movesList.swords_dance]
    },

    ferrothorn: {
      name: "Ferrothorn",
      sprites: [loadImage("sprites/ferrothorn_front.png"), loadImage("sprites/ferrothorn_back.png")],
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
      baseHP: 289,
      hp: 289,
      attack: 224,
      defense: 361,
      sp_atk: 144,
      sp_def: 364,
      speed: 40,
      statModifiers: {
        attack: 0,
        defense: 0,
        sp_atk: 0,
        sp_def: 0,
        speed: 0
      },
      type1: grass,
      type2: steel,
      moves: [movesList.power_whip, 
        movesList.gyro_ball, 
        movesList.leech_seed, 
        movesList.curse]
    },

    hydreigon: {
      name: "Hydreigon",
      sprites: [loadImage("sprites/hydreigon_front.png"), loadImage("sprites/hydreigon_back.png")],
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
      baseHP: 325,
      hp: 325,
      attack: 193,
      defense: 216,
      sp_atk: 349,
      sp_def: 216,
      speed: 324,
      statModifiers: {
        attack: 0,
        defense: 0,
        sp_atk: 0,
        sp_def: 0,
        speed: 0
      },
      type1: dark,
      type2: dragon,
      moves: [movesList.draco_meteor, 
        movesList.dark_pulse, 
        movesList.flash_cannon, 
        movesList.roost]
    }

  };
  //Allows searching through defined Pokemon
  pokemonList = [pokemon.dragonite, pokemon.garchomp, pokemon.charizard, pokemon.blastoise, pokemon.venusaur, pokemon.articuno, pokemon.zapdos, pokemon.tyranitar, pokemon.aggron, pokemon.heracross, pokemon.gengar, pokemon.moltres, pokemon.mewtwo, pokemon.snorlax, pokemon.blissey, pokemon.shuckle, pokemon.gardevoir, pokemon.snom, pokemon.jolteon, pokemon.absol, pokemon.golisopod, pokemon.ferrothorn, pokemon.hydreigon];
  
  //Selects a random Background
  backgroundMap = random([loadImage("backgrounds/back_0.png"), loadImage("backgrounds/back_1.png"), loadImage("backgrounds/back_2.png"), loadImage("backgrounds/back_3.png"), loadImage("backgrounds/back_4.png"), loadImage("backgrounds/back_5.png"), loadImage("backgrounds/back_6.png"), loadImage("backgrounds/back_7.png"), loadImage("backgrounds/back_8.png"), loadImage("backgrounds/back_9.png")]);
  music = createAudio("assets/music.mp3");
  moveMap.set(normal, loadImage("move_animations/Normal.png"));
  moveMap.set(bug, loadImage("move_animations/Bug.png"));
  moveMap.set(grass, loadImage("move_animations/Grass.png"));
  moveMap.set(water, loadImage("move_animations/Water.png"));
  moveMap.set(fire, loadImage("move_animations/Fire.gif"));
  moveMap.set(ice, loadImage("move_animations/Ice.gif"));
  moveMap.set(dragon, loadImage("move_animations/Dragon.png"));
  moveMap.set(steel, loadImage("move_animations/Steel.png"));
  moveMap.set(fairy, loadImage("move_animations/Fairy.png"));
  moveMap.set(fighting, loadImage("move_animations/Fighting.png"));
  moveMap.set(dark, loadImage("move_animations/Dark.png"));
  moveMap.set(ghost, loadImage("move_animations/Ghost.png"));
  moveMap.set(psychic, loadImage("move_animations/Psychic.png"));
  moveMap.set(poison, loadImage("move_animations/Poison.gif"));
  moveMap.set(ground, loadImage("move_animations/Ground.png"));
  moveMap.set(rock, loadImage("move_animations/Rock.png"));
  moveMap.set(flying, loadImage("move_animations/Flying.png"));
  moveMap.set(electric, loadImage("move_animations/Electric.gif"));
  moveMap.set(none, loadImage("move_animations/---.png"));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width > height){
    spriteScale = height/6;
  }
  else{
    spriteScale = width/6;
  }
  opponentName = random(trainerClasses) +" "+random(names);
  playerParty = new Party();
  playerParty.initalize();
  cpuParty = new Party();
  cpuParty.initalize();
  activePlayer = playerParty.slot_1;
  activeCPU = cpuParty.slot_1;
  frameRate(15);
  cpuX = width/1.8 + spriteScale*1.5;
  cpuY = height/1.7 - spriteScale;
  playerX = width/2.2 - spriteScale*1.5;
  playerY = height/2 + spriteScale*1.3;
  data = [opponentName + " wants to battle! " + opponentName + " sent out "+activeCPU.name+"!"];
  noSmooth();
}

function draw() {
  music.play();
  //background(130, 255, 100);
  image(backgroundMap, width/2, height/2, width, height);
  battleInterface();
  if (gameEnded === false){
    switchOutCheck();
  }
}


function damageCalculator(attacker, defender, move, isBattle){
  let attackerModdedSpeed = statFormula(attacker.speed, attacker.statModifiers.speed);
  let defenderModdedSpeed = statFormula(defender.speed, defender.statModifiers.speed);
  let moddedSp_Atk = statFormula(attacker.sp_atk, attacker.statModifiers.sp_atk);
  let moddedSp_Def = statFormula(defender.sp_def, defender.statModifiers.sp_def);
  let moddedAttack = statFormula(attacker.attack, attacker.statModifiers.attack);
  let moddedDefense = statFormula(defender.defense, defender.statModifiers.defense);

  //Checks if a status based stat modifier should be applied.
  if (attacker.status === "Paralyzed"){
    attackerModdedSpeed *= 0.5;
  }
  if (defender.status === "Paralyzed"){
    defenderModdedSpeed *= 0.5;
  }
  if (attacker.status === "Burned"){
    moddedAttack *= 0.5;
  }
  let criticalHitChance = 1;
  let damage;
  if (isBattle === false){
    if (move.category === healing || move.category === boost || move.category === status){
      return 0;
    }
  }
  //Runs the appropriate damage algorythm to the three move damage classes.
  if (move.category === physical){
    damage = Math.floor(
      Math.floor(42 * moddedAttack * move.power / moddedDefense) / 50);
  }
  else if (move.category === special){
    damage = Math.floor(
      Math.floor(42 * moddedSp_Atk * move.power / moddedSp_Def) / 50);
  }
  else if (move.category === shock){
    damage = Math.floor(
      Math.floor(42 * moddedSp_Atk * move.power / moddedDefense) / 50);
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
      if (random([true, false, false]) === true){
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
    if (attacker.confused === true){
      attacker.confusedTimer --;
      if (attacker.confusedTimer > 0){
        if (random([true, false])=== true){
          return "confused";
        }
      }
      
    }
    if (!(move.effect[0] === 9 || move.effect[0] === 10)){
      //Runs the number through a percent generator to determine whether it will happen or not.
      if(move.effect[1]>=random(100)){

        if (move.effect[0] === 1){
          //1 Confuses defender
          defender.confused = true;
          defender.confusedTimer = random(2,5);
          newConfused = 1;
        }
        else if (move.effect[0] === 2){
          //2 Heals 1/2 Max Health
          return "healed";
        }
        else if (move.effect[0] === 3){
          //3 Flinches defender
          defender.flinch = true;
        }
        
        else if (move.effect[0] === 4){
          //4 Increases Attack
          attacker.statModifiers.attack += move.effect[2];
          return "boost";
        }
        else if (move.effect[0] === 5 && defender.status === 0 && (defender.type1 !== fire && defender.type2 !== fire)){
          //5 Burns defender
          newStatus = true;
          defender.status = "Burned";
        }
        else if (move.effect[0] === 6){
          //6 Lowers Sp. Def of defender
          defender.statModifiers.sp_def - move.effect[2];
        }
        else if (move.effect[0] === 7 && defender.status === 0 && defender.type1 !== ice && defender.type2 !== ice){
          //7 Freezes defender
          newStatus = true;
          defender.status = "Frozen";
        }
        else if (move.effect[0] === 8 && defender.status === 0 && !(defender.type1 === poison || defender.type2 === steel) && !(defender.type2 === poison || defender.type1 === steel)){
          //8 Poisons defender
          newStatus = true;
          defender.status = "Poisoned";
          
        }
        else if (move.effect[0] === 11){
          //Higher Critical Hit ratio
          criticalHitChance ++;
        }
        else if (move.effect[0] === 12){
          //- Defense
          defender.statModifiers.defense - move.effect[2];
        }
        else if (move.effect[0] === 13){
          //Doubles Damage if user is slower
          if (attackerModdedSpeed < defenderModdedSpeed){
            damage *= 2;
          }
        }    
        else if (move.effect[0] === 14){
          //rest
          if (attacker.status !== "Sleeping"){
            attacker.statusTimer = 2;
            attacker.status = "Sleeping";
            attacker.hp = attacker.baseHP;
          }
          return "rest";
        }
        else if (move.effect[0] === 15){
          //Sleep Talk
          return "sleep talk";
        }
        else if (move.effect[0] === 16){
          //Close Combat Stat Drops
          attacker.statModifiers.defense --;
          attacker.statModifiers.sp_def --;
        }
        else if (move.effect[0] === 17){
          //+Atk, Def, -Speed
          attacker.statModifiers.attack ++;
          attacker.statModifiers.defense ++;
          attacker.statModifiers.speed --;
          return "boost";
        }
        else if (move.effect[0] === 18 &&(defender.type1 !== electric && defender.type2 !== electric)){
          //The Target becomes paralyzed
          newStatus = true;
          defender.status = "Paralyzed";
          return "boost";
        } 
        else if (move.effect[0] === 19){
          //Lowers the Special Attack stat
          defender.statModifiers.sp_atk -= move.effect[2];
        }   
        else if (move.effect[0] === 20){
          //Increases Sp. Atk, Sp. Def
          attacker.statModifiers.sp_def ++;
          attacker.statModifiers.sp_atk ++;
          return "boost";
        }
        else if (move.effect[0] === 21){
          //Inflicts Leech Seed draining
          defender.leechSeed = true;
          return "boost";
        }
        else if (move.effect[0] === 22 && defender.status === 0){
          //Inflicts bad poison
          newStatus = true;
          defender.status = "Toxic";
          defender.statusTimer = 0;
          return "boost";
        }
        else if (move.effect[0] === 23){
          //Trapped status
          if (defender.bound === false){
            defender.boundTimer = Math.round(random(2, 5));
            newBound = true;
          }
          defender.bound = true;
          defender.boundBy = move.name;
          
        }
      }
    } 
    if (criticalHitChance>random(16)){
      //Normally 1/16, but certain moves increase the chance (IE Stone Edge)
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
      
function typeEffectivenessChecker(pokemon_type, moveType){
  if (pokemon_type === normal){
    if (moveType === fighting){
      return 2;
    }
    else if (moveType === ghost){
      return 0;
    }
    return 1;
  }

  else if (pokemon_type === bug){

    if (moveType === fire || moveType === rock || moveType === flying){
      return 2;
    }
    else if (moveType === fighting || moveType === grass || moveType === ground){
      return 0.5;
    }
    return 1;
  }

  else if (pokemon_type === electric){
    if (moveType === ground){
      return 2;
    }
    else if (moveType === flying || moveType === steel || moveType === electric){
      return 0.5;
    }
    return 1;
  }

  else if (pokemon_type === flying){
    if (moveType === ice || moveType === rock || moveType === electric){
      return 2;
    }
    else if (moveType === bug || moveType === grass || moveType === fighting){
      return 0.5;
    }
    else if (moveType === ground){
      return 0;
    }
    else{
      return 1;
    }
  }
  
  else if (pokemon_type === dragon){
    if (moveType === fairy || moveType === dragon || moveType === ice){
      return 2;
    }
    else if (moveType === grass || moveType === fire || moveType ===  water || moveType === electric){
      return 0.5;
    }
    else{
      return 1;
    }
  }

  else if (pokemon_type === ice){
    if (moveType === rock || moveType === steel || moveType === fire || moveType === fighting){
      return 2;
    }
    else if (moveType === ice){
      return 0.5;
    }
    else{
      return 1;
    }
  }
  
  else if (pokemon_type === fairy){
    if (moveType === poison || moveType === steel){
      return 2;
    }
    else if (moveType === fighting || moveType === bug || moveType === dark){
      return 0.5;
    }
    else if (moveType === dragon){
      return 0;
    }
    return 1;
  }

  else if (pokemon_type === water){
    if (moveType === electric || moveType === grass){
      return 2;
    }
    else if (moveType === fire|| moveType === ice || moveType === water || moveType === steel){
      return 0.5;
    }
    return 1;
  }

  else if (pokemon_type === fire){
    if (moveType === water || moveType === rock || moveType === ground){
      return  2;
    }
    else if (moveType === ice || moveType === steel || moveType === bug || moveType === grass || moveType === fire){
      return 0.5;
    }
    return 1;
  }

  else if (pokemon_type === steel){
    if (moveType === fighting || moveType === fire || moveType === ground){
      return 2;
    }
    else if (moveType === normal || moveType === rock || moveType === fairy || moveType === dragon || moveType === flying || moveType === bug || moveType === steel || moveType === psychic || moveType === grass || moveType === ice){
      return 0.5;
    }

    else if (moveType === poison){
      return 0;
    }
    return 1;
  }

  else if (pokemon_type === psychic){
    if (moveType === dark || moveType === ghost || moveType === bug){
      return 2;
    }
    else if (moveType === fighting || moveType === psychic){
      return 0.5;
    }
    return 1;
  }

  else if (pokemon_type === dark){
    if (moveType === fairy || moveType === fighting || moveType === bug){
      return 2;
    }
    else if (moveType === dark || moveType === ghost){
      return 0.5;
    }
    else if (moveType === psychic){
      return 0;
    }
    return 1;
  }

  else if (pokemon_type === fighting){
    if (moveType === psychic || moveType === flying || moveType === fairy){
      return 2;
    }
    if (moveType === bug || moveType === dark || moveType === rock){
      return 0.5;
    }
    return 1;
  }

  else if (pokemon_type === ghost){
    if (moveType === ghost || moveType === dark){
      return 2;
    }
    else if (moveType === bug){
      return 0.5;
    }
    else if (moveType === normal || moveType === fighting){
      return 0;
    }
    return 1;
  }

  else if (pokemon_type === poison){
    if (moveType === ground || moveType === psychic){
      return 2;
    }
    else if (moveType === grass || moveType === bug || moveType === fighting || moveType === fairy || moveType === poison){
      return 0.5;
    }
    return 1;
  }

  else if (pokemon_type === grass){
    if (moveType === fire || moveType === ice || moveType === bug || moveType === poison || moveType === flying){
      return 2;
    }

    else if (moveType === ground || moveType === grass || moveType === electric){
      return 0.5;
    }
    return 1;
  }

  else if (pokemon_type === ground){
    if (moveType === water || moveType === grass || moveType === ice){
      return 2;
    }
    
    else if (moveType === rock || moveType === poison){
      return 0.5;
    }

    else if (moveType === electric){
      return 0;
    }
    return 1;
  }

  else if (pokemon_type === rock){
    if (moveType === steel || moveType === ground || moveType === grass || moveType === water || moveType === fighting){
      return 2;
    }
    else if (moveType === normal || moveType === flying || moveType === fire){
      return 0.5;
    }
    return 1;
  }
  else if (pokemon_type === none){
    return 1;
  }
  data.push("Error: TYPE data unknown");
  data.push("The Defender type is "+ pokemon_type);
  data.push("The Attack Type is " + moveType);

}
function effectDescriptions(effectData){
  if (effectData[0] === -2){
    return "A Special Attack that deals Physical damage \n(User's Sp. Atk, Target's Defense)";
  }
  if (effectData[0] === -1){
    return "Attacks before most other moves,\nregardless of the User's Speed stat.";
  }
  if (effectData[0] === 0){
    return "Deals damage to the target, no special effects.\nUsually either a strong or reliable move.";
  }
  if (effectData[0] === 1){
    return "Has a "+effectData[1]+"% chance to inflict confusion on the target.";
  }
  if (effectData[0] === 2){
    return "Heals the user by up to 50% of its maximum HP.";
  }
  if (effectData[0] === 3){
    return "Has a "+effectData[1]+"% chance to flinch the target and prevent attacking.";
  }
  
  if (effectData[0] === 4){
    return "Increases the user's attack by "+effectData[2]+" stages.";
  }
  if (effectData[0] === 5){
    return "Has a "+effectData[1]+"% chance to inflict a burn,\nhalving the Attack stat of the target \nand inflicting passive damage.";
  }
  if (effectData[0] === 6){
    return "Has a "+effectData[1]+"% chance to lower the Target's Special Defense by "+effectData[2]+" stages, \nincreasing damage dealt by future \nSpecial attacks.";
  }
  if (effectData[0] === 7){
    return "Has a "+effectData[1]+"% chance to freeze the target,\nincapacitating it until it thaws out.";
  }
  if (effectData[0] === 8){
    return "Has a "+effectData[1]+"% chance to inflict poison on the target, \nwittling away 1/8 max HP per turn.";
  }
  if (effectData[9] === 9){
    return "Deals double the damage against a target with a status condition.";
  }
  if (effectData[0] ===10){
    return "Is Super Effective against Water Type Pokemon,\ndespite being Ice-Type.";
  }
  if (effectData[0] === 11){
    return "Has a higher Critical Hit Ratio.";
  }
  if (effectData[0] === 12){
    return "Has a "+effectData[1]+"% chance to lower the target's Defense by"+effectData[2]+" stages, \nincreasing damage dealt by future Physical attacks.";
  }
  if (effectData[0] === 13){
    return "If the User is slower than the target,\nthis deals double damage.";
  }    
  if (effectData[0] === 14){
    return "The user falls asleep for 2 turns,\nhealing all status and damage.";
  }
  if (effectData[0] === 15){
    return "Selects a random attack to use,\nbut only works when the User is sleeping.";
  }
  if (effectData[0] === 16){
    return "Hits hard, but lowers both the user's Defense and Special Defense in the process";
  }
  if (effectData[0] === 17){
    return "Sacrifices Speed to become stronger physically.";
  }
  if (effectData[0] === 18){
    return "Has a "+effectData[1]+"% chance to paralyze the target, \nhalving its Speed and occasionally being unable to move.";
  } 
  if (effectData[0] === 19){
    return "Has a "+effectData[1]+"% chance to lower the target's Special Attack, \nlowering the damage done by their Special attacks.";
  }   
  if (effectData[0] === 20){
    return "Raises the user's Special Attack and Special Defense.";
  }
  if (effectData[0] === 21){
    return "Plants seeds which slowly drain HP from target.";
  }
  if (effectData[0] === 22){
    return "Inflicts a terrible poison that will worsen over time.";
  }
  if (effectData[0] === 23){
    return "Binds and traps the opponent, dealing 1/8 of their\nmaximum HP for 2-5 turns.";
  }
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

function findBestOffensivePokemon(attackerParty, defender){
  let highestDamageOutput = [0,-666];
  for (let i = 0; i<6; i++){
    let damage = damageCalculator(attackerParty.base_list[i], defender, attackerParty.base_list[i].moves[findBestDamage(attackerParty.base_list[i], defender)], false);
    if (damage > highestDamageOutput[0] && attackerParty.base_list[i].status !== "Fainted"){
      highestDamageOutput[0] = damage;
      highestDamageOutput[1] = i;
    }
  }
  // if (highestDamageOutput[1] === -666){
  //   return "Playet wins";
  // }
  return highestDamageOutput[1];
}

function turnInProgress(player, cpu, playerAttack, cpuAttack){
  let turnDataLogs = [];
  let playerModdedSpeed = player.speed;
  let cpuModdedSpeed = cpu.speed;
  let firstStrikeCPU;
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
  if (playerAttack.priority !== cpuAttack.priority){
    if (playerAttack.priority > cpuAttack.priority){
      firstStrikeCPU = false;
    }
    else{
      firstStrikeCPU = true;
    }
  }
  else if(playerModdedSpeed > cpuModdedSpeed){
    firstStrikeCPU = false;
  }
  else if(playerModdedSpeed === cpuModdedSpeed){
    //If neither is faster, a random winner for speed is selected
    firstStrikeCPU = random([true, false]);
  }
  else{
    firstStrikeCPU = true;
  }

  if (firstStrikeCPU === true){
    //CPU Moves first
    let cpuOutput = damageCalculator(cpu, player, cpuAttack, true);
    //cpu attack
    turnDataLogs.push(midTurnDataConfigure(cpuOutput, cpu, player, cpuAttack));

    if (player.hp>0){
      let playerOutput = damageCalculator(player, cpu, playerAttack, true);
      //player attack
      turnDataLogs.push(midTurnDataConfigure(playerOutput, player, cpu, playerAttack));
    }
  }
  else{
    let playerOutput = damageCalculator(player, cpu, playerAttack, true);
    //player attack
    turnDataLogs.push(midTurnDataConfigure(playerOutput, player, cpu, playerAttack));

    if (cpu.hp>0){
      let cpuOutput = damageCalculator(cpu, player, cpuAttack, true);
      //cpu attack
      turnDataLogs.push(midTurnDataConfigure(cpuOutput, cpu, player, cpuAttack));
    }
  }
  turnDataLogs.push(postTurnDataConfigure(player, cpu));
  turnDataLogs.push(postTurnDataConfigure(cpu, player));
  if (cpu.status === "Fainted"){
    turnDataLogs.push("Come back, "+activeCPU.name+"!");
    // findBestOffensivePkemono(cpuParty, player)
  }

  if (player.status === "Fainted"){
    turnDataLogs.push("Select your next Pokemon (press the number of the slot)");
  }

  return turnDataLogs;
}

function midTurnDataConfigure(attackResult, attacker, defender, move){
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
      turnDataLogs.push(attacker.name + " used Sleep Talk!");
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
    let isDead = faintChecker(attacker);
    if (typeof isDead === "string"){
      turnDataLogs.push(isDead);
    }
  }

  if (attackResult === "paralyzed"){
    turnDataLogs.push(attacker.name+" is fully paralyzed!");
    
    attacking = false;
  }

  if (attackResult === "Flinched"){
    turnDataLogs.push(attacker.name+" flinched!");
    attacking = false;
  }

  if (attackResult === "boost"){
    turnDataLogs.push([attacker.name+ " used ",attackToUse.name , "!"]);
    if (attackToUse.name ==="Swords Dance"){
      turnDataLogs.push(attacker.name+ "'s Attack Sharply increased!")  ;
      attacking = false;   
    }
    if (attackToUse.name === "Curse"){
      turnDataLogs.push(attacker.name+ "'s Attack increased!");
      turnDataLogs.push(attacker.name+ "'s Defense increased!");
      turnDataLogs.push(attacker.name+ "'s Speed fell!");
      attacking = false;
    }
    if (attackToUse.name === "Calm Mind"){
      turnDataLogs.push(attacker.name+ "'s Special Attack increased!");
      turnDataLogs.push(attacker.name+ "'s Special Defense increased!");
      attacking = false;
    }
    if (attackToUse.name === "Thunder Wave"){
      attacking === false;
    }
    if (attackToUse.name === "Leech Seed"){
      turnDataLogs.push(defender.name +" was seeded!");
      attacking === false;
    }

    if (attackToUse.name === "Toxic"){
      attacking = false;
    }
  }

  if (typeof attackResult !== "number" && attackResult !== "missed"){ 
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
  if (newBound === true){
    turnDataLogs.push(defender.name+" became trapped by "+attackToUse.name+"!");
  }
  if (newStatus === true && defender.hp > 0){
    if (defender.status !== "Toxic"){
      turnDataLogs.push(defender.name+" was "+defender.status+"!");
      if (defender.status === "Paralyzed"){
        turnDataLogs.push("It may be unable to move!");
      }
    }
    else{
      turnDataLogs.push(defender.name+" was badly poisoned!");
    }
    newStatus = false;
  }
  if (newConfused === true && defender.hp !== 0){
    turnDataLogs.push(defender.name+" became Confused!");
  }
  let isDead = faintChecker(defender);
  if (typeof isDead === "string"){
    turnDataLogs.push();
  }
  attacker.statModifiers.speed = statModifierCheck(attacker.statModifiers.speed);
  attacker.statModifiers.defense = statModifierCheck(attacker.statModifiers.defense);
  attacker.statModifiers.attack = statModifierCheck(attacker.statModifiers.attack);
  attacker.statModifiers.sp_atk = statModifierCheck(attacker.statModifiers.sp_atk);
  attacker.statModifiers.sp_def = statModifierCheck(attacker.statModifiers.sp_def);
  defender.statModifiers.speed = statModifierCheck(defender.statModifiers.speed);
  defender.statModifiers.defense = statModifierCheck(defender.statModifiers.defense);
  defender.statModifiers.attack = statModifierCheck(defender.statModifiers.attack);
  defender.statModifiers.sp_atk = statModifierCheck(defender.statModifiers.sp_atk);
  defender.statModifiers.sp_def = statModifierCheck(defender.statModifiers.sp_def);
 

  return turnDataLogs;
}



function postTurnDataConfigure(pokemon, pokemon2){
  let postTurnResults = [];
  pokemon.statusTimer --;
  pokemon.boundTimer --;
  if (pokemon.status === "Poisoned"){
    pokemon.hp -= Math.floor(pokemon.baseHP/8);
    postTurnResults.push(pokemon.name+" is poisoned! -"+Math.floor(pokemon.baseHP/8));
    let isDead = faintChecker(pokemon);
    if (typeof isDead === "string"){
      postTurnResults.push(isDead);
    }
  }
  if (pokemon.status === "Burned"){
    pokemon.hp -= Math.floor(pokemon.baseHP/16);
    postTurnResults.push(pokemon.name+" is burned! -"+Math.floor(pokemon.baseHP/16));
    let isDead = faintChecker(pokemon);
    if (typeof isDead === "string"){
      postTurnResults.push(isDead);
    }
  }
  if (pokemon.status === "Toxic"){
    pokemon.hp -= Math.floor(pokemon.baseHP/16*-pokemon.statusTimer);
    postTurnResults.push(pokemon.name+" is badly poisoned! -"+Math.floor(pokemon.baseHP/16*-pokemon.statusTimer));
    let isDead = faintChecker(pokemon);
    if (typeof isDead === "string"){
      postTurnResults.push(isDead);
    }
  }
  if (pokemon.bound === true){
    if (pokemon.boundTimer > 0){
      pokemon.hp -= Math.floor(pokemon.baseHP/8);
      postTurnResults.push(pokemon.name+" was hurt by "+pokemon.boundBy+"! -"+Math.floor(pokemon.baseHP/8));
      let isDead = faintChecker(pokemon);
      if (typeof isDead === "string"){
        postTurnResults.push(isDead);
      }
    }
    else{
      postTurnResults.push(pokemon.name+" was freed from "+pokemon.boundBy);
      pokemon.boundBy = "";
      pokemon.bound = false;
    }
  }
  if (pokemon.leechSeed === true){
    pokemon.hp -= Math.floor(pokemon.baseHP/8);
    pokemon2.hp += Math.floor(pokemon.baseHP/8);
    if (pokemon2.hp > pokemon2.baseHP){
      pokemon2.hp = pokemon2.baseHP;
    }
    postTurnResults.push(pokemon.name+"'s health was sapped by Leech Seed! "+pokemon.name+" -"+Math.floor(pokemon.baseHP/8)+", "+pokemon2.name+" +"+Math.floor(pokemon.baseHP/8));
    let isDead = faintChecker(pokemon);
    if (typeof isDead === "string"){
      postTurnResults.push(isDead);
    }
  }
  return postTurnResults;
}


function faintChecker(pokemon){
  if (pokemon.hp <= 0){
    pokemon.hp = 0;
    pokemon.status = "Fainted";
    return pokemon.name+ " fainted!";
  }
  else{
    return [];
  }
}


function aiMoveSelect(cpu, player, cpuSpeed, playerSpeed){
  //data guide| 0 = has-FILLER-Move? | 1 = FILLER-MoveNumber
  let priorityCheck = [false, 0];
  let healCheck = [false, 0];
  let boostCheck = [false, 0];
  let statusCheck = [false, 0];
  let hasKillMove = false;
  let bestKillMove = 0;
  let moveCanKill = [false, false, false, false];
  let hasSleepTalk = false;

  
  
  //Checks through moves, and learns what the options are
  //IF multiple of the same type of move(boost/heal) exist, it WOULD choose the move further in the list, but no reliable movesets would feature 2 boost moves or 2 healing moves so I'm not designing an evaluator for those conditions
  for (let i = 0; i < cpu.moves.length; i++){
    //Checks if curreny move has priority
    if (cpu.moves[i].priority>0){
      priorityCheck[0] = true;
      priorityCheck[1] = i;
    }

    //Checks if current move heals
    if (cpu.moves[i].category === healing){
      healCheck[0] = true;
      healCheck[1] = i;
    }

    //Checks if current
    if (cpu.moves[i].category === boost){
      boostCheck[0] = true;
      boostCheck[1] = i;
    }
    if (cpu.moves[i].category === status && cpu.moves[i].name !== "Sleep Talk"){
      statusCheck[0] = true;
      statusCheck[1] = i;
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

    if (cpu.moves[i].name === "Sleep Talk"){
      hasSleepTalk = true;
    }
  }
  if (cpu.status === "Sleeping" && hasSleepTalk === true){
    return movesList.sleep_talk;
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
      if (healCheck[0] === true && (cpuSpeed > playerSpeed || panicModeCounter >= 1 && panicModeCounter<5)){
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
  if (cpu.hp < 2*damageCalculator(player, cpu, player.moves[findBestDamage(player, cpu)], false) && playerSpeed > cpuSpeed && panicModeCounter < 5){
    if (healCheck[0] === true){
      panicModeCounter += 0.5;
      return cpu.moves[healCheck[1]];
    }
  }

  //Checks if using stats
  if (cpu.hp > cpu.baseHP*0.7 && (cpu.baseHP > 2*damageCalculator(player, cpu, player.moves[findBestDamage(player, cpu)], false)||playerSpeed > cpuSpeed||panicModeCounter > 5)){
    if(statusCheck[0] === true && statusUsed === false){
      statusUsed = true;
      return cpu.moves[statusCheck[1]];
    }
  }
  //If near full health, it will use a boosting move
  if (cpu.hp > cpu.baseHP*0.7 && (cpu.baseHP > 2*damageCalculator(player, cpu, player.moves[findBestDamage(player, cpu)], false)||playerSpeed > cpuSpeed)){
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
  for (let i = 0; i < 4; i++){
    let riskRecalc = damageCalculator(attacker, defender, attacker.moves[i], false);
    riskRecalc = (riskRecalc*2 + attacker.moves[i].accuracy)/3;
    resultList.push(riskRecalc);
    if (riskRecalc > resultList[bestOutcome] || resultList.length === 0){
      bestOutcome = i;
    }
  }
  return bestOutcome;
}

function statFormula(stat, modifier){
  let newStat = stat;
  if (modifier !== 0){
    if (modifier < 0){
      if (modifier === -1){
        newStat *= 2/3;
      }
      if (modifier === -2){
        newStat *= 1/2;
      }
      if (modifier === -3){
        newStat *= 2/5;
      }
      if (modifier === -4){
        newStat *= 1/3;
      }
      if (modifier === -5){
        newStat *= 2/7;
      }
      if (modifier === -6){
        newStat *= 1/4;
      }
    }
    else{ 
      newStat *= 1 + modifier * 0.5;
    }
  }
  return newStat;
}

function statModifierCheck(stat){
  //Stats should never go past 6 stages, positive or negative, and this will reset it down, if it does.
  let modifier = stat;
  if (stat >6){
    stat = 6;
  }
  if (stat <-6){
    stat = -6;
  }
  return stat;
}

function keyTyped(){
  
  if (key === " "){
    textReader();
  }

  //If these variables go over the limit, they will be reset to the opposite end of the sprectrum, allowing you to scroll with only 1 key effectively
  if (key === "-"){
    if (moveSelected > 0){
      moveSelected --;
    }
    else{
      moveSelected = 3;
    }

  }
  if (key === "="){
    if (moveSelected < 3){
      moveSelected ++;
    }
    else{
      moveSelected = 0;
    }
  }
}

function textReader(){
  let loopBreaker = 0;
  console.log("Text Reader Protocol initiated.");
  if (resetReader === true && readerBusy === false){
    data = turnInProgress(activePlayer, activeCPU, activePlayer.moves[moveSelected], aiMoveSelect(activeCPU, activePlayer, activeCPU.speed, activePlayer.speed));
    readerBusy = true;
    resetReader = false;
    readerProgress = 0;
    //Sets the text reader to the beginning of the data pile
  }
  //Prevent a prior underflow error
  if (readerProgress < 0){
    readerProgress = 0;
  }
  if (readerBusy === true && readerProgress<data.length){
    console.log("Text Sorter subfunction started");
    //Ignore non-useful data
    if (data[readerProgress] !== null){
      while (typeof data[readerProgress] === "object" && data[readerProgress].length === 0 && loopBreaker <= 4){
        readerProgress++;
        loopBreaker++;
        console.log("Bypassed Empty Move Data");
        if (readerProgress >= data.length){
          readerBusy = false;
          resetReader = true;
          readerProgress = 0;
          console.log("Reset Data: readerProgress surpassed data.length, prior to submission to reading");
        }
      }
      if (loopBreaker >4){
        console.log("Loop Break sequence");
      }
    }
    if (readerProgress<data.length){
    //Checks if the array is not empty
      if (typeof data[readerProgress] === "object" && data[readerProgress] !== null){
        console.log("Array Decompiling started");   
        textInterface = data[readerProgress][0];
        data[readerProgress].shift();
        console.log("Array Decompiling finished, Array derivitive data sumbitted");
        //reads the data then removes it from the list until the list is empty, then procedes to move onto the next list
      }
      //Instead it checks if is a string fragment instead, putting in the reader if it is
      else if (typeof data[readerProgress] === "string"){
        textInterface = data[readerProgress];
        readerProgress ++;
        console.log("Non-array data submitted");
      }
    }
    console.log("Text Reader subfunction finished");
  }
  if(readerProgress >= data.length){
    readerBusy = false;
    resetReader = true;
    readerProgress = 0;
    console.log("Reset Data: readerProgress surpassed data.length, after submission to reading");
  }
  console.log("Text Reader Protocol completed.");
}

function battleInterface(){
  imageMode(CENTER);
  
  if (activePlayer.status !== "Fainted"){
    image(activePlayer.sprites[1], playerX, playerY, spriteScale*4, spriteScale*4);
  }
  fill(255, 255, 255, 200);
  rect(0, height-50, width, 50);
  fill(0);
  textFont("Cambria");
  textSize(width/33);
  //Checks if the data is a move it needs to animate
  if (typeof textInterface === "object"){
    text(textInterface[0]+textInterface[1]+textInterface[2], 0, height-15);
    console.log(textInterface[1]);
    console.log(moveAnimator(textInterface[1]));
  }
  else{
    text(textInterface, 0, height-15);
  }
  playerParty.summary(0,20, activePlayer.status === "Fainted" && readerBusy === false, false);
  
  cpuParty.summary(width-200,20, false, true);
  
  if (activeCPU.status !== "Fainted"){
    image(activeCPU.sprites[0], cpuX, cpuY, spriteScale*2.5, spriteScale*2.5);
  }
}

function switchOutCheck(){
  //Checks if the Pokemon should be switched out
  if (activePlayer.status === "Fainted" && readerBusy === false){
    let switchOutResult = pokemonSwitch(playerParty, true, true);
    if (typeof switchOutResult !== "string" && switchOutResult !== null){
      console.log(switchOutResult);
      activePlayer = switchOutResult;
      textInterface = "Go! "+ activePlayer.name + "!";
      switchStarted = false;
    }
  }
  if (activeCPU.status === "Fainted"){
    if (readerBusy === false){
      activeCPU = pokemonSwitch(cpuParty, false, true);
      if (activeCPU !== undefined){
        textInterface = "Take him out, "+activeCPU.name+"!";
      }
      else{
        textInterface = opponentName+" was defeated!";
        gameEnded = true;
        return;
      }
      
    }
  }
  key = "";
  
}
function pokemonSwitch(party, isPlayer, fainted){
  console.log("Switch Initiated");
  if (key === "1"||key === "2"||key === "3"||key === "4"||key === "5"||key === "6"){
    key = int(key);
  }
  if (isPlayer === true && readerBusy === false){
    statusUsed === false;
    if (typeof key !== "number" && key !== " " && switchStarted === false){
      switchStarted === true;
    }
    else{
      if (key !== " "){
        switchStarted === true;
        let result = playerParty.base_list[key-1];
        if (result.status === "fainted"){
          return "This Pokemon is unable to battle!";
        }
        if (result === activePlayer){
          return "This Pokemon is already switching out!";
        }
        else{
          return result;
        }
      }
    }
    return "";
  }
  else if (readerBusy === false){
    return cpuParty.base_list[findBestOffensivePokemon(party, activePlayer)];
  }
}

function moveReader(moveName){
  for (let i = 0; i < movesArray.length; i ++){
    let moveData = Object.entries(movesArray[i][1]);
    if (moveData[0][1]===moveName){
      return moveData;
    }
  }
}
function moveAnimator(moveName){
  let moveData = moveReader(moveName);
  console.log(moveData[0][1]);
  image(moveMap.get(moveData[1][1]),(playerX+cpuX)/2, (playerY+cpuY)/2, moveData[2][1], moveData[2][1]);
}

class Party {
  constructor(){
    this.slot_1 = 0,
    this.slot_2 = 0,
    this.slot_3 = 0,
    this.slot_4 = 0,
    this.slot_5 = 0,
    this.slot_6 = 0,
    this.base_list = [0];
  }
  initalize(){
    let partyInitial = [];
    for (let i = 0; i<6; i++){
      let pokemonNumber = Math.floor(random(pokemonList.length));
      partyInitial.push(pokemonList[pokemonNumber]);
      pokemonList.splice(pokemonNumber, 1);
    }
    this.slot_1 = partyInitial[0];
    this.slot_2 = partyInitial[1];
    this.slot_3 = partyInitial[2];
    this.slot_4 = partyInitial[3];
    this.slot_5 = partyInitial[4];
    this.slot_6 = partyInitial[5];
    this.base_list = partyInitial;
  }
  summary(x, y, all, cpu){
    textSize(12);
    
    let temporaryPartyList;
    if (all === true){
      temporaryPartyList = [this.slot_1, this.slot_2, this.slot_3, this.slot_4, this.slot_5, this.slot_6];
    }
    else{
      if (cpu === true){
        temporaryPartyList = [activeCPU];
      }
      else{
        temporaryPartyList = [activePlayer]; 
      }
    }
    strokeWeight(4);
    stroke(100, 100, 100);
    fill(255);
    rect(x-4, y-20, 206, temporaryPartyList.length*80);
    strokeWeight(0.5);
    fill("black");
    let offset = y;
    //Scrolls through the party, displaying the information about the Pokemon, and a mini srpite in case they are uncertain to which pokemon is theirs
    for (let i = 0; i<temporaryPartyList.length; i++){
      textFont("Courier New");
      //image(temporaryPartyList[i].sprites[1], x-80, offset, 80, 80)
      textStyle(BOLD);
      text(temporaryPartyList[i].name+ "       Lvl. 100", x, offset-10);
      image(temporaryPartyList[i].sprites[0], x+90, offset-7, 24, 24);
      text("HP:  "+temporaryPartyList[i].hp+"/"+temporaryPartyList[i].baseHP, x+110, offset+5);
      text(temporaryPartyList[i].statModifiers.attack+" Attack:  "+temporaryPartyList[i].attack, x+90, offset+15);
      text(temporaryPartyList[i].statModifiers.defense+" Defense: "+temporaryPartyList[i].defense, x+90, offset+25);
      text(temporaryPartyList[i].statModifiers.sp_atk+" Sp. Atk: "+temporaryPartyList[i].sp_atk, x+90, offset+35);
      text(temporaryPartyList[i].statModifiers.sp_def+" Sp. Def: "+temporaryPartyList[i].sp_def, x+90, offset+45);
      text(temporaryPartyList[i].statModifiers.speed+" Speed:   "+temporaryPartyList[i].speed, x+90, offset+55);
      textStyle(ITALIC);
      text(temporaryPartyList[i].type1, x,offset+10);
      text(temporaryPartyList[i].type2, x+temporaryPartyList[i].type1.length*8,offset+10);
      textStyle(NORMAL);
      if (temporaryPartyList[i].status !== 0){
        text(temporaryPartyList[i].status, x, offset);
      }
      if (temporaryPartyList[i].status !== "Fainted"){
        text(temporaryPartyList[i].moves[0].name, x, offset+25);
        //text(temporaryPartyList[i].moves[0].pp, x+temporaryPartyList[i].moves[0].name.length*8, offset+25);
        text(temporaryPartyList[i].moves[1].name, x, offset+35);
        //text(temporaryPartyList[i].moves[1].pp, x+temporaryPartyList[i].moves[1].name.length*8, offset+35);
        text(temporaryPartyList[i].moves[2].name, x, offset+45);
        //text(temporaryPartyList[i].moves[2].pp, x+temporaryPartyList[i].moves[2].name.length*8, offset+45);
        text(temporaryPartyList[i].moves[3].name, x, offset+55);
      //text(temporaryPartyList[i].moves[3].pp, x+temporaryPartyList[i].moves[3].name.length*8, offset+55);
      }
      if (all === false && cpu === false && temporaryPartyList[i].status !== "Fainted"){
        textStyle(BOLD);
        text("|"+temporaryPartyList[i].moves[moveSelected].name+"|", 0, offset+70);
        textStyle(ITALIC);
        text(temporaryPartyList[i].moves[moveSelected].type, temporaryPartyList[i].moves[moveSelected].name.length *10, offset+70);
        text("Power: " +temporaryPartyList[i].moves[moveSelected].power+ " Accuracy: "+temporaryPartyList[i].moves[moveSelected].accuracy+" Category: "+temporaryPartyList[i].moves[moveSelected].category, x, offset+80);
        text("Move Effect: " +effectDescriptions(temporaryPartyList[i].moves[moveSelected].effect), x, offset+90);
      }
      offset += 80;
    }
    
  }
}