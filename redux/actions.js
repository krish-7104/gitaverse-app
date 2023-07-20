import { BOOKMARK, LASTREAD, SPEECH_PITCH, SPEECH_RATE } from "./action";
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

export const setSpeechPitchHandler = (data) => ({
    type: SPEECH_PITCH,
    payload: data
})

export const setSpeechRateHandler = (data) => ({
    type: SPEECH_RATE,
    payload: data
})
