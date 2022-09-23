import { $ } from "../utils.js"
import { COURSE_NAME_KR, SELECTOR } from "../constants.js";
import { Templates } from "./templates.js";
import { clearNode, removeClassNodes, renderTemplate } from "./viewHelper.js";
import { Matcer } from "../model/matcer.js";

export default class {
    #currentCourse;
    
    constructor() {
        this.matcher = new Matcer();
        this.#currentCourse = "";
        this.initPage();
    }
    
    initPage() {
        renderTemplate(SELECTOR.APP, Templates.HEADER);
        renderTemplate(SELECTOR.APP, Templates.MAIN);
    }
    
    registerCrewTabClickEvent(callBackFn) {
        $(`#${SELECTOR.CREW_TAB}`).addEventListener("click", () => {
            clearNode(SELECTOR.MAIN);
            renderTemplate(SELECTOR.MAIN, Templates.MANAGE_COURSE_SELECT);
            this.registerFrontendButtonClickEvent(callBackFn);
            this.registerBackendButtonClickEvent(callBackFn);
        });
    }
    
    registerFrontendButtonClickEvent(callBackFn) {
        $(`#${SELECTOR.FRONTEND_COURSE_INPUT}`).addEventListener("click", (e) => {
            this.#currentCourse = e.target.value;
            this.renderCourseManageSection(callBackFn);
            this.renderManageCrewList(this.matcher.getCrewList());
        });
    }
    
    registerBackendButtonClickEvent(callBackFn) {
        $(`#${SELECTOR.BACKEND_COURSE_INPUT}`).addEventListener("click", (e) => {
            this.#currentCourse = e.target.value;
            this.renderCourseManageSection(callBackFn);
            this.renderManageCrewList(this.matcher.getCrewList());
        })
    }
    
    renderCourseManageSection(callbackFn) {
        removeClassNodes(SELECTOR.CREW_TAB_DETAIL);
        renderTemplate(SELECTOR.MAIN, Templates.COURSE_MANAGE_SECTION(COURSE_NAME_KR[ this.#currentCourse ]));
        this.registerAddCrewButtonEvent(callbackFn);
    }
    
    registerAddCrewButtonEvent(callbackFn) {
        $("form").addEventListener("submit", (e) => {
            e.preventDefault()
        });
        $(`#${SELECTOR.ADD_CREW_BUTTON}`).addEventListener("click", () => {
            callbackFn({
                position: this.#currentCourse, name: $(`#${SELECTOR.CREW_NAME_INPUT}`).value
            });
        })
    }
    
    renderManageCrewList(crewList) {
        clearNode(SELECTOR.CREW_TBODY);
        renderTemplate(SELECTOR.CREW_TBODY, Templates.CREW_TABLE_ITEMS(crewList[ this.#currentCourse ]));
    }
}