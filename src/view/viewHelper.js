import { $ } from "../utils.js";

export function renderTemplate(parentId,chiledNode) {
    $(`#${parentId}`).insertAdjacentHTML("beforeend",chiledNode);
}