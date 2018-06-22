import { take, takeEvery, put, call, fork, race } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import {
    REQ_ATTEND,
    FETCH_TIMEOUT,
} from './actionTypes'

import {
    FETCH_ERROR,
} from '../config/error'

import {
    FETCH_TIMEOUT_SEC
} from '../config/setting'

import {
    fetchAttend,
    resAttend,
} from './Attendance'

function* runReq(fetchAC, resAC, action) {
    try {
        const { res, timeout } = yield race({
            res: call(fetchAC, action.payload),
            timeout: call(delay, FETCH_TIMEOUT_SEC)
        })
        if ( timeout ) {
            yield put({ type: FETCH_TIMEOUT })
        }
        const { payload, error } = res
        if ( !payload || error ) {
            //! 各種エラーチェック

            console.log("unknown error")
            console.log(payload, error)
        } else {
            //-- リクエスト成功
            yield put(resAC(payload, action))
        }
    } catch (err) {
        console.log(err)
        yield put({ type: FETCH_ERROR })
    }
}

function* handleReqAttend () {
    yield takeEvery(REQ_ATTEND, runReq, fetchAttend, resAttend)
}

export default function* rootSaga() {
    yield fork(handleReqAttend)
}