export default class Box{
    constructor(td,classType,y,x,id){
        
        this.td = td;
        //this.empty = empty;
        this.classType = classType;
        this.y = y;
        this.x = x;
        this.id = id;
        //this.blocked = false;
        //this.reachable = true;
        this.groundWeapon = null;
    }
}   