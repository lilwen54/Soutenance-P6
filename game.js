//import Map from "./map.js";
export default class Game{
    constructor(){
        this.currentPlayer = {};
        this.opponent = {};
        this.obstacles = {};
        this.arrayClassPlayers = {};
        this.arrayClassWeapons = {};

        this.map = {};
        this.weapon1 = {};
        this.weapon2 = {};
        this.weapon3 = {};
        this.weapon4 = {};
        let maxMove = 3;
        this.stillMove = maxMove;

        this.player1 = {};
        this.player2 = {};

        this.takeAWeapon = false;
        this.player_Turn = document.getElementById("player_Turn");
        this.nextTurn = document.getElementById("nextTurn");
        this.changeTurn = document.getElementById("changeTurn");
        this.para = document.createElement("p");

        this.imgP2 = document.querySelector("img.p2");
        this.imgP1 = document.querySelector("img.p1");
    }

    gameInitialization(){

        $("#intro").fadeIn(2000);
        $("#intro").fadeOut(1000);
        $("#intro").fadeIn(600);
        $("#intro").fadeOut(1000);
        $("#intro").fadeIn(600);
        $("#intro").fadeOut(1000);

        $("#presentation").fadeOut(0);
        $("#presentation").fadeIn(700);
        $("#presentation").fadeOut(700);
        $("#presentation").fadeIn(700);
        $("#presentation").fadeOut(700);
        $("#presentation").fadeIn(2100);

        $("#player_Turn").fadeOut(0);
        $("#player_Turn").fadeIn(500);

        $("#info1").fadeOut(0);
        $("#info1").fadeIn(700);

        $("#info2").fadeOut(0);
        $("#info2").fadeIn(800);

        $("#nextTurn").fadeOut(0);
        $("#nextTurn").fadeIn(800);

        start.style.display = "none";
        $("#start").fadeIn(1000);
    }

    msgChangeTurn(){
        if(this.changeTurn.children[0] == "p"){
            this.changeTurn.remove(0);
        }
        $("#changeTurn").fadeIn(1000);
        $("#changeTurn").fadeOut(1000);
    }

    stillMoveCounter(){  
        
        if (this.stillMove==1) {
            this.msgChangeTurn();

            this.stillMove = 4;

            this.whosNext();
            
            this.para.innerHTML = "Au joueur " + this.currentPlayer.playerIdentificationNumber + " de jouer";
            this.changeTurn.appendChild(this.para);
        }
    this.stillMove = this.stillMove - 1;
    }

    skipTurn(){
        this.nextTurn.addEventListener("click",()=>{
            this.stillMove=1;
            this.stillMoveCounter();
        })
    }

    whosNext(){
        if(this.currentPlayer.classType == "player1"){
            this.player_Turn.classList.remove("player"+this.currentPlayer.playerIdentificationNumber);
            this.currentPlayer = this.player2;
            this.opponent = this.player1;
            this.player_Turn.classList.add("player"+this.currentPlayer.playerIdentificationNumber);

            this.imgP1.style.opacity = "0.7";
            this.imgP2.style.opacity = "1";
        }
        else if(this.currentPlayer.classType == "player2"){
            this.player_Turn.classList.remove("player"+this.currentPlayer.playerIdentificationNumber);
            this.currentPlayer = this.player1;
            this.opponent = this.player2;
            this.player_Turn.classList.add("player"+this.currentPlayer.playerIdentificationNumber);

            this.imgP2.style.opacity = "0.7";
            this.imgP1.style.opacity = "1";
        }
    }

    getAttribute(map,player1,player2){
        //PLAYERS
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = this.player1;
        this.currentPlayer.setHtml();
        this.opponent = this.player2;
        this.opponent.setHtml();

        this.player_Turn.classList.add("player"+this.currentPlayer.playerIdentificationNumber);
        
        this.map = map;
        this.arrayClassPlayers = map.arrayClassPlayers;

        //WEAPONS
        this.arrayClassWeapons = map.arrayClassWeapons;

        //OBSTACLES
        this.obstacles =  map.obstacles; 
    }

