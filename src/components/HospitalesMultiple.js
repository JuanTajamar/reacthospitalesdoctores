import React, { Component } from 'react'
import Trabajadores from './Trabajadores'
import Global from "../Global";
import axios from 'axios'
export default class HospitalesMultiple extends Component {
    // "idHospital": 0,
    // "nombre": "string",
    // "direccion": "string",
    // "telefono": "string",
    // "camas": 0
    url = Global.apiTrabajadores
    selectHospital = React.createRef()
    state = {
        hospitales: [],        
        hospitalesSeleccionados: []
    }
    loadHospitales = () => {
        let request = "api/hospitales"  
        axios.get(this.url + request).then(response => {
            this.setState({
                hospitales: response.data
            })
        })
    }
    componentDidMount = () => {
        this.loadHospitales()
    }
    getHospitalesSeleccionados = (event) => {
        event.preventDefault();
        let aux = []
        let options = this.selectHospital.current.options;
        for(let option of options){
            if(option.selected === true){
                aux.push(option.value)
            }
            this.setState({hospitalesSeleccionados:aux})
        }
    }
    render() {

        return (
            <div>
                <form>
                    <select ref={this.selectHospital} size="5" multiple>
                    {
                        this.state.hospitales.map((hospital,index) => {
                            return(
                                <option key={index} value={hospital.idHospital}>{hospital.nombre}</option>
                            )
                        })
                    }
                    </select>
                    <button className='btn btn-warning' onClick={this.getHospitalesSeleccionados}>Mostrar trabajadores</button>
                </form>
                {
                    this.state.hospitalesSeleccionados.length !== 0 &&
                    <Trabajadores idhospitales={this.state.hospitalesSeleccionados}/>
                }
            </div>
        )
    }
}
