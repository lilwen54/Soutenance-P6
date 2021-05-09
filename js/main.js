import Weapon from "./Weapon.js";
import Game from "./game.js";
import Map from "./map.js";
import Player from "./player.js";

let game = new Game();
let map = new Map(10,10, 10,5,2);

const weapon0 = new Weapon("fist",10,0, "weapon0");
const weapon1 = new Weapon("knifes",20,1, "weapon1");
const weapon2 = new Weapon("guns",25,2, "weapon2");
const weapon3 = new Weapon("katana",30,3, "weapon3");
const weapon4 = new Weapon("assault",35,4, "weapon4");

let arrayWeapons = [weapon0, weapon1, weapon2, weapon3, weapon4];

let name1 = "Goku";
let name2 = "Chichi";

let player1 = new Player(name1,300,weapon0,"player1",1);
let player2 = new Player(name2,300,weapon0,"player2",2);


$(function(){
    game.gameInitialization();
    map.genGrid();
    map.genObstacle();
    map.genWeapons(weapon0,weapon1,weapon2,weapon3,weapon4);
    map.genPlayers(player1,player2);
    player1.setOpponent(player2);
    player2.setOpponent(player1);
    game.getAttribute(map,player1,player2);
    map.playersNoAdjacent();
    game.skipTurn();
    game.keyboardKey();
    game.getWeapon(arrayWeapons,weapon1,weapon2,weapon3,weapon4);
})