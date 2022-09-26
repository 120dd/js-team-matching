import { $ } from "../utils.js";

export function renderTemplate(parentId, chiledNode) {
    $(`#${parentId}`).insertAdjacentHTML("beforeend", chiledNode);
}

export function clearNode(targetId) {
    $(`#${targetId}`).innerHTML = '';
}

export function removeClassNodes(targetClass) {
    document.querySelectorAll(`.${targetClass}`).forEach(node => {
        node.remove();
    });
}

export function getSelectedName(target){
    return target.options[target.selectedIndex].text;
}