    keyboardKey(){
        document.addEventListener(
            "keydown", direction=>{
                let player = this.currentPlayer;

                this.direction = direction
            if (direction.keyCode >= 37 && direction.keyCode <= 40) {

                switch (direction.keyCode) {

                    case this.myCase = 37:
                        player.currentPosition[0] = player.currentPosition[0]-1;
                        break; // left
                
                    case this.myCase = 38:
                        player.currentPosition[1] = player.currentPosition[1]-1;
                        break;// up

                    case this.myCase = 39:
                        player.currentPosition[0] = Number(player.currentPosition[0])+1;
                        break;// right 

                    case this.myCase = 40:
                        player.currentPosition[1] = Number(player.currentPosition[1])+1;
                        break;// down     
                
                    default:
                        break;
                }
            }
            
            this.currentPlayer.currentPosition = player.currentPosition;
            this.createNewPosition();
            this.limitOfMove();
            this.returnMove();
        })
    }

    findWeapon(){

        for (let i = 0; i < this.arrayClassWeapons.length; i++) {

            //On ne prend pas en compte le poing
            if(i==0){

            }

            if(this.arrayClassWeapons[i].id == this.currentPlayer.playerBalise.id){

                //On verifie d'abord que le player ai une arme
                if(this.currentPlayer.weapon.name !== "fist"){

                    if(this.arrayClassWeapons[i].classList[0] == ("weapon0")){
                        //Toujours notre poing à ne pas prendre en compte
                    }
        
                    else if(this.arrayClassWeapons[i].classList[0] == ("weapon"+i)){
                        this.currentPlayer.weaponLeft = this.currentPlayer.weapon;
                        this.currentPlayer.weapon = this.arrayWeapons[i];
                        this.currentPlayer.setDamage();
                        
                    }
                }
        
                //Si le joueur n'a pas d'arme
                else if(this.currentPlayer.weapon.name == "fist"){
                    
                    if(this.arrayClassWeapons[i].classList[0] == ("weapon0")){
                        //Toujours notre poing à ne pas prendre en compte
                    }

                    else if(this.arrayClassWeapons[i].classList[0] == ("weapon"+i)){
                        this.currentPlayer.weaponLeft = this.currentPlayer.weapon;
                        this.currentPlayer.weapon = this.arrayWeapons[i];
                        this.currentPlayer.setDamage();

                    }
                    this.arrayClassWeapons[i].classList.remove("weapon"+i);
                    this.arrayClassWeapons[i] = this.currentPlayer.currentPosition;
                    this.arrayClassWeapons[i] = this.currentPlayer.playerBalise;
                }
                this.currentPlayer.setHtml(); 
            }
        }   
    }

    limitOfMove(){

            this.arrayObstaclesId = [];

            for(let i=0;i<this.obstacles.length;i++){
                this.arrayObstaclesId.push(this.obstacles[i].id);
            }

        if (this.currentPlayer.currentPosition[0] < 0 || this.currentPlayer.currentPosition[0] > 9 ||this.currentPlayer.currentPosition[1] < 0 || this.currentPlayer.currentPosition[1] > 9) {
            this.returnMove(this.myCase);
            console.log("limite dépassé YX");
        }

        else if(this.arrayObstaclesId.includes(this.currentPlayer.newPosition)){
            this.returnMove(this.myCase);
        }
        else{
            this.move();
        }
    }

    returnMove=(myCase)=>{
        if(myCase === 37){
            console.log('impossibleMove + retour droite');
            this.currentPlayer.currentPosition[0] = this.currentPlayer.currentPosition[0] + 1;
        }

        else if(myCase === 38){
            console.log('impossibleMove + retour bas');
            this.currentPlayer.currentPosition[1] = this.currentPlayer.currentPosition[1] + 1;
        }

        else if(myCase === 39){
            console.log('impossibleMove + retour gauche');
            this.currentPlayer.currentPosition[0] = this.currentPlayer.currentPosition[0] - 1;
        }

        else if(myCase === 40){
            console.log('impossibleMove + retour haut');
            this.currentPlayer.currentPosition[1] = this.currentPlayer.currentPosition[1] - 1;
        }
    }

