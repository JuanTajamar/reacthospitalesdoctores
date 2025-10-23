import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global'

export default class CreateHospital extends Component {
    url = Global.apiHospitales;
    cajaId = React.createRef();
    cajaNombre = React.createRef();
    cajaDireccion = React.createRef();
    cajaTelefono = React.createRef();
    cajaCamas = React.createRef();

    state = {
        mensaje: ""
    }
    insertHospital = (event) => {
        event.preventDefault()
        let request = "webresources/hospitales/post";

        // Debemos respetar los tipos de datos del JSON
        let id = parseInt(this.cajaId.current.value);
        let camas = parseInt(this.cajaCamas.current.value);

        // El objeto JSON de React debe respetar mayusculas/minusculas y el nombre de las propiedades igual que el servicio
        let hospital = {
            idhospital: id,
            nombre: this.cajaNombre.current.value,
            direccion: this.cajaDireccion.current.value,
            telefono: this.cajaTelefono.current.value,
            camas: camas
        }
        axios.post(this.url + request, hospital).then(response => {
            this.setState({
                mensaje: "Hospital insertado: " + hospital.nombre
            })
        })
    }

  render() {
    return (
      <div className='bg-danger'>
        <h1 className='d-flex justify-content-center mt-3 text-bg-warning'>Crear Hospital</h1>
        <h3 className='text-success'>{this.state.mensaje}</h3>
        <div className='d-flex justify-content-center '>
        <form className='w-50 h-50 ms-5'>
            <label className='form form-label mt-3'>ID: </label>
            <input className='form form-control' ref={this.cajaId}/>
            <label className='form form-label mt-3'>Nombre: </label>
            <input className='form form-control' ref={this.cajaNombre}/>
            <label className='form form-label mt-3'>Dirección: </label>
            <input className='form form-control' ref={this.cajaDireccion}/>
            <label className='form form-label mt-3'>Telefono: </label>
            <input className='form form-control' ref={this.cajaTelefono}/>
            <label className='form form-label mt-3'>Camas: </label>
            <input className='form form-control' ref={this.cajaCamas}/>
            <button className='btn btn-primary mt-3 me-5 w-25' onClick={this.insertHospital}>Crear</button>
        </form>
        </div>
      </div>
    )
  }
}
