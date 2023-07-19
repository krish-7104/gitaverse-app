import { BOOKMARK, LASTREAD } from "./action";
import { LANGUAGE } from "./action";
import { COMMENTARY } from "./action";
import { TRANSLATION } from "./action";

export const setLanguageHandler = (data) => ({
    type: LANGUAGE,
    payload: data
})

export const setTranslationhandler = (data) => ({
    type: TRANSLATION,
    payload: data
})

export const setCommentaryhandler = (data) => ({
    type: COMMENTARY,
    payload: data
})

export const setBookmarkHandler = (data) => ({
    type: BOOKMARK,
    payload: data
})

export const setLastReadHandler = (data) => ({
    type: LASTREAD,
    payload: data
})

