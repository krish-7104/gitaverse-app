
const initialState = {
    language: "English",
    translation: { author: 'Swami Adidevananda', type: 'English', id: 3 },
    commentary: { author: 'Swami Sivananda', type: 'English', id: 16 },
    bookmark: {},
    lastread: "",
    pitch: 1.0,
    rate: 0.5,
}

export const Reducers = (state = initialState, action) => {
    switch (action.type) {
        case "LANGUAGE":
            return { ...state, language: action.payload }
        case "TRANSLATION":
            return { ...state, translation: action.payload }
        case "COMMENTARY":
            return { ...state, commentary: action.payload }
        case "BOOKMARK":
            return { ...state, bookmark: action.payload }
        case "LASTREAD":
            return { ...state, lastread: action.payload }
        default:
            return state;
    }
};