import { ERROR_CODE } from './constants.js';

export function validateName(input, list) {
	const pattern = /\s/g;
	const result = {
		status: true,
		errorCode: '',
	};
	if (!input || input.match(pattern)) {
		result.errorCode = ERROR_CODE.EMPTY_INPUT;
		return result;
	}
	if (input.length > 5) {
		result.errorCode = ERROR_CODE.STRING_NUM_OVER;
		return result;
	}
	if (list.includes(input)) {
		result.errorCode = ERROR_CODE.DUPLICATED_NAME;
		return result;
	}
	result.status = false;
	return result;
}

export function validateInvalidNum({ num, maxNum }) {
	const result = {
		status: true,
		errorCode: '',
	};
	if (maxNum < 1) {
		result.errorCode = ERROR_CODE.NOT_ENOUGH_CREW;
		return result;
	}
	if (Number(num) > maxNum) {
		result.errorCode = ERROR_CODE.TO_BIG_NUMBER(maxNum);
		return result;
	}
	if (Number(num) < 1) {
		result.errorCode = ERROR_CODE.CREW_SHOULD_MORE_THEN_ONE;
		return result;
	}
	result.status = false;
	return result;
}
