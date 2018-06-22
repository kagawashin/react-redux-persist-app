import {
    SET_TITLE,
} from './actionTypes'

//-- action creator
export const setTitle = title => {
    return {
        type: SET_TITLE,
        title: title,
    }
}


//-- reducer
export const defaultState = {
    title: "",
}

export default function (state=defaultState, action) {
    switch (action.type) {
        case SET_TITLE: 
            return Object.assign({}, state, {
                title: action.title,
            })
        default:
            return state
    }
}