    getWeapon(arrayWeapons,weapon1,weapon2,weapon3,weapon4){
        this.arrayWeapons = arrayWeapons;
        this.weapon1 = weapon1;
        this.weapon2 = weapon2;
        this.weapon3 = weapon3;
        this.weapon4 = weapon4;
     }

     createNewPosition(){

        //METHOD ACTIVE LORS D'UN MOUVEMENT
        //ME SERT AUSSI POUR NE PAS ALLER SUR MES OBSTACLES

        let y = parseInt(this.currentPlayer.currentPosition[0]);
        let x = parseInt(this.currentPlayer.currentPosition[1]);

        this.currentPlayer.newPosition = "" + y + x;

        this.currentPlayer.playerBalise = document.getElementById(this.currentPlayer.newPosition);

        let a = this.opponent.currentPosition[0];
        let b = this.opponent.currentPosition[1];

        this.opponent.newPosition = "" + a + b;
    }

    move(){
        
        this.arrayClassPlayers[this.currentPlayer.playerIdentificationNumber] = document.getElementsByClassName("player"+this.currentPlayer.playerIdentificationNumber)[0];
    
        //////////////////////////////////////////////////////////////////////

        this.createNewPosition()

        /////////////////////////////////////////////////////////////////////////////////

        //On enleve le player et l'arme (si en possession) de la case actuelle
        this.arrayClassPlayers[this.currentPlayer.playerIdentificationNumber].classList.remove("player"+ this.currentPlayer.playerIdentificationNumber);
        
        if(this.currentPlayer.weapon.name !== "fist"){
        this.arrayClassWeapons[this.currentPlayer.playerIdentificationNumber].classList.remove("weapon"+this.currentPlayer.weapon.weaponIdentificationNumber);
        }

        if(this.arrayClassPlayers[this.currentPlayer.playerIdentificationNumber].className == ""){
        this.arrayClassPlayers[this.currentPlayer.playerIdentificationNumber].classList.add("freeSpace");
        }

        //On rajoute le player et de l'arme sur la nouvelle case
        document.getElementById(this.currentPlayer.newPosition).classList.remove("freeSpace");
        document.getElementById(this.currentPlayer.newPosition).classList.add("player"+this.currentPlayer.playerIdentificationNumber);
        this.arrayClassPlayers[this.currentPlayer.playerIdentificationNumber] = this.currentPlayer.playerBalise;

        //DONC Si mon joueur est en possession d'une arme, l'arme suit le joueur
        
        if(this.currentPlayer.weapon.name !== "fist"){
            if(this.arrayClassWeapons[this.currentPlayer.weapon.weaponIdentificationNumber] !== this.currentPlayer.playerBalise){
            
                this.arrayClassWeapons[this.currentPlayer.weapon.weaponIdentificationNumber].classList.remove("weapon"+this.currentPlayer.weapon.weaponIdentificationNumber);
                this.arrayClassWeapons[this.currentPlayer.weapon.weaponIdentificationNumber] = this.currentPlayer.playerBalise;
                this.arrayClassWeapons[this.currentPlayer.weapon.weaponIdentificationNumber].classList.add("weapon"+this.currentPlayer.weapon.weaponIdentificationNumber);
                }
        }

        this.findWeapon();
        this.playersAdjacent();
        this.stillMoveCounter();
        this.currentPlayer.setHtml();
    }

    playersAdjacent(){
        //un calcul pour savoir si mes joueurs sont adjacents 
        //Si Oui, lancement de la phase COMBAT
        if(Math.abs(this.map.player1.currentPosition[0] - this.map.player2.currentPosition[0])==0 && Math.abs(this.map.player1.currentPosition[1] - this.map.player2.currentPosition[1])==1
        ||
        Math.abs(this.map.player1.currentPosition[1] - this.map.player2.currentPosition[1])==0 && Math.abs(this.map.player1.currentPosition[0] - this.map.player2.currentPosition[0])==1 ){
            this.player_Turn.classList.remove("player"+this.currentPlayer.playerIdentificationNumber);
            this.fight();
        }
    }

