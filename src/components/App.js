import React, { Component } from 'react'
import {Route, BrowserRouter} from 'react-router-dom'


// Components
import Header from './Header'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import ViewStory from './ViewStory'
import ManageStory from './ManageStory'
import CreateStory from './CreateStory'
import Albums from './Albums'


// Keeplogin
import {onLoginUser} from '../actions/index'
import {connect} from 'react-redux'

class App extends Component{


    componentDidMount(){
        let userData = localStorage.getItem('userData')
        let user = JSON.parse(userData)

        if(user){
            this.props.onLoginUser(user)
        }
    }

    render(){
        return(
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component={Home} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/viewStory/:idPrdct" component={ViewStory} />
                    <Route path="/ManageStory" component={ManageStory} />
                    <Route path="/CreateStory" component={CreateStory} />
                    <Route path="/Albums" component={Albums} />
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null, {onLoginUser})(App)