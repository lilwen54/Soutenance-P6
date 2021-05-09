export default class Weapon{

    constructor(name,damages,weaponIdentificationNumber,myClass){
        this.name = name;
        this.damages = damages;
        this.currentPosition = [];
        this.weaponIdentificationNumber = weaponIdentificationNumber;
        this.myClass = myClass;
        }

    setCurrentPosition(y,x){
        y = parseInt(y);
        x = parseInt(x);

        this.currentPosition = [y,x];
    }
}