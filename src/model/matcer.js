export class Matcer {
    #crewList;
    
    constructor() {
        if (Matcer.instance) {
            return Matcer.instance;
        }
        Matcer.instance = this;
        this.#crewList = {
            frontend: ["a", "b"],
            backend: ["c", "d"],
        }
    }
    
    getPositionList(posittion) {
        return this.#crewList[ posittion ];
    }
    
    getCrewList() {
        return this.#crewList
    }
    
    setCrew = ({ position, name }) => {
        this.#crewList[ position ].push(name);
    }
    
    deleteCrew = ({ position, idx }) => {
        this.#crewList[ position ].splice(idx,1);
    }
}