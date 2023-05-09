import React, { useState } from 'react'
import Swal from 'sweetalert';



export const Listar = () => {
    //Lista de carreras
    const carreras = ['Ing. en Sistemas', 'Ing. en Quimica', 'Lic. en Administracion', "Ing. en TIC'S",
        'Ing. en Civil', 'Ing. en Logistica', 'Ing. en Electrica', 'Ing. en Mecatronica']

    //Envio de datos
    const formSubmit = (event) => {
        event.preventDefault()
        if (funcion == 'Registrar') {

            if (matricula == '' || nombre == '' || carrera == ''|| imagen=='' || imagen==null) {
                Swal("Faltan datos por llenar!", "Verifica todos los campos", "warning")
            } else {
                const indice = alumnos.findIndex((alumno) => alumno.matricula === matricula)
                //No existe
                if(indice==-1){
                    Swal("Alumno registrado!", "Continue trabajando!", "success")
                    const obj = { matricula: matricula, nombre: nombre, carrera: carrera, foto: imagen }
                    setAlumnos([...alumnos, obj])
                    limpiar()
                }else{
                    Swal("El alumno ya esta registrado", "Continue trabajando!", "warni")
                    limpiar()
                }
               
            }

        } else {

            if (matricula == '' || nombre == '' || carrera == '' ) {
                Swal("Faltan datos por llenar!", "Verifica todos los campos", "warning")
            } else {
                const indice = alumnos.findIndex((alumno) => alumno.matricula === matricula)
                const datosAct = alumnos[indice]
                datosAct.nombre = nombre
                datosAct.carrera = carrera
                if(imagen!=null){
                    datosAct.foto = imagen
                }
                // Copia del hook del arreglo de informacion del alumno
                const copia = [...alumnos]
                // Se actualiza el arreglo de la informacion
                copia[indice] = datosAct
                setAlumnos(copia)
                Swal("Alumno actualizado!", "Continue trabajando!", "success")
                setFunciones('Registrar')
                limpiar()
            }

        }


    }
    //Hooks
    const [alumnos, setAlumnos] = useState([])
    const [matricula, setMatricula] = useState('')
    const [nombre, setNombre] = useState('')
    const [carrera, setCarrera] = useState('')
    const [imagen, setImagen] = useState()
    const [funcion, setFunciones] = useState('Registrar')
    const [bloqueo, setBloqueo] = useState(false)
    //Cambios
    const handleMatriculaChanged = (event) => {
        setMatricula(event.target.value)
    }
    const handleNombreChanged = (event) => {
        setNombre(event.target.value)
    }
    const handleCarreraChanged = (event) => {
        setCarrera(event.target.value)
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        // console.log(file)
        if (file && file.type.substr(0, 5) === 'image') {
            setImagen(file)
        }
    }
    //Limpiar
    const limpiar = () => {
        setMatricula('')
        setNombre('')
        setCarrera('')
        setImagen(null)
        setBloqueo(false)
    }
    //elimnar
    const eliminar = (indice) => {
        Swal({
            title: "Deseas eliminar este alumno?",
            text: "No podras recuperar la informacion!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              Swal("Se ha eliminado correctamente!", {
                icon: "success",
              });
              setAlumnos(alumnos.filter((_, index) => index !== indice));
            } else {
              Swal("Operacion cancelada");
            }
          });
    }
    //Editar
    const editar = (indice, datos) => {
        //  console.log(indice)
        setFunciones('Guardar')
        setMatricula(datos.matricula)
        setNombre(datos.nombre)
        setCarrera(datos.carrera)
        setImagen(datos.imagen)
        setBloqueo(true)
    }
    return (
        <>
            <main className='container'>
                <div className="card">
                    <div className="card-header">
                        <h2 className='text-center'>Formulario de registro</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={formSubmit}>
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1">Matricula</span>
                                            <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" value={matricula} onChange={handleMatriculaChanged} disabled={bloqueo} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1">Nombre(s)</span>
                                            <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" value={nombre} onChange={handleNombreChanged} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <select className="form-select" aria-label="Default select example" value={carrera} onChange={handleCarreraChanged}>
                                            <option selected>--Seleccionar una carrera--</option>
                                            {carreras.map((carr, index) => (
                                                <option key={index}>{carr}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col">
                                        <div className="input-group">
                                            <input type="file" className="form-control img-thumbnail" id="inputGroupFile02" accept='image/*' onChange={(e) => handleImageChange(e)} ref={imagen} />
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col">
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-success" type='submit'>{funcion}</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <br />
            <section className='container text-center'>
                <table className="table table-hover table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Matricula</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Carrera</th>
                            <th scope='col'>Foto</th>
                            <th scope='col'>Funciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alumnos.map((datos, index) => (
                            <tr>
                                <th key={index}>{datos.matricula}</th>
                                <td>{datos.nombre}</td>
                                <td>{datos.carrera}</td>
                                <td>{datos.foto ? <img width={100} src={URL.createObjectURL(datos.foto)} alt='Foto' /> : ''}</td>
                                <td>

                                    <button type="button" className="btn btn-primary" onClick={() => editar(index, datos)}>Editar</button>
                                    <button type="button" className="btn btn-danger" onClick={() => eliminar(index)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}



                    </tbody>
                </table>


            </section>

        </>
    )
}
