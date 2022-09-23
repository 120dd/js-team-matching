import View from "./view";
import { Matcer } from "./model/matcer.js";

export class MatcherHandler {
    constructor() {
        this.matcher = new Matcer();
        this.view = new View();
        this.view.registerCrewTabClickEvent(this.requestSetCrew);
    }
    
    requestSetCrew = (crewInfo) => {
        this.matcher.setCrew(crewInfo);
        this.view.renderManageCrewList(this.matcher.getCrewList());
    }
}