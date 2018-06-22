import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { persistReducer, persistStore, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import immutableTransform from 'redux-persist-transform-immutable'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import history from '../wrapper/history'
import rootSaga from '../module/sagas'
import App from './App'



//-- Reducer 全体の persistConfig (永続化設定)
const persistConfig = {
    transforms: [immutableTransform()],
    key: "ExbReduxStore",
    storage,
    blacklist: [
        // immutable.js とそうでないものが交じる場合はここに列挙
     ],
}

//-- immutable.js とそうでないものが交じるストア管理
const appConfig = {
    key: 'App',
    storage: storage,
    blacklist: [ '' ], // ここにimmutable.jsでないものを列挙
    transforms: [immutableTransform()],
}

//-- Combine reducer
const myReducer = combineReducers({
    App: persistReducer(appConfig, App),
})

const persistedReducer = persistReducer(persistConfig, myReducer)

// react-router-redux Middleware 生成
const rtMiddleware = routerMiddleware(history)

// redux-saga Middleware 生成
const sagaMiddleware = createSagaMiddleware()

// Redux Store 生成
const myStore = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        rtMiddleware,
        sagaMiddleware
    )
)

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(myStore)
export default myStore
