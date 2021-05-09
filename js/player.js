export default class Player{
    constructor(name, health, fist, classType,playerIdentificationNumber){
        this.name = name;
        this.health = health;
        this.shield = false;
        this.fist = fist;
        this.weapon = this.fist;
        this.weaponLeft = null;
        this.classType = classType;
        this.health = health;
        this.damages = this.weapon.damages;
        this.defense = false;
        this.currentPosition = []; //INCONNU
        this.playerIdentificationNumber = playerIdentificationNumber;
        this.opponent = {}; 
    }

    setCurrentPosition(y,x){
        y = parseInt(y);
        x = parseInt(x);

        this.currentPosition = [y,x];
    }

    setDamage(){
        if (this.weapon!=null) {
            this.damages = this.weapon.damages;
            //console.log("Nouvelle puissance de feu du joueur : " + this.damages);
        }
    }

    hitByOpponent(){
        if(this.shield==false){
            this.health = this.health - this.opponent.damages;
        }
        else if(this.shield==true){
            this.health = this.health - this.opponent.damages/2;
        }
    }

    setOpponent(player){
        this.opponent = player;
    }

    setHtml(){
        if (this.classType == "player1") {
            let name = document.querySelector(".name");
            name.innerHTML = "Name : "+this.name;
            let health = document.querySelector(".health");
            health.innerHTML = "Health : "+this.health;
            let weaponName = document.querySelector(".weaponName");
            this.weaponImg = document.querySelector(".weaponImg");
            weaponName.innerHTML = "Weapon : "+this.weapon.name;
            if(this.weaponLeft != null){
                this.weaponImg.classList.remove("weapon" + this.weaponLeft.weaponIdentificationNumber);
            }
            this.weaponImg.classList.add("weapon" + this.weapon.weaponIdentificationNumber);
            let degats = document.querySelector(".degats");
            degats.innerHTML = "Damages : " + this.damages;
            let shieldName = document.querySelector(".shieldName");
            let shield = document.querySelector(".shield");
            shieldName.innerHTML = "Shield activation <br> (Damages/2): " + this.shield;

            if(this.shield==false){
                shieldName.style.color = "red";
                shield.style.opacity=0.5;

            }

            if(this.shield==true){
                shieldName.style.color = "green"
                shield.style.opacity=1;
            }
        }

        if (this.classType == "player2") {
            let name = document.querySelector(".joueur2 .name");
            name.innerHTML = "Name : "+this.name;
            let health = document.querySelector(".joueur2 .health");
            health.innerHTML = "Health : "+this.health;
            let weaponName = document.querySelector(".joueur2 .weaponName");
            this.weaponImg = document.querySelector(".joueur2 .weaponImg");
            weaponName.innerHTML = "Weapon : "+this.weapon.name;
            if(this.weaponLeft != null){
                this.weaponImg.classList.remove("weapon" + this.weaponLeft.weaponIdentificationNumber);
            }
            this.weaponImg.classList.add("weapon" + this.weapon.weaponIdentificationNumber);
            let degats = document.querySelector(".joueur2 .degats");
            degats.innerHTML = "Damages : " + this.damages;
            let shieldName = document.querySelector(".joueur2 .shieldName");
            let shield = document.querySelector(".joueur2 .shield");
            shieldName.innerHTML = "Shield activation <br> (Damages/2): " + this.shield;
            shield.classList.add("shield");

            if(this.shield==false){
                shieldName.style.color = "red";
                shield.style.opacity=0.5;
            }

            if(this.shield==true){
                shieldName.style.color = "green"
                shield.style.opacity=1;
            }
        }
    }
}