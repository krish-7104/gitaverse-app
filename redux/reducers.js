import { BOOKMARK, COMMENTARY, LANGUAGE, LASTREAD, TRANSLATION } from "./action";

const initialState = {
    language: "English",
    translation: { author: "adi", type: "et" },
    commentary: { author: "siva", type: "ec" },
    bookmark: {},
    lastread: {}
}

export const Reducers = (state = initialState, action) => {
    switch (action.type) {
        case LANGUAGE:
            return { ...state, language: action.payload }
        case TRANSLATION:
            return { ...state, translation: action.payload }
        case COMMENTARY:
            return { ...state, commentary: action.payload }
        case BOOKMARK:
            return { ...state, bookmark: action.payload }
        case LASTREAD:
            return { ...state, lastread: action.payload }
        default:
            return state;
    }
};