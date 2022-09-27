import { store } from '../store/store.js';

export class Matcer {
	#crewList;

	constructor() {
		if (Matcer.instance) {
			return Matcer.instance;
		}
		Matcer.instance = this;
		this.#crewList = {
			frontend: [],
			backend: [],
		};
		if (store.getLocalStorage('crewList')) {
			this.#crewList = store.getLocalStorage('crewList');
		}
		this.matchedList = [];
	}

	getPositionList(position) {
		return this.#crewList[position];
	}

	getCrewList() {
		return this.#crewList;
	}

	setCrew = ({ position, name }) => {
		this.#crewList[position].push(name);
		store.setLocalStorage('crewList', this.#crewList);
	};

	deleteCrew = ({ position, idx }) => {
		this.#crewList[position].splice(idx, 1);
		store.setLocalStorage('crewList', this.#crewList);
	};

	getShuffleList = position => {
		this.matchedList = [];
		const positionLength = this.#crewList[position].length;
		const randomIdxs = [];
		for (let i = 0; i < positionLength; i++) {
			randomIdxs.push(i);
		}
		return MissionUtils.Random.shuffle(randomIdxs);
	};

	matchingTeam = ({ position, minNum }) => {
		const shuffleList = this.getShuffleList(position);
		const teamNumber = Math.floor(this.#crewList[position].length / minNum);
		for (let i = 0; i < teamNumber; i++) {
			this.matchedList.push([]);
		}
		shuffleList.forEach((v, idx) => {
			const pushedIdx = idx % teamNumber;
			this.matchedList[pushedIdx].push(this.#crewList[position][v]);
		});
		return this.matchedList;
	};
}
