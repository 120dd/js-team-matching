import { SELECTOR } from "../constants.js";
import { Templates } from "./templates.js";
import { renderTemplate } from "./viewHelper.js";

export default class {
    constructor() {
        renderTemplate(SELECTOR.APP,Templates.HEADER);
    }
}