import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
// Import action creator
// import {onLoginUser} from '../actions/index'
// Akan me-redirect ke alamat tertentu
import {Redirect} from 'react-router-dom'

class ViewStory extends Component {

    state = {
        viewStory : []
    }


    componentDidMount() {
        axios.get(`http://localhost:2022/cerita/${this.props.match.params.idPrdct}`)
        .then((res) => {
           
            this.setState({ viewStory: res.data })
        })

           
                
}


    render() {
        return (
        <div className="bg-i bg-image">
           <div className="container-fluid">
               <div className="row">
                   <div className="col-11 mt-2 mx-auto">
                   <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">{this.state.viewStory.judul}</h1>
              <p className="card-text">{this.state.viewStory.konten}.</p>            
            </div>
                   </div>
                   </div>
               </div>
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

export default connect(mapStateToProps,null)(ViewStory)