    fight(){
        (console.log("c\'est l\'heure du combat"));
        $("#start").fadeOut(2500);
        $("#nextTurn").fadeOut(2500);
        $("player_Turn").fadeOut(2500);
        $("#battle").fadeIn(5000);
        this.battle();
    }

    battle(){

        if(this.currentPlayer.classType == "player1"){
            this.imgP2.style.opacity = "0.7";
            this.imgP1.style.opacity = "1";
        }

        if(this.currentPlayer.classType == "player2"){
            this.imgP2.style.opacity = "1";
            this.imgP1.style.opacity = "0.7";
        }

        let playerTurn = document.getElementById("playerTurn");
        let para = document.createElement("p");
        let life = document.createElement("p");

        para.innerHTML ="";
        life.innerHTML = "";
        
        playerTurn.classList.add("player"+this.currentPlayer.playerIdentificationNumber);
        para.innerHTML = `Au joueur ${this.currentPlayer.playerIdentificationNumber} de jouer`;
        life.innerHTML = `Vie du joueur ${this.currentPlayer.playerIdentificationNumber} qui lance le coup :  ${this.currentPlayer.health} <br>
        Vie du joueur ${this.opponent.playerIdentificationNumber} qui reçois le coup :  ${this.opponent.health}`;

        playerTurn.appendChild(para);
        playerTurn.appendChild(life);

        let attack = document.getElementById("attack");
        let defend = document.getElementById("defend");

        let currentPlayer = this.currentPlayer;
        let opponent = this.opponent;

         let player1 = this.player1;
         let player2 = this.player2;

         let imgP1 = this.imgP1;
         let imgP2 = this.imgP2;

        function whosNext(){
            if(currentPlayer.classType == "player1"){
                currentPlayer = player2;
                opponent = player1;

                imgP2.style.opacity = "1";
                imgP1.style.opacity = "0.7";
                return currentPlayer, opponent;
            }
            else if(currentPlayer.classType == "player2"){
                currentPlayer = player1;
                opponent = player2;

                imgP2.style.opacity = "0.7";
                imgP1.style.opacity = "1";
                return currentPlayer, opponent;
            }
        }

        this.currentPlayer = currentPlayer;
        this.opponent = opponent;

        defend.addEventListener("click", function block(){
            playerTurn.classList.remove("player"+currentPlayer.playerIdentificationNumber);
            currentPlayer.shield = true;

            currentPlayer.setHtml();
            opponent.setHtml();
            //Quand je defend le tour ne change pas
            whosNext();
            para.innerHTML = `Au joueur  ${currentPlayer.playerIdentificationNumber} de jouer`;
            playerTurn.classList.add("player"+currentPlayer.playerIdentificationNumber);
            life.innerHTML = `Vie du joueur ${currentPlayer.playerIdentificationNumber} qui lance le coup :  ${currentPlayer.health} <br>
            Vie du joueur ${opponent.playerIdentificationNumber} qui reçois le coup :  ${opponent.health}`;
        });
        
        attack.addEventListener("click", function hit(){
            playerTurn.classList.remove("player"+currentPlayer.playerIdentificationNumber);
            opponent.hitByOpponent();
            opponent.shield = false;

            currentPlayer.setHtml();
            opponent.setHtml();

            if(opponent.health<=0){
                alert(`GAMEOVER : ${opponent.classType} ! Vous êtes KO, vous avez perdu le combat` );
                window.location.reload();
            }

            currentPlayer.setDamage();
            whosNext();
            para.innerHTML = `Au joueur  ${currentPlayer.playerIdentificationNumber} de jouer`;
            life.innerHTML = `Vie du joueur ${currentPlayer.playerIdentificationNumber} qui lance le coup :  ${currentPlayer.health} <br>
            Vie du joueur ${opponent.playerIdentificationNumber} qui reçois le coup :  ${opponent.health}`;

            playerTurn.classList.add("player"+currentPlayer.playerIdentificationNumber);
        });
    }
        
    gameOver(winner){
        alert("Le joueur" + winner + " a gagner la partie, cliquer sur \"OK\" pour recommencer");
    }

    gameRestart(){
        this.gameInitialization();
    }
}