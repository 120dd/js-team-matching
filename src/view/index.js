import { SELECTOR } from "../constants.js";
import { Templates } from "./templates.js";
import { renderTemplate } from "./viewHelper.js";

export default class {
    constructor() {
        renderTemplate(SELECTOR.APP,Templates.HEADER);
        renderTemplate(SELECTOR.APP,Templates.MAIN);
        renderTemplate(SELECTOR.MAIN,Templates.COURSE_SELECT);
        renderTemplate(SELECTOR.MAIN,Templates.FRONTEND_COURSE_MANAGE_SECTIONS);
        renderTemplate(SELECTOR.MAIN,Templates.BACKEND_COURSE_MANAGE_SECTIONS);
        renderTemplate(SELECTOR.MAIN,Templates.MATCHCHING_SECTION);
        renderTemplate(SELECTOR.MAIN,Templates.MATCHING_RESULT_SECTION);
    }
}