import React, { Component } from 'react'
import axios from 'axios'
// import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'

class Home extends Component {

    state = {
        cerita : []
        
    }

componentDidMount = () => {
    
        axios.get('http://localhost:2022/cerita')
        .then((res) => {
           
            this.setState({ cerita: res.data })
        })

           
                

}

funView = (id) => {
    this.setState({toggle :true})
    axios.get(`http://localhost:2022/cerita/${id}`)
    .then((res) => {
       
        this.setState({ oneCerita: res.data })
        console.log(res.data)
})
}

funCancel = () => {
    this.setState({toggle:false})
}

rendercerita = () => {
    return this.state.cerita.map((story) =>{
        return(
            <div className="card mt-2">
            <div className="card-body">
              <h5 className="card-title">{story.judul}</h5>
              <p className="card-text">{story.sinopsis}.</p>
              <Link to={`/viewStory/${story.id}`}>
                    <button className="btn btn-outline-light"><i>View</i></button>    
              </Link>   
            </div>
          </div>
        )

    })
 }


    render() {
        return (
            <div className="bg bg-image">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                    <div class="card mt-2">
                        <div class="card-header">
                            Featured
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Cras justo odio</li>
                            <li class="list-group-item">Dapibus ac facilisis in</li>
                            <li class="list-group-item">Vestibulum at eros</li>
                        </ul>
                        </div>
                    </div>
                    <div className="col-8">
                    
                    {this.rendercerita()}
            
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


export default connect(mapStateToProps,null)(Home)