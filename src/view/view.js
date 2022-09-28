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
		$('header').addEventListener('click', e => {
			e.preventDefault();
			if (e.target.id === SELECTOR.CREW_TAB) {
				return this.showCrewTab();
			}
			if (e.target.id === SELECTOR.TEAM_TAB) {
				return this.showTeamTab();
			}
		});
	}

	registerManageTabClickEventListener({ addFn, deleteFn }) {
		$(SELECTOR.MAIN).addEventListener('click', e => {
			if (
				e.target.id === SELECTOR.FRONTEND_COURSE_INPUT ||
				e.target.id === SELECTOR.BACKEND_COURSE_INPUT
			) {
				return this.showManageSection(e);
			}
			if (e.target.id === SELECTOR.ADD_CREW_BUTTON) {
				return this.requestAddCrew(addFn);
			}
			if (e.target.className === SELECTOR.DELETE_CREW_BUTTON) {
				return this.requestDeleteCrew(e, deleteFn);
			}
		});
	}

	registerTeamTabClickEventListener({ matchingFn }) {
		$(SELECTOR.MAIN).addEventListener('click', e => {
			e.preventDefault();
			if (
				e.target.id === SELECTOR.SHOW_TEAM_MATCHER_BUTTON ||
				e.target.id === SELECTOR.REMATCH_TEAM_BUTTON
			) {
				this.showTeamMatchingSectionDetail();
				return;
			}
			if (e.target.id === SELECTOR.MATCH_TEAM_BUTTON) {
				const minNum = $(`#${SELECTOR.TEAM_MEMBER_COUNT_INPUT}`).value;
				matchingFn({ position: this.#currentCourse, minNum });
				return;
			}
			if (e.target.id === SELECTOR.REMATCH_TEAM_BUTTON) {
				this.showTeamMatchingSectionDetail();
			}
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
