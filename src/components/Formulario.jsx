import { useState } from "react"
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BaseColaboradores } from "../BaseColaboradores"

const Formulario = () => {
    const nombreFooter = "@Leonardo-Villagrán" ;
    const emailFooter ="mailto:leonardovillagran@yahoo.com";
    const titulo ="Buscador de Colaboradores";
    const [buscarTarea, setBuscarTarea] = useState("")
    let[i, setI] = useState(1)
    const [nombreTarea, setNombreTarea] = useState("")
    const [emailTarea, setEmailTarea] = useState("")
    let [listaTareas, setListaTareas] = useState(BaseColaboradores)
    const [mostrar, setMostrar] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");
    // Función al enviar el formulario
    const enviarFormulario = (e) => {
        setI(1);
        e.preventDefault()
        if (nombreTarea === "" || emailTarea === "") {
            console.log(nombreTarea, emailTarea);
            setMostrar(true)
            setAlertType("danger");
            setAlertMessage("No dejar espacios en blanco.");
            setNombreTarea(""); 
            setEmailTarea("");
            return false;
        }

        if (listaTareas.length === 0) {
            setListaTareas([...listaTareas, {
                id: "1",
                nombre: nombreTarea,
                email: emailTarea
            }])
            console.log(listaTareas);
            setMostrar(true)
            setAlertType("primary");
            setAlertMessage("Datos ingresados correctamente.");
            setNombreTarea(""); 
            setEmailTarea("");
            return true;
        }
        else {
            setBuscarTarea("");
            listaTareas = listaTareas.sort((a, b) => a.id - b.id);
            let ultimo = listaTareas[listaTareas.length - 1]
            let id_ultimo = Number(ultimo.id) + 1;
            let id_str = id_ultimo.toString();
            console.log(id_str);
            setListaTareas([...listaTareas, {
                id: id_str,
                nombre: nombreTarea,
                email: emailTarea
            }])
            console.log(listaTareas);
            setMostrar(true)
            setAlertType("primary");
            setAlertMessage("Datos ingresados correctamente.");
            setNombreTarea(""); 
            setEmailTarea("");
            return true;
        }
    }
    //Función al escribir sobre el input del formulario
    const capturaNombre = (e) => {
        setNombreTarea(e.target.value)
    }
    const capturaEmail = (e) => {
        setEmailTarea(e.target.value)
    }
    const capturaBuscar = (e) => {
        setBuscarTarea(e.target.value)
        setMostrar(false)
        setAlertType("");
        setAlertMessage("");
    }
    const eliminarTarea = (el) => {
        const listaFiltrada = listaTareas.filter((tarea) => el.id !== tarea.id)
        setListaTareas(listaFiltrada)
        setMostrar(true)
        setAlertType("warning");
        setAlertMessage("Datos borrados correctamente. ");
        setNombreTarea(""); 
        setEmailTarea("");

    }
    const filtrados = listaTareas.filter((tarea) => {

        if (tarea.nombre.toUpperCase().includes(buscarTarea.toUpperCase())) {

            return true;

        }

        return false;

    });

    const activarBoton = () => {
        if (nombreTarea !== "" && emailTarea !== "") {
            return (
                <div className="d-flex align-items-center">
                <button className="btn btn-primary m-3">Agregar colaborador</button><p className="muteado text-muted  mt-3">Botón activado.</p>
                </div>
            )
        }
        else{
            return (
                <div className="d-flex align-items-center">
                <button className="btn btn-danger m-3" disabled>Desactivado</button><p className="muteado text-muted  mt-3">Ingresar datos para activar</p>
                </div>
            )
            
        }
    }
    

    return (
        <div className="w-100">
            <div className="w-100 bg-dark d-flex justify-content-between p-2">
                <p className="textoHeader text-light">{titulo}</p>
                <form onSubmit={enviarFormulario}>
                    <input className="buscador" id="buscador" name="buscador" value={buscarTarea} onChange={capturaBuscar} placeholder="Buscar colaboradores"/>
                </form>

            </div>
            <Alert className='m-2' show={mostrar} variant={alertType}>
                {alertMessage}
            </Alert>

            <form onSubmit={enviarFormulario}>
                <label htmlFor="nombre" className="labelColaborador form-control-lg">Nombre del colaborador:</label>
                <input name="nombre" id="nombre" className="form-control" value={nombreTarea} onChange={capturaNombre} placeholder="Ingrese el nombre del colaborador"/>
                <label htmlFor="email" className="labelColaborador form-control-lg">Correo del colaborador:</label>
                <input name="email" id="email" className="form-control" value={emailTarea} onChange={capturaEmail} placeholder="Ingrese correo del colaborador"/>
                {activarBoton()}
            </form>
            <hr />
            <h1>Listado de colaboradores</h1>
            <table className="table table-striped table-bordered table-hover">
                <tbody key={i}>
                    <tr className="bg-dark" key={i=i+1}><th className="text-light" scope="col">Nombre</th ><th className="text-light" scope="col">Email</th><th className="text-light" scope="col">Borrar</th></tr>
                    {(buscarTarea === "") ? listaTareas.map((tarea, index) =>
                        <tr  key={i=i+1}>
                            <td>{tarea.nombre} </td>
                            <td> {tarea.email} </td>
                            <td><button className="btn btn-warning" onClick={() => eliminarTarea(tarea)}> Borrar</button></td>
                        </tr>
                    )
                        :
                        filtrados.map((tarea, index) =>
                            <tr  key={i=i+1}>
                                <td >{tarea.nombre} </td>
                                <td> {tarea.email} </td>
                                <td><button className="btn btn-danger" onClick={() => eliminarTarea(tarea)}> Borrar</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div className='p-2 text-center'>
                    <a href={emailFooter}><Badge bg="secondary p-2">{nombreFooter}</Badge></a>
            </div>
        </div>
    )
}
export default Formulario;
