import Box from "./Box.js";
export default class Map{
    constructor(y,x, nbObstacle, nbWeapon, nbPlayer){
        this.y = y; //Height
        this.x = x; //Width
        this.nbObstacle = nbObstacle;
        this.nbWeapon = nbWeapon;
        this.nbPlayer = nbPlayer;
        this.freeSpace = document.getElementsByClassName("freeSpace");
        this.box = [];

        //Ici l'instantiation des arrays permet d'avoir un tableau avec plusieurs valeurs 
        //et non pas plusieurs tableaux a cause des boucles dans lequel ils sont utilisés (avec par exemple une ou plusieurs valeurs)
        this.arrayClassWeapons = [];

        this.arrayClassPlayers = [];
        //On push un element vide à l'index 0 pour simplifier index 1 = Player 1 et ainsi de suite
        this.arrayClassPlayers.push("");

        this.weapon1 = {};
        this.weapon2 = {};
        this.weapon3 = {};
        this.weapon4 = {};
        this.player1 = {};
        this.player2 = {};
    }

    genGrid(){
        this.start = document.getElementById('start');
        this.table = document.createElement('table');
        this.start.appendChild(this.table);

        for (this.i = 0; this.i < this.x; this.i++){
            this.box[this.i]=[];
            this.row = document.createElement('tr');
            this.table.appendChild(this.row);

            for (this.j = 0; this.j < this.y; this.j++){
                this.box[this.i][this.j] = new Box(
                    this.td = document.createElement('td'),
                    //this.td.setAttribute("empty", true),
                    this.td.setAttribute("class","freeSpace"),
                    this.td.setAttribute("y",parseInt(this.j)),
                    this.td.setAttribute("x",parseInt(this.i)),
                    this.td.setAttribute("id","" + this.j+ this.i )
                )
                this.row.appendChild(this.box[this.i][this.j].td);
            }
        }
    }

    random = (param) => {
        this.randomBox = param[Math.floor(Math.random() * param.length)];
        return this.randomBox;
    }

    //L'appel de cette fonction dans genObastacle, genWeapons, genPlayers,
    //Va m'éviter d'utiliser des this.box.block, this.box.empty, this.box.reached (C'est une préference personnelle)
    randomCase = (nbCase) =>{

        //Ici je cherche a générer TOUTES mes cases aléatoires
        this.random(this.freeSpace); //Un element random de mes classe libre
        
        for(let i=0;i<nbCase;i++){

            //Quand je génére une random case, si la case est déjà un obstacle j'annule l'opération
            if(this.randomBox === "obstacle"){
                return;
            }
            
            //Sinon
            else{

            //Enleve la class freeSpace pour les futurs éléments
            this.randomBox.classList.remove("freeSpace");
            }
        }
    }

    //Generation d'obstacles
    genObstacle(){
        for(let i=1;i<this.nbObstacle+1;i++){

            this.randomCase(1);
            this.randomBox.classList.add("obstacle");
            this.obstacles = document.getElementsByClassName("obstacle");
        }
    }   

    //Generation d'armes
    genWeapons(weapon0,weapon1,weapon2,weapon3,weapon4){
        this.arrayClassWeapons.push(this.weapons="");
        for(let i=1;i< this.nbWeapon ;i++){
                        
            this.randomCase(1);

            this.randomBox.classList.add("weapon"+i);

            this.weapons = document.getElementsByClassName("weapon"+i)[0];

            this.arrayClassWeapons.push(this.weapons);
            //Associons les positions de class MAP à nos intances de class WEAPON
            if(i==0){
                this.weapon0=weapon0
                weapon0.setCurrentPosition(
                    this.randomBox.getAttribute("y"),
                    this.randomBox.getAttribute("x")
                );
            }
            else if(i==1){
                this.weapon1=weapon1
                weapon1.setCurrentPosition(
                    this.randomBox.getAttribute("y"),
                    this.randomBox.getAttribute("x")
                );
            }
            else if(i==2){
                this.weapon2=weapon2
                weapon2.setCurrentPosition(
                    this.randomBox.getAttribute("y"),
                    this.randomBox.getAttribute("x")
                );
            }
            else if(i==3){
                this.weapon3=weapon3
                weapon3.setCurrentPosition(
                    this.randomBox.getAttribute("y"),
                    this.randomBox.getAttribute("x")
                );
            }
            else if(i==4){
                this.weapon4=weapon4
                weapon4.setCurrentPosition(
                    this.randomBox.getAttribute("y"),
                    this.randomBox.getAttribute("x")
                );
            }
        }
    }

    //Generation de player
    genPlayers(player1,player2){
        for(let i=1;i<this.nbPlayer+1;i++){
            this.randomCase(1);
            this.randomBox.classList.add("player"+i);

            this.players = document.getElementsByClassName("player"+i)[0];

            this.arrayClassPlayers.push(this.players);
            //Associons les positions de class MAP à nos intances de class PLAYER
            if(i==1){
                this.player1=player1
                player1.setCurrentPosition(
                    this.randomBox.getAttribute("y"),
                    this.randomBox.getAttribute("x")
                );
            }
            else if(i==2){
                this.player2=player2
                player2.setCurrentPosition(
                    this.randomBox.getAttribute("y"),
                    this.randomBox.getAttribute("x")
                );
            }
        }   
    }

    //Pour une apparition des PLAYERS sur la MAP éloignée
    playersNoAdjacent(){

        if(Math.abs(this.player1.currentPosition[0] - this.player2.currentPosition[0])<=2 || Math.abs(this.player1.currentPosition[1] - this.player2.currentPosition[1])<=2){

            //console.log("PROBLEME : position Player 1 & 2 trop proche");
            //console.log(Math.abs(this.player1.currentPosition[0] - this.player2.currentPosition[0]));
            //console.log(Math.abs(this.player1.currentPosition[1] - this.player2.currentPosition[1]));
            //console.log("Position Player1 : " + this.player1.currentPosition[0] + this.player1.currentPosition[1]);
            //console.log("Ancienne position Player2 : " + this.player2.currentPosition[0] + this.player2.currentPosition[1]);
            
            this.player2.currentPosition[0] = "";
            this.player2.currentPosition[1] = "";
            this.randomBox.classList.remove("player2");

            this.randomCase(1);
            this.randomBox.classList.add("player2");
            this.player2.setCurrentPosition(
                this.randomBox.getAttribute("y"),
                this.randomBox.getAttribute("x")
            );
            this.arrayClassPlayers[2]= document.getElementsByClassName("player2")[0];
            
            //console.log();
            //console.log("Position Player1 : " + this.player1.currentPosition[0] + this.player1.currentPosition[1]);
            //console.log("Nouvelle position Player2 : " + this.player2.currentPosition[0] + this.player2.currentPosition[1]);

            this.playersNoAdjacent();
        }
    }
}