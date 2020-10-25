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
let playerParty;
let data;
let cpuParty;
let activePlayer;
let activeCPU;
let backgroundMap;
let trainerClasses = ["Hiker", "Youngster", "Beauty", "Trainer", "Bugcatcher", "Pokemaniac", "Triathlete", "Ninja", "Wanderer", "Gentleman"];
let names = ["Todd", "Valerie", "Dave", "Kianna", "Mathew", "Vince", "Carl", "Billie", "Joanna", "Keanu", "Ike", "Natalia", "Taylor", "Emma", "Winston", "Wade", "James", "Kari", "Mark", "Bean", "Emilia", "Kenneth", "Nigel", "Cassandra", "Rias"];
let opponentName;
let physical = "Physical";
let special = "Special";
let healing = "Healing";
let boost = "Boost/Cripple";
let status = "Other";
let newStatus = false;
let newConfused = 0;
let gameMode = "HP";
let panicModeCounter = 0;
let readerBusy = false;
let readerProgress = -1;
let resetReader = true;
let switchStarted = false;
let textInterface = "Press 'Spacebar' to begin, and '-' and '=/+' to navigate your attack choice";
let moveSelected = 0;

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
let playerX;
let playerY;
let cpuX;
let cpuY;
let spriteScale;

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
    category: boost,
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
    effect: [17, 100]}
};


//let damage = 0;
let pokemon;
let pokemonList;
function preload(){
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
        movesList.venoshock]
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
        movesList.crunch, 
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
    }
  };
  pokemonList = [pokemon.dragonite, pokemon.garchomp, pokemon.charizard, pokemon.blastoise, pokemon.venusaur, pokemon.articuno, pokemon.zapdos, pokemon.tyranitar, pokemon.aggron, pokemon.heracross, pokemon.gengar, pokemon.moltres];
  backgroundMap = random([loadImage("backgrounds/back_0.png"), loadImage("backgrounds/back_1.png"), loadImage("backgrounds/back_2.png"), loadImage("backgrounds/back_3.png"), loadImage("backgrounds/back_4.png"), loadImage("backgrounds/back_5.png"), loadImage("backgrounds/back_6.png"), loadImage("backgrounds/back_7.png"), loadImage("backgrounds/back_8.png"), loadImage("backgrounds/back_9.png")]);
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width > height){
    spriteScale = height/6;
  }
  else{
    spriteScale = width/6;
  }
  opponentName = random(trainerClasses) + random(names);
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
  noSmooth();
}

function draw() {
  //background(130, 255, 100);
  image(backgroundMap, width/2, height/2, width, height);
  battleInterface();
  switchOutCheck();
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
        if (move.effect[0] === 5 && defender.status === 0 && (defender.type1 !== fire && defender.type2 !== fire)){
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
            attacker.statusTimer = 2;
            attacker.status = "Sleeping";
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
        if (move.effect[0] === 18 &&(defender.type1 !== electric && defender.type2 !== electric)){
          //The Target becomes paralyzed
          newStatus = true;
          defender.status = "Paralyzed";
          return "boost";
        } 
        if (move.effect[0] === 19){
          //Lowers the Special Attack stat
          defender.statModifiers.sp_akt -= move.effect[2];
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
    return 1;
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
  data.push("Error: TYPE data unknown");
  data.push("The Defender type is "+ pokemon_type);
  data.push("The Attack Type is " + move_type);

}
function effectDescriptions(effectData){
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
  if (effectData[10] ===10){
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

function findBestOffensivePokemon(attacker_party, defender){
  let highestDamageOutput = [0,-666];
  for (let i = 0; i<6; i++){
    let damage = damageCalculator(attacker_party.base_list[i], defender, attacker_party.base_list[i].moves[findBestDamage(attacker_party.base_list[i], defender)], false);
    if (damage > highestDamageOutput[0] && attacker_party.base_list[i].status !== "Fainted"){
      highestDamageOutput[0] = damage;
      highestDamageOutput[1] = i;
    }
  }
  // if (highestDamageOutput[1] === -666){
  //   return "Playet wins";
  // }
  return highestDamageOutput[1];
}

function turnInProgress(player, cpu, player_attack, cpu_attack){
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
  if (player_attack.priority !== cpu_attack.priority){
    if (player_attack.priority > cpu_attack.priority){
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
    let cpu_output = damageCalculator(cpu, player, cpu_attack, true);
    //cpu attack
    turnDataLogs.push(midTurnDataConfigure(cpu_output, cpu, player, cpu_attack));

    if (player.hp>0){
      let player_output = damageCalculator(player, cpu, player_attack, true);
      //player attack
      turnDataLogs.push(midTurnDataConfigure(player_output, player, cpu, player_attack));
    }
  }
  else{
    let player_output = damageCalculator(player, cpu, player_attack, true);
    //player attack
    turnDataLogs.push(midTurnDataConfigure(player_output, player, cpu, player_attack));

    if (cpu.hp>0){
      let cpu_output = damageCalculator(cpu, player, cpu_attack, true);
      //cpu attack
      turnDataLogs.push(midTurnDataConfigure(cpu_output, cpu, player, cpu_attack));
    }
  }
  turnDataLogs.push(postTurnDataConfigure(player, cpu));
  turnDataLogs.push(postTurnDataConfigure(cpu, player));
  if (cpu.status === "Fainted"){
    turnDataLogs.push("Come back, "+activeCPU.name+"!");
    // findBestOffensivePkemono(cpuParty, player)
  }

  if (player.status === "Fainted"){
    turnDataLogs.push("Select your next Pokemon");
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
    if (attackToUse.name === "Thunder Wave"){
      attacking === false;
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
  if (newStatus === true && defender.hp !== 0){
    turnDataLogs.push(defender.name+" was "+defender.status+"!");
    if (defender.status === "Paralyzed"){
      turnDataLogs.push("It may be unable to move!");
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
  return turnDataLogs;
}



function postTurnDataConfigure(pokemon, pokemon_2){
  let postTurnResults = [];
  if (pokemon.status !== 0){
    pokemon.statusTimer --;
  }
  pokemon.boundTimer --;
  if (pokemon.status === "Poisoned"){
    pokemon.hp -= Math.floor(pokemon.baseHP/8);
    postTurnResults.push(pokemon.name+" is poisoned!");
    let isDead = faintChecker(pokemon);
    if (typeof isDead === "string"){
      postTurnResults.push(isDead);
    }
  }
  if (pokemon.status === "Burned"){
    pokemon.hp -= Math.floor(pokemon.baseHP/16);
    postTurnResults.push(pokemon.name+" is burned!");
    let isDead = faintChecker(pokemon);
    if (typeof isDead === "string"){
      postTurnResults.push(isDead);
    }
  }
  if (pokemon.status === "Badly Poisoned"){
    pokemon.hp -= Math.floor(pokemon.baseHP/16*-pokemon.statusTimer);
    postTurnResults.push(pokemon.name+" is badly poisoned!");
    let isDead = faintChecker(pokemon);
    if (typeof isDead === "string"){
      postTurnResults.push(isDead);
    }
  }
  if (pokemon.bound === true){
    if (pokemon.boundTimer > 0){
      pokemon.hp -= Math.floor(pokemon.baseHP/8);
      postTurnResults.push(pokemon.name+" was hurt by"+pokemon.boundBy+"!");
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
    pokemon_2.hp += Math.floor(pokemon.baseHP/8);
    postTurnResults.push(pokemon.name+"'s health was sapped by Leech Seed!");
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
  let hasKillMove = false;
  let bestKillMove = 0;
  let moveCanKill = [false, false, false, false];

  
  
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
  if (cpu.hp < 2*damageCalculator(player, cpu, player.moves[findBestDamage(player, cpu)], false) && playerSpeed > cpuSpeed){
    if (healCheck[0] === true){
      panicModeCounter += 0.5;
      return cpu.moves[healCheck[1]];
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
  if (resetReader === true && readerBusy === false){
    data = turnInProgress(activePlayer, activeCPU, activePlayer.moves[moveSelected], aiMoveSelect(activeCPU, activePlayer, activeCPU.speed, activePlayer.speed));
    readerBusy = true;
    resetReader = false;
    //Sets the text reader to the beginning of the data pile
  }
  //Prevent a prior underflow error
  if (readerProgress < 0){
    readerProgress = 0;
  }
  if (readerBusy === true && readerProgress<data.length){
    //Ignore non-useful data
    if (data[readerProgress !== null]){
      while (typeof data[readerProgress] === "object" && data[readerProgress].length === 0){
        readerProgress++;
        if (readerProgress >= data.length){
          readerBusy = false;
          resetReader = true;
        }
      }
    }
    if (readerProgress<data.length){
      
      if (typeof data[readerProgress] === "object" && data[readerProgress !== null]){
        textInterface = data[readerProgress][0];
        data[readerProgress].shift();
        //reads the data then removes it from the list until the list is empty, then procedes to move onto the next list
      }
      else if (typeof data[readerProgress] === "string"){
        textInterface = data[readerProgress];
        readerProgress ++;
      }
    }
  }
  if(readerProgress >= data.length){
    readerBusy = false;
    resetReader = true;
    readerProgress = 0;
    
  }
}

function battleInterface(){
  imageMode(CENTER);
  image(activeCPU.sprites[0], cpuX, cpuY, spriteScale*2.5, spriteScale*2.5);
  image(activePlayer.sprites[1], playerX, playerY, spriteScale*4, spriteScale*4);
  
  fill(255, 255, 255, 200);
  rect(0, height-50, width, 50);
  fill(0);
  textFont("Cambria");
  textSize(width/33);
  //Checks if the data is a move it needs to animate
  if (typeof textInterface === "object"){
    text(textInterface[0]+textInterface[1]+textInterface[2], 0, height-25);
    console.log(textInterface[1]);
    //moveAnimator(textInterface[1])
  }
  else{
    text(textInterface, 0, height-25);
  }
  playerParty.summary(0,20, activePlayer.status === "Fainted", false);

  cpuParty.summary(width-200,20, false, true);

}

function switchOutCheck(){
  if (activePlayer.status === "Fainted" && readerBusy === false && readerProgress){
    let switchOutResult = pokemonSwitch(playerParty, true, true);
    if (typeof switchOutResult !== "string" && switchOutResult !== null){
      console.log(switchOutResult);
      activePlayer = switchOutResult;
      data.push("Go! "+ activePlayer.name + "!");
    }
  }
  if (activeCPU.status === "Fainted"){
    activeCPU = pokemonSwitch(cpuParty, false, true);
    if (activeCPU === null){
      textInterface = opponentName+" was defeated!";
      return;
    }
    data.push("Take him out, "+activeCPU.name+"!");
  }
  key = "";
  
}
function pokemonSwitch(party, isPlayer, fainted){
  console.log("Switch Initiated");
  if (key === "1"||key === "2"||key === "3"||key === "4"||key === "5"||key === "6"){
    key = int(key);
  }
  if (isPlayer === true && readerBusy === false){
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
      text(temporaryPartyList[i].type1, x,offset+10);
      text(temporaryPartyList[i].type2, x+temporaryPartyList[i].type1.length*8,offset+10);
      textStyle(NORMAL);
      if (temporaryPartyList[i].status !== 0){
        text(temporaryPartyList[i].status, x, offset);
      }
      text(temporaryPartyList[i].moves[0].name, x, offset+25);
      //text(temporaryPartyList[i].moves[0].pp, x+temporaryPartyList[i].moves[0].name.length*8, offset+25);
      text(temporaryPartyList[i].moves[1].name, x, offset+35);
      //text(temporaryPartyList[i].moves[1].pp, x+temporaryPartyList[i].moves[1].name.length*8, offset+35);
      text(temporaryPartyList[i].moves[2].name, x, offset+45);
      //text(temporaryPartyList[i].moves[2].pp, x+temporaryPartyList[i].moves[2].name.length*8, offset+45);
      text(temporaryPartyList[i].moves[3].name, x, offset+55);
      //text(temporaryPartyList[i].moves[3].pp, x+temporaryPartyList[i].moves[3].name.length*8, offset+55);
      if (all === false && cpu === false){
        textStyle(BOLD);
        text("|"+temporaryPartyList[i].moves[moveSelected].name+"|", x+temporaryPartyList[i].moves[moveSelected].name.length*4, offset+70);
        textStyle(ITALIC);
        text(temporaryPartyList[i].moves[moveSelected].type, temporaryPartyList[i].moves[moveSelected].name.length *13, offset+70);
        text("Power: " +temporaryPartyList[i].moves[moveSelected].power+ " Accuracy: "+temporaryPartyList[i].moves[moveSelected].accuracy+" Category: "+temporaryPartyList[i].moves[moveSelected].category, x, offset+80);
        text("Move Effect: " +effectDescriptions(temporaryPartyList[i].moves[moveSelected].effect), x, offset+90);
      }
      offset += 80;
    }
    
  }
}