import { connect } from 'react-redux'

import App from '../App'
import { setTitle } from '../module/App'

const mapStateToProps = state => {
    return {
        foo: state.App.var,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTitle: title => dispatch(setTitle(title)),
    }
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default ConnectedApp