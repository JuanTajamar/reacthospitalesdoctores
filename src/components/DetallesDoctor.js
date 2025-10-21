import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios'

export default class DetallesDoctor extends Component {
    url = Global.apiDoctores
    state = {
        doctor: null
    }

    findDoctor = () => {
        let request = "api/doctores/" + this.props.iddoctor
        axios.get(this.url + request).then(response => {
            this.setState({
                doctor: response.data
            })
        })
    }

    componentDidUpdate = (oldProps) => {
        if(oldProps.iddoctor != this.props.iddoctor){
            this.findDoctor();
        }
    }

    componentDidMount = () => {
        this.findDoctor();
    }
  render() {
    return (
        <div>
        <h1>Detalles de doctor</h1>
        {
            this.state.doctor && (
            <ul className='list-group mb-5 w-50 h-50 text-center list-group-item-success'>
                <li className='list-group-item'>Apellido: {this.state.doctor.apellido}</li>
                <li className='list-group-item'>Especialidad: {this.state.doctor.especialidad}</li>
                <li className='list-group-item'>Salario: {this.state.doctor.salario}</li>
                <li className='list-group-item'>Id Hospital: {this.state.doctor.idHospital}</li>
            </ul> 
        )
        }
    </div>
    )
  }
}
