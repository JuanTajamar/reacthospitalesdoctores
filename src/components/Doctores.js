import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios';
import DetallesDoctor from './DetallesDoctor';

export default class Doctores extends Component {
    url = Global.apiDoctores;

    state = {
        docotores: [],
        idDoctor: -1
    }

    loadDoctores = () => {
        let request = "api/Doctores/DoctoresHospital/" + this.props.idhospital
        axios.get(this.url + request).then(response => {
            this.setState({
                docotores: response.data
            })
        })
    }

    componentDidUpdate = (oldProps) => {
        if(oldProps.idhospital != this.props.idhospital) {
            this.loadDoctores();
            this.setState({
                idDoctor: -1
            })
        }
    }  

    componentDidMount = () => {
        this.loadDoctores()
    }

  render() {
    return (
      <div className='ms-5 align-items-center'>
        {
            this.state.idDoctor != -1 &&
            <DetallesDoctor iddoctor={this.state.idDoctor}/>
        }
            <table className='table table-bordered border-danger text-center align-middle table-striped-columns table-primary w-50 h-50 rounded-3'>
                <thead>
                    <tr>
                        <th>Apellidos</th>
                        <th>Especialidad</th>
                        <th>Salario</th>
                        <th>Id Hospital</th>
                        <th>Detalles</th>
                    </tr>
                </thead> 
                <tbody>
                    {
                        this.state.docotores.map((doctor,index) => {
                            return(
                                <tr key={index}>
                                    <td>{doctor.apellido}</td>
                                    <td>{doctor.especialidad}</td>
                                    <td>{doctor.salario}</td>
                                    <td>{doctor.idHospital}</td>
                                    <td><button onClick={() => {
                                        this.setState({
                                            idDoctor:doctor.idDoctor
                                        })
                                    }}>Detalles</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
      </div>
    )
  }
}
