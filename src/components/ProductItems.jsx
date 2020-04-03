import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
// Import action creator
import {onLoginUser} from '../actions/index'
// Akan me-redirect ke alamat tertentu
import {Redirect} from 'react-router-dom'
import Swal from 'sweetalert2'

class ProductItems extends Component {

    addToChart = (id) => {
        
        
        if(this.props.uname == ""){
            Swal.fire(
                '',
                'Silakan login terlebih dahulu',
                ''
              )
        }else if(!this.qty.value == ""){
            
            Swal.fire('','berhasil di tambahkan','')
        axios.get(`http://localhost:2022/products/${id}`)
        .then((res) => {
            console.log(this.qty.value)
            let username = this.props.uname
            let name = res.data.name
            let desc = res.data.desc
            let price = res.data.price
            let src = res.data.src
            let qty = this.qty.value

            

            let val = {username, name, desc, price, src, qty}
            axios.post('http://localhost:2022/chart',val).then(() => {
                this.qty.value = ""
                axios.get('http://localhost:2022/chart')
        .then((sil) => {
            let hasil = []
            hasil = sil.data.filter((data) => {
                return (
                    data.username == this.props.uname
                )
            })

            this.setState({ chartUser: hasil })
        //    console.log(this.state.chartUser)
        //    console.log(this.props.chartUser)
                })    
                
            })
        })}
        else{
            Swal.fire('','masukkan qty yang ingin kamu beli','')
        }

    }

   render() {
      return (
         <div key={this.props.product.id} className="card col-lg-5 col-xl-3 mx-auto mx-xl-4 my-3">
            <img className="card-img-top" src={this.props.product.src} alt=""/>
            <div className="card-body">
               <div  style={{height: 50}}>
                     <h5 className="card-title">{this.props.product.name}</h5>
               </div>
               <p className="card-text">{this.props.product.desc}</p>
               <p className="card-text">Rp. {this.props.product.price}</p>
               <input ref={( input ) => { this.qty = input }} className="form-control" type="text" placeholder="Jumlah Qty"/>
               <Link to={`/detailproduct/${this.props.product.id}`}>
                     <button className="btn btn-secondary btn-block my-2">Detail</button>
               </Link>
               <button onClick={() => {this.addToChart(this.props.product.id)}} className="btn btn-primary btn-block">Add to Cart</button>
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


export default connect(mapStateToProps,null)(ProductItems)