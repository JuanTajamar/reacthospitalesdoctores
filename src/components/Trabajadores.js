import React, { Component } from 'react'
import Global from '../Global.js'
import axios from 'axios'
export default class Trabajadores extends Component {
    url = Global.apiTrabajadores
    salarioIncrementado = React.createRef()
    data = ""
    state = {
        trabajadores:[],
    }
    loadTrabajadores = () => {
        let idsHospitales = this.props.idhospitales;
        this.data = ""
        for(let id of idsHospitales){
            this.data += `idhospital=${id}&`
        }
        this.data = this.data.substring(0, this.data.length - 1)
        let request = "api/trabajadores/TrabajadoresHospitales?" + this.data
        axios.get(this.url +request).then(response => {
            this.setState({
                trabajadores: response.data
            })
        })
    }
    // https://servidor/api/trabajadores/UpdateSalarioTrabajadoresHospitales?incremento=1&idhospital=17&idhospital=22
    incrementarSalario = () => {
        let salario = parseInt(this.salarioIncrementado.current.value)
        let request = "api/trabajadores/UpdateSalarioTrabajadoresHospitales?"+"incremento=" + salario + "&" + this.data
        axios.put(this.url + request).then(response => {
            console.log("Salario Incrementado")
            this.loadTrabajadores();
        })
    }
    componentDidMount = () => {
        this.loadTrabajadores()
    }
    componentDidUpdate = (oldProps) => {
        if (oldProps.idhospitales !== this.props.idhospitales) {
            this.loadTrabajadores();
        }
    }
  render() {
    return (
      <div className="container mt-4">
        <h1 className="text-center mb-4 text-primary">Trabajadores</h1>
        <input ref={this.salarioIncrementado} className='form-control' type="text"/>
        <button onClick={this.incrementarSalario}>Incrementar Salario</button>
        <div className="table-responsive">
          <table className='table table-striped table-hover table-bordered shadow-sm'>
            <thead className="table-dark">
              <tr>
                <th>Apellido</th>
                <th>Oficio</th>
                <th>Salario</th>
                <th>Id Hospital</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.trabajadores.map((trabajador, index) => {
                  return(
                    <tr key={index}>
                      <td>{trabajador.apellido}</td>
                      <td>{trabajador.oficio}</td>
                      <td className="text-success fw-bold">{trabajador.salario}€</td>
                      <td className="text-center">{trabajador.idHospital}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
