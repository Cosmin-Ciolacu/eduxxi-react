import * as actionTypes from "./actions/actions";

const initialState = {
    user: {
        token: null,
        accountType: null
    },
    courses: [],
    selectedCourse: {title: '', description: '', lessons:[]},
    homeworks: [],
    selectedHomework: {},
    professor_homeworks: [],
    professor_courses: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER: return { ...state, user : {token: action.token, accountType: action.account} };
        case actionTypes.GET_COURSES_SUCCESS: return { ...state, courses : action.courses };
        case actionTypes.GET_COURSES_FAVORITE_SUCCESS: return { ...state, courses : action.courses };
        case actionTypes.GET_HOMEWORKS_SUCCESS: return { ...state, homeworks : action.homeworks };
        case actionTypes.GET_COURSE_SUCCESS: return { ...state, selectedCourse : {...state.selectedCourse, lessons: action.course} };
        case actionTypes.SET_SELECTED_COURSE: return { ...state, selectedCourse : {...state.selectedCourse, title: action.title, description: action.description} };
        case actionTypes.SET_SELECTED_HOMEWORK: return { ...state, selectedHomework : action.homework};
        case actionTypes.GET_PROFESSOR_HOMEWORKS_SUCCESS: return { ...state, professor_homeworks : action.homeworks};
        case actionTypes.GET_PROFESSOR_COURSES_SUCCESS: return { ...state, professor_courses : action.courses};
        default:
            return state;
    }
};

export default reducer;