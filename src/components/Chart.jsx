import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
// Import action creator
import {onLoginUser} from '../actions/index'
// Akan me-redirect ke alamat tertentu
import {Redirect} from 'react-router-dom'

class Chart extends Component{

    state = {
        chart : [],
        chartUser : []
        
    }

    componentDidMount(){
        
        axios.get(
            'http://localhost:2022/chart'
        ).then((res) => {
           
           

           let hasil = res.data.filter((obj) => {
                return (obj.username == this.props.uname)
            })
            this.setState({ chart : hasil })
            console.log(hasil)
            console.log(this.state.chart)
        })

        
    }

    renderlist = () => {
        let no = 1
        return this.state.chart.map((obj) =>{
            return(
                <tr>
                <td>
                    {no ++}
                </td>
                <td>
                <img
                className="card ml-3 mx-auto"
                src={obj.src}
                height="100"
                width="100"
                />
                </td>
                <td >
                    {obj.name}
                </td>
                <td>
                    {obj.desc}
                </td>
                <td>
                    {obj.price}
                </td>
                <td>
                    {obj.qty}
                </td>
                <td>
                    <button onClick={() => {this.funedit(obj.id)}} className="btn btn-outline-secondary mb-2 px-4 btn-block">edit</button>
                    <button onClick={() => {this.onButtonDelete(obj.id)}} className="btn btn-outline-danger btn-block">delete</button>
                </td>
            </tr>
            )
        })
    }

    render() {
        if(!this.props.uname == ""){
            return(        
                <div className="container">
                    {/* List Product */}
                    <h1 className="text-center display-4">Chart</h1>
                    <table className="table table-hover text-center mb-5">
                        <thead>
                            <tr>
                            <th scope="col">NO</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">QTY</th>
                            <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.renderlist()}
                        </tbody>
                    </table>
                    </div>
                )
        }else{
            return <Redirect to="/"/>
        }
        }
        

}

let mapStateToProps = (state) => {
    return {
        uname: state.auth.username
    }
}

export default connect(mapStateToProps,null)(Chart)