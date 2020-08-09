import React, { Component } from 'react'
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux'
// Import action creator
import {onLoginUser} from '../actions/index'
// Akan me-redirect ke alamat tertentu
import {Redirect} from 'react-router-dom'

class CreateStory extends Component{

    state = {
        
    }

    onButtonClick = () => {
        let judul = this.judul.value
        let konten = this.konten.value

        let data = {judul, konten}

        axios.post('http://localhost:2022/cerita', data).then((res) => {
            console.log(res.data)
        })
    }
    
   
    render(){
        if(!(this.props.uname == "")){
        return (
            <div className="real-card mt-5">
                 <div className="row">
                     <div className="col-11 mx-auto">
                     <form>
                     <div className="form-group row">
    <label for="staticEmail" className="col-sm-2 col-form-label">Judul</label>
    
    <div className="col-sm-5">
    <input ref={(input) => {this.judul = input}} type="text" className="form-control" />
    </div>
    </div>
  <div className="form-group">
    <label>Cerita</label>
    <textarea ref={(input) => {this.konten = input}} className="form-control"  rows="3"></textarea>
  </div>
  <button onClick={this.onButtonClick} className="btn btn-primary">post</button>
</form>
                     </div>
                 </div>
            </div>
           
        )}else{
            return <Redirect to="/login"/>
        }

    }
}

let mapStateToProps = (state) => {
    return {
        uname: state.auth.username
    }
}


export default connect(mapStateToProps,null)(CreateStory)
