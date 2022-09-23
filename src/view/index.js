import { $ } from "../utils.js"
import { SELECTOR } from "../constants.js";
import { Templates } from "./templates.js";
import { clearNode, removeClassNodes, renderTemplate } from "./viewHelper.js";

export default class {
    #currentCourseName;
    #currentCrewData;
    
    constructor(data) {
        this.#currentCrewData = data;
        this.#currentCourseName = "";
        this.initFirstPage();
    }
    
    initFirstPage(){
        renderTemplate(SELECTOR.APP, Templates.HEADER);
        renderTemplate(SELECTOR.APP, Templates.MAIN);
        this.registerCrewTabClickEvent();
        this.registerTeamMatchingTabClickEvent();
    }
    
    preventDefault() {
        $("form").addEventListener("submit", e => {
            e.preventDefault();
        });
    }
    
    getLabelText(forValue) {
        return $("label[for='" + forValue + "']").innerText;
    }
    
    registerCrewTabClickEvent() {
        $(`#${SELECTOR.CREW_TAB}`).addEventListener("click", () => {
            clearNode(SELECTOR.MAIN);
            renderTemplate(SELECTOR.MAIN, Templates.COURSE_SELECT);
            this.registerFrontendButtonClickEvent();
            this.registerBackendButtonClickEvent();
        });
    }
    
    registerTeamMatchingTabClickEvent() {
        $(`#${SELECTOR.TEAM_TAB}`).addEventListener("click", () => {
            clearNode(SELECTOR.MAIN);
            renderTemplate(SELECTOR.MAIN, Templates.MATCHING_SECTION);
        });
    }
    
    showResult() {
        removeClassNodes(SELECTOR.MATCHING_SECTION);
        renderTemplate(SELECTOR.MAIN, Templates.MATCHING_RESULT_SECTION);
    }
    
    registerFrontendButtonClickEvent() {
        $(`#${SELECTOR.FRONTEND_COURSE_INPUT}`).addEventListener("click", (e) => {
            this.renderCourseSection({ courseName:e.target.value });
            this.preventDefault();
        });
    }
    
    registerBackendButtonClickEvent() {
        $(`#${SELECTOR.BACKEND_COURSE_INPUT}`).addEventListener("click", (e) => {
            this.renderCourseSection({ courseName:e.target.value });
            this.preventDefault();
        });
    }
    
    getCourseManageSectionTemplate(courseName){
        return Templates.COURSE_MANAGE_SECTION(
            this.getLabelText(courseName),
            Templates.CREW_TABLE_ITEMS(this.#currentCrewData[courseName])
        )
    }
    
    renderCourseSection({ courseName }){
        this.#currentCourseName = courseName;
        removeClassNodes(SELECTOR.CREW_TAB_DETAIL);
        renderTemplate(SELECTOR.MAIN, this.getCourseManageSectionTemplate(this.#currentCourseName))
    }
}