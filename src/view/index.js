import { $ } from "../utils.js"
import { SELECTOR } from "../constants.js";
import { Templates } from "./templates.js";
import { clearNode, removeClassNodes, renderTemplate } from "./viewHelper.js";

export default class {
    constructor() {
        renderTemplate(SELECTOR.APP, Templates.HEADER);
        renderTemplate(SELECTOR.APP, Templates.MAIN);
        this.registerCrewTabClickEvent()
        this.registerTeamMatchingTabClickEvent();
    }
    
    registerCrewTabClickEvent() {
        $(`#${SELECTOR.CREW_TAB}`).addEventListener("click", () => {
            clearNode(SELECTOR.MAIN);
            renderTemplate(SELECTOR.MAIN,Templates.COURSE_SELECT);
            this.registerFrontendButtonClickEvent();
            this.registerBackendButtonClickEvent();
            }
        );
    }
    
    registerTeamMatchingTabClickEvent() {
        $(`#${SELECTOR.TEAM_TAB}`).addEventListener("click", () => {
                clearNode(SELECTOR.MAIN);
                renderTemplate(SELECTOR.MAIN,Templates.MATCHING_SECTION);
            }
        );
    }
    
    showResult(){
        removeClassNodes(SELECTOR.MATCHING_SECTION);
        renderTemplate(SELECTOR.MAIN,Templates.MATCHING_RESULT_SECTION);
    }
    
    registerFrontendButtonClickEvent(){
        $(`#${SELECTOR.FRONTEND_COURSE_INPUT}`).addEventListener("click", () => {
                removeClassNodes(SELECTOR.CREW_TAB_DETAIL);
                renderTemplate(SELECTOR.MAIN,Templates.FRONTEND_COURSE_MANAGE_SECTIONS);
            }
        );
    }
    
    registerBackendButtonClickEvent(){
        $(`#${SELECTOR.BACKEND_COURSE_INPUT}`).addEventListener("click", () => {
                removeClassNodes(SELECTOR.CREW_TAB_DETAIL);
                renderTemplate(SELECTOR.MAIN,Templates.BACKEND_COURSE_MANAGE_SECTIONS);
            }
        );
    }
}