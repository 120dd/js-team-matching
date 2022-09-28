import { Matcer } from './model/matcer.js';
import { validateName, isInvalidNum } from './validator.js';
import View from './view/view.js';

export class MatcherHandler {
	constructor() {
		this.matcher = new Matcer();
		this.view = new View();
		this.view.registerManageTabClickEventListener({
			addFn: this.requestSetCrew,
			deleteFn: this.requestDeleteCrew,
		});
		this.view.registerTeamTabClickEventListener({
			matchingFn: this.requestMatching,
		});
	}

	requestMatching = ({ position, minNum }) => {
		const maxNum = Math.floor(this.matcher.getPositionList(position).length / 2);
		const validateResult = isInvalidNum({ num: minNum, maxNum });
		if (validateResult.status) {
			this.view.alertErrorCode(validateResult.errorCode);
			return;
		}
		const teamList = this.matcher.matchingTeam({ position, minNum });
		this.view.renderResult();
		this.view.renderResultTeamList(teamList);
	};

	requestSetCrew = crewInfo => {
		const validResult = validateName(
			crewInfo.name,
			this.matcher.getPositionList(crewInfo.position),
		);
		if (validResult.status) {
			this.view.alertErrorCode(validResult.errorCode);
			return;
		}
		this.matcher.setCrew(crewInfo);
		this.view.renderManageCrewList(this.matcher.getCrewList());
	};

	requestDeleteCrew = crewInfo => {
		this.matcher.deleteCrew(crewInfo);
		this.view.renderManageCrewList(this.matcher.getCrewList());
	};
}
