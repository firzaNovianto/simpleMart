import React, { Component } from 'react'
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux'
// Import action creator
import {onLoginUser} from '../actions/index'
// Akan me-redirect ke alamat tertentu
import {Redirect} from 'react-router-dom'

class Albums extends Component{

state = {
    albums:[]
}

componentDidMount(){
        
        axios.get(
            'http://localhost:2022/albums'
        ).then((res) => {
            this.setState({ albums: res.data })
            console.log(res.data)
            
        })

}

renderList = () => {
    return this.state.albums.map((image) =>{
        return(
            <div className="realCard">
            <img src={image.photo}/>
          </div>
        )
    })
}

render(){
    return(
        <div>
        <div class="card-columns mt-2">
        {this.renderList()}
      </div>
        </div>
        
    )

}

}
    let mapStateToProps = (state) => {
        return {
            uname: state.auth.username
        }
    }
    
    
    export default connect(mapStateToProps,null)(Albums)