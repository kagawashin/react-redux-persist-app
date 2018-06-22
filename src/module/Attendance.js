import { 
    REQ_ATTEND,
    RES_ATTEND,
} from "./actionTypes";

import {
    authFetch,
} from './fetch'

export const reqAttend = (data) => {
    return {
        type: REQ_ATTEND,
        payload: { payload: data },
    }
}

export const fetchAttend = (data) => {
   return authFetch('/exb/attend', data) 
}

export const resAttend = (data) => {
    return {
        type: RES_ATTEND,
        payload: data,
    }
}