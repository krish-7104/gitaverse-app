import { DARK_MODE } from "./action";

export const Reducers = (state = [], action) => {
    switch (action.type) {
        case DARK_MODE:
            return action.payload;
        default:
            return state;
    }
};