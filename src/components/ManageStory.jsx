import React, { Component } from 'react'
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux'
// Import action creator
import {onLoginUser} from '../actions/index'
// Akan me-redirect ke alamat tertentu
import {Redirect} from 'react-router-dom'

class ManageStory extends Component{

    state = {
        cerita: [],
        
    }

    
    getData = () =>{
        axios.get(
            'http://localhost:2022/cerita'
        ).then((res) => {
            this.setState({ cerita: res.data })
        })

    } 

    // 2
    componentDidMount(){
        axios.get(
            'http://localhost:2022/cerita'
        ).then((res) => {
            this.setState({ cerita: res.data })
        })
    }

    renderList = () => {
        return this.state.cerita.map((story) => {
            return (
                <tr className="table-danger">
                <td>
                    {story.id}
                </td>
                <td>
                    {story.judul}
                </td>
                <td>
                    {story.date}
                </td>
                <td>
                    {story.username}
                </td>
                <td>
                    <button onClick={() => {this.funedit(story.id)}} className="btn btn-outline-secondary mb-2 px-4 btn-block">edit</button>
                    <button onClick={() => {this.onButtonDelete(story.id)}} className="btn btn-outline-danger btn-block">delete</button>
                </td>
            </tr>
        )
        })

        
    }

    render(){
        if(!(this.props.uname == "")){
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                    <h1 className="text-center display-4">Manage Story</h1>
                <table class="table table-hover text-center mb-5">
                    <thead>
                    <tr className="table-danger">
                        <th scope="col">ID</th>
                        <th scope="col">JUDUL</th>
                        <th scope="col">DATE</th>
                        <th scope="col">AUTHOR</th>
                        <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>
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


export default connect(mapStateToProps,null)(ManageStory)