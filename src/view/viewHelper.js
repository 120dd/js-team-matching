import { $ } from '../utils.js';

export function renderTemplate(parentId, childNode) {
	$(`#${parentId}`).insertAdjacentHTML('beforeend', childNode);
}

export function clearNode(targetId) {
	$(`#${targetId}`).innerHTML = '';
}

export function removeClassNodes(targetClass) {
	document.querySelectorAll(`.${targetClass}`).forEach(node => {
		node.remove();
	});
}

export function getSelectedName(target) {
	return target.options[target.selectedIndex].text;
}
