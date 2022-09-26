import View from "./view";
import { Matcer } from "./model/matcer.js";

export class MatcherHandler {
    constructor() {
        this.matcher = new Matcer();
        this.view = new View();
        this.view.registerManageTabClickEventListener({
            addFn:this.requestSetCrew,
            deleteFn:this.requestDeleteCrew,
        });
    }
    
    requestSetCrew = (crewInfo) => {
        this.matcher.setCrew(crewInfo);
        this.view.renderManageCrewList(this.matcher.getCrewList());
    }
    requestDeleteCrew = (crewInfo) => {
        this.matcher.deleteCrew(crewInfo);
        this.view.renderManageCrewList(this.matcher.getCrewList());
    }
}