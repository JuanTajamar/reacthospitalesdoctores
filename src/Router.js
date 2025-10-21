import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Home from './components/Home'
import MenuHospitales from './components/MenuHospitales'
import Doctores from './components/Doctores';
import DetallesDoctor from './components/DetallesDoctor';
import CreateHospital from './components/CreateHospital';

export default class Router extends Component {
  render() {

    function DoctoresElement () {
        let { idhospital } = useParams();
        console.log({ idhospital })
        return <Doctores idhospital={idhospital}/>
    }

    function DoctorDetailsElement () {
        let { iddoctor } = useParams();
        return <DetallesDoctor iddoctor={iddoctor}/>
    }

    return (
      <BrowserRouter>
        <MenuHospitales/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/doctores/:idhospital" element={<DoctoresElement/>}/>
            <Route path="/doctor/:iddoctor" element={<DoctorDetailsElement/>}/>
            <Route path="/create" element={<CreateHospital/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}
