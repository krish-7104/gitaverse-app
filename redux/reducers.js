import { BOOKMARK, COMMENTARY, DARK_MODE, LANGUAGE, TRANSLATION } from "./action";

const initialState = {
    darkmode: false,
    language: "English",
    translation: { author: "siva", type: "et" },
    commentary: { author: "chinmay", type: "hc" },
    bookmark: []
}

export const Reducers = (state = initialState, action) => {
    switch (action.type) {
        case DARK_MODE:
            return { ...state, darkmode: action.payload }
        case LANGUAGE:
            return { ...state, language: action.payload }
        case TRANSLATION:
            return { ...state, translation: action.payload }
        case COMMENTARY:
            return { ...state, commentary: action.payload }
        case BOOKMARK:
            return { ...state, bookmark: action.payload }
        default:
            return state;
    }
};