import { BOOKMARK, COMMENTARY, LANGUAGE, LASTREAD, SPEECH_PITCH, SPEECH_RATE, TRANSLATION } from "./action";

const initialState = {
    language: "English",
    translation: { author: 'Swami Adidevananda', language: 'english' },
    commentary: { author: 'Swami Sivananda', language: 'english' },
    bookmark: {},
    lastread: "",
    pitch: 1.0,
    rate: 0.5,
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
        case SPEECH_PITCH:
            return { ...state, pitch: action.payload }
        case SPEECH_RATE:
            return { ...state, rate: action.payload }
        default:
            return state;
    }
};