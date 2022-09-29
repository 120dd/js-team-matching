import { $ } from '../utils.js';
import { COURSE_NAME_KR, SELECTOR } from '../constants.js';
import { Templates } from './templates.js';
import { clearNode, getSelectedName, removeClassNodes, renderTemplate } from './viewHelper.js';
import { Matcer } from '../model/matcer.js';

export default class {
	#currentCourse;
	#currentMission;

	constructor() {
		this.matcher = new Matcer();
		this.initPage();
	}

	initPage() {
		renderTemplate(SELECTOR.APP, Templates.HEADER);
		renderTemplate(SELECTOR.APP, Templates.MAIN);
		this.registerHeaderEventListener();
	}

	registerHeaderEventListener() {
		const actions = {
			'crew-tab': () => this.showCrewTab(),
			'team-tab': () => this.showTeamTab(),
		};

		$('header').addEventListener('click', e => {
			e.preventDefault();
			e.target.id && actions[e.target.id]();
		});
	}

	registerManageTabClickEventListenerActions({ e, addFn, deleteFn }) {
		return {
			'frontend-course': () => this.showManageSection(e),
			'backend-course': () => this.showManageSection(e),
			'add-crew-button': () => this.requestAddCrew(addFn),
			'delete-crew-button': () => this.requestDeleteCrew(e, deleteFn),
		};
	}

	registerManageTabClickEventListener({ addFn, deleteFn }) {
		$(SELECTOR.MAIN).addEventListener('click', e => {
			const actions = this.registerManageTabClickEventListenerActions({ e, addFn, deleteFn });
			if (e.target.className === SELECTOR.DELETE_CREW_BUTTON) {
				return this.requestDeleteCrew(e, deleteFn);
			}
			e.target.id && typeof actions[e.target.id] === 'function' && actions[e.target.id]();
		});
	}

	registerTeamTabClickEventListener({ matchingFn }) {
		$(SELECTOR.MAIN).addEventListener('click', e => {
			e.preventDefault();
			const actions = {
				'show-team-matcher-button': () => this.showTeamMatchingSectionDetail(),
				'rematch-team-button': () => this.showTeamMatchingSectionDetail(),
				'match-team-button': () => {
					const minNum = $(`#${SELECTOR.TEAM_MEMBER_COUNT_INPUT}`).value;
					matchingFn({ position: this.#currentCourse, minNum });
				},
			};
			e.target.id && typeof actions[e.target.id] === 'function' && actions[e.target.id]();
		});
	}

	showCrewTab() {
		clearNode(SELECTOR.MAIN);
		renderTemplate(SELECTOR.MAIN, Templates.MANAGE_COURSE_SELECT);
	}

	showTeamTab() {
		clearNode(SELECTOR.MAIN);
		renderTemplate(SELECTOR.MAIN, Templates.MATCHING_TEAM_SELECT_SECTION);
	}

	showManageSection(e) {
		this.#currentCourse = e.target.value;
		this.renderCourseManageSection();
		this.renderManageCrewList(this.matcher.getCrewList());
	}

	showTeamMatchingSectionDetail() {
		removeClassNodes(SELECTOR.MATCHING_SECTION);
		removeClassNodes(SELECTOR.RESULT_DETAIL);
		this.#currentCourse = $(`#${SELECTOR.COURSE_SELECT}`).value;
		this.#currentMission = $(`#${SELECTOR.MISSION_SELECT}`).value;
		renderTemplate(
			SELECTOR.MAIN,
			Templates.MATCHING_SECTION({
				course: getSelectedName($(`#${SELECTOR.COURSE_SELECT}`)),
				mission: getSelectedName($(`#${SELECTOR.MISSION_SELECT}`)),
			}),
		);
		this.renderCourseMemberList();
	}

	requestAddCrew(callbackFn) {
		callbackFn({
			position: this.#currentCourse,
			name: $(`#${SELECTOR.CREW_NAME_INPUT}`).value,
		});
	}

	requestDeleteCrew(e, callbackFn) {
		callbackFn({
			position: this.#currentCourse,
			idx: e.target.dataset.targetIndex,
		});
	}

	renderCourseManageSection() {
		removeClassNodes(SELECTOR.CREW_TAB_DETAIL);
		renderTemplate(
			SELECTOR.MAIN,
			Templates.COURSE_MANAGE_SECTION(COURSE_NAME_KR[this.#currentCourse]),
		);
	}

	renderManageCrewList(crewList) {
		clearNode(SELECTOR.CREW_TBODY);
		renderTemplate(SELECTOR.CREW_TBODY, Templates.CREW_TABLE_ITEMS(crewList[this.#currentCourse]));
	}

	renderCourseMemberList() {
		this.matcher.getPositionList(this.#currentCourse).map(name => {
			renderTemplate(SELECTOR.COURSE_MEMBER_LIST, Templates.COURSE_MEMBER_LIST_ITEM(name));
		});
	}

	renderResult() {
		removeClassNodes(SELECTOR.MATCHING_SECTION);
		removeClassNodes(SELECTOR.RESULT_DETAIL);
		renderTemplate(
			SELECTOR.MAIN,
			Templates.MATCHING_RESULT_SECTION({
				course: COURSE_NAME_KR[this.#currentCourse],
				mission: getSelectedName($(`#${SELECTOR.MISSION_SELECT}`)),
			}),
		);
	}

	renderResultTeamList(teamList) {
		$(`#${SELECTOR.TEAM_MATCH_RESULT}`).innerHTML = Templates.MATCHED_LIST(teamList);
	}

	alertErrorCode(errorCode) {
		alert(errorCode);
	}
}
