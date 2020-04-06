import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class Chart extends Component{

    state = {
        chart: [],
        editChart:[],
        modal: false
    }

    // runnning hanya sekali, setelah proses render yang pertama
    componentDidMount() {
            axios.get('http://localhost:2022/chart')
        .then((sil) => {
            let hasil = []
            hasil = sil.data.filter((data) => {
                return (
                    data.username == this.props.uname
                )
                
            })

            this.setState({ chart: hasil })
           console.log(this.state.chartUser)
                })    
                
}
    // Ambil Data
    getData = () => {
        axios.get('http://localhost:2022/chart')
        .then((sil) => {
            let hasil = []
            hasil = sil.data.filter((data) => {
                return (
                    data.username == this.props.uname
                )
                
            })

            this.setState({ chart: hasil })
           console.log(this.state.chartUser)
                })  
    }

    // button delete Cart
    deleteChart = (id) => {
        Swal.fire({
            title: 'Apakah kamu yakin?',
            text: "Kamu tidak bisa mengembalikannya lagi!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
          }).then((res) => {
            // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
            if (res.value) {
                axios.delete(`http://localhost:2022/chart/${id}`)
                .then((res) => { 

                    Swal.fire(
                        'Berhasil!',
                        'Produk di cart berhasil di hapus.',
                        'success'
                    )

                    this.getData() 
                
                })
            }
          })
    }

    editChart = (id) => { 
        this.setState({modal:true})
        axios.get(`http://localhost:2022/Chart/${id}`).then((res) => {
        this.setState({ editChart: res.data })
         })  
        }

        funSave = () =>{
            // let name = this.editName.value ? this.editName.value : this.state.editProducts.name
            // let desc = this.editDesc.value ? this.editDesc.value : this.state.editProducts.desc
            // let price = this.editPrice.value ? this.editPrice.value : this.state.editProducts.price
            // let src = this.editPicture.value ? this.editPicture.value : this.state.editProducts.src
            let qty = this.edit_qty.value ? this.edit_qty.value : this.state.editChart.qty
    
            let linkPatch = `http://localhost:2022/chart/${this.state.editChart.id}`
            let data = {qty}
            axios.patch(linkPatch, data).then((res) => {this.getData()})
            this.setState({modal:false})
    
        }

        funCancel = () =>{
            this.setState({modal:false})
    
        }

    //Render Map
    renderList = () => {
        return this.state.chart.map((product) => {

            // product.price = product.price.toLocaleString('in')

            return(
                <tr>    
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.desc}</td>
                        <td>Rp. {product.price.toLocaleString('in')}</td>
                        <td className="w-25"><img className="list" src={product.src} alt="" height="100"
                             width="100"/></td>
                        <td>{product.qty}</td>
                        <td>
                            <button type="button" onClick={() => {this.editChart(product.id)}} className="btn btn-outline-primary btn-block"> Edit </button>
                            <button type="button" onClick={() => {this.deleteChart(product.id)} } className="btn btn-outline-secondary btn-block"> Delete </button>
                        </td>
                </tr>
            )
        })   
    }

    onPayButton = () => {
        alert('Transfer Via Rek BCA: ')
    }

    totalCart = () => {
        var totalPriceChart = 0
        let renderPrice = this.state.chart.map((resProduct) => {
            let totalPrice = resProduct.price * resProduct.qty
            totalPriceChart += totalPrice

            return(
                <div className="row">
                        <div class="card-body">
                            <h5 class="card-title">{resProduct.name}</h5>
                            <p class="card-text">Rp. {resProduct.price.toLocaleString('in')} x {resProduct.qty} = Rp. {totalPrice.toLocaleString('in')}</p>
                    </div>
                 </div>
            
            )
        }) 
        
        return(
        <div className="row">
            <div className="col-sm-6">
                {renderPrice}
            </div>
            <div class="col-sm-6">
                <div class="card">
                <div class="card-body text-center">
                    <h5 class="card-title">Total Belanjaan Anda:</h5>
                    <h4 className="text-danger">Rp. {totalPriceChart.toLocaleString('in')}</h4>
                    <button type="button" className="btn btn-outline-primary btn-block w-50 mt-5 mx-auto" onClick={this.onPayButton}>Check Out</button>
                </div>
                </div>
            </div>
        </div>
        )

    }

    render() {
        if(!this.props.uname == ""){
            return(        
                <div className="container-fluid">
                {/* List Product */}
                <div ClassName="row">
                <div className="col-6">
                <div className="card">
                <h1 className="text-center display-4">Cart</h1>
                <div className="card-body">
                
                <table className="table table-hover text-center mb-5">
                    <thead>
                        <tr>
                        <th scope="col">NO</th>
                        <th scope="col">NAME</th>
                        <th scope="col">DESC</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">PICTURE</th>
                        <th scope="col">QUANTITY</th>
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
                {/* Total Belanja */}
                <div className="col-6">
                
                        <div className="card">

                            <div className=" border-bottom border-secondary card-title">
                                <h1 className="text-center">Total Cart</h1>
                            </div>
                            <div className="card-body">

                            <div className="card-body">
                                {this.totalCart()}
                            </div>
                            </div>
                            </div>
                        
                    
                </div>
                </div>
                <Modal isOpen={this.state.modal}>
                <ModalHeader>Edit Qty</ModalHeader>
                <ModalBody>
                <label>QTY</label>
                <input ref={(input) => {this.edit_qty = input}} className="form-control" type="text" placeholder={this.state.editChart.qty}/>
                </ModalBody>
                <ModalFooter>
                <Button onClick={this.funSave} color="primary">Save</Button>
                <Button onClick={this.funCancel}color="secondary">Cancel</Button>
                </ModalFooter>
            </Modal>
              
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