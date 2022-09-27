export function isEmpty(input) {
	const pattern = /\s/g;
	if (!input || input.match(pattern)) {
		alert('값을 입력해주세요');
		return true;
	}
	return false;
}

export function isDuplicate(target, list) {
	if (list.includes(target)) {
		alert('중복된 이름은 불가능합니다');
		return true;
	}
	return false;
}

export function isInvalidNum({ num, maxNum }) {
	if (Number(num) > maxNum) {
		alert(`최대 가능한 숫자는 ${maxNum}입니다`);
		return true;
	}
	if (Number(num) < 1) {
		alert('매칭 인원은 1명을 이상만 가능합니다');
		return true;
	}
	return false;
}
