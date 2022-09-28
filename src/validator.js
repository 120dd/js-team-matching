import { ERROR_CODE } from './constants.js';

export function validateName(input, list) {
	const pattern = /\s/g;
	if (!input || input.match(pattern)) {
		return { status: true, errorCode: ERROR_CODE.EMPTY_INPUT };
	}
	if (input.length > 5) {
		return { status: true, errorCode: ERROR_CODE.STRING_NUM_OVER };
	}
	if (list.includes(input)) {
		return { status: true, errorCode: ERROR_CODE.DUPLICATED_NAME };
	}
	return { status: false };
}

export function isInvalidNum({ num, maxNum }) {
	if (maxNum < 1) {
		return { status: true, errorCode: ERROR_CODE.NOT_ENOUGH_CREW };
	}
	if (Number(num) > maxNum) {
		return { status: true, errorCode: ERROR_CODE.TO_BIG_NUMBER(maxNum) };
	}
	if (Number(num) < 1) {
		return { status: true, errorCode: ERROR_CODE.CREW_SHOULD_MORE_THEN_ONE };
	}
	return { status: false };
}
