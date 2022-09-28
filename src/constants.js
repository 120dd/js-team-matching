export const SELECTOR = {
	APP: 'app',
	MAIN: 'main',
	CREW_TAB: 'crew-tab',
	TEAM_TAB: 'team-tab',
	MATCHING_SECTION: 'matching-section',
	CREW_TAB_DETAIL: 'crew-tab-detail',
	CREW_TBODY: 'crew-tbody',
	FRONTEND_COURSE_INPUT: 'frontend-course',
	BACKEND_COURSE_INPUT: 'backend-course',
	CREW_NAME_INPUT: 'crew-name-input',
	ADD_CREW_BUTTON: 'add-crew-button',
	DELETE_CREW_BUTTON: 'delete-crew-button',
	COURSE_SELECT: 'course-select',
	MISSION_SELECT: 'mission-select',
	COURSE_MEMBER_LIST: 'course-member-list',
	SHOW_TEAM_MATCHER_BUTTON: 'show-team-matcher-button',
	TEAM_MEMBER_COUNT_INPUT: 'team-member-count-input',
	MATCH_TEAM_BUTTON: 'match-team-button',
	TEAM_MATCH_RESULT: 'team-match-result',
	RESULT_DETAIL: 'result-detail',
	REMATCH_TEAM_BUTTON: 'rematch-team-button',
};

export const COURSE_NAME_KR = {
	frontend: '프론트엔드',
	backend: '백엔드',
};

export const ERROR_CODE = {
	EMPTY_INPUT: '값을 입력해주세요',
	STRING_NUM_OVER: '이름은 5글자 이하만 가능합니다',
	DUPLICATED_NAME: '중복된 이름은 불가능합니다',
	NOT_ENOUGH_CREW: `매칭을 위해선 2명 이상의 크루원이 필요합니다`,
	TO_BIG_NUMBER: maxNum => `최대 가능한 숫자는 ${maxNum}입니다`,
	CREW_SHOULD_MORE_THEN_ONE: '매칭 인원은 1명을 이상만 가능합니다',
};
