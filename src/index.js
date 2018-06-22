import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import myStore, { persistor } from './module/reducers'
import { PersistGate } from 'redux-persist/integration/react'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'

import App from './container/App'

import SessionLoading from './component/SessionLoading'

import './index.css';
import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme({
    typography: {
        fontFamily: "'Noto Sans Japanese', sans-serif",
    },
})

ReactDOM.render(
    <Provider store={myStore} >
        <PersistGate loading={<SessionLoading />} persistor={persistor} >
            <MuiThemeProvider theme={theme} >
                <App />
            </MuiThemeProvider>
        </PersistGate>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();


