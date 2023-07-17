import { DARK_MODE } from "./action";

export const setDarkModeHandler = (data) => ({
    type: DARK_MODE,
    payload: data
})