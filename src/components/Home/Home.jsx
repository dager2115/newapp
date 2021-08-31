import React, { useState } from 'react'
import './home.css'
import { db } from '../../firebase'
import { useParams } from 'react-router-dom'
import datos from './9gemc-cjxwb.json'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const productos = [
    {
        nombre: "carne",
        precio: "18000",
    },
    {
        nombre: "filete",
        precio: "15000",
    },
    {
        nombre: "limonada",
        precio: "6000",
    },
    {
        nombre: "pollo",
        precio: "20000",
    },
]

const Home = () => {

    
    const initialValues = {
        formulario: {
            nombre: "",
            apellido: "",
            edad: "",
            certify: false
        },
        checked:{
            yes: false,
            no: false
        }
    }
    const { id } = useParams()
    const [pedido, setPedido] = useState([])
    const [formulario, setFormulario] = useState(initialValues.formulario)
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    // const total = pedido.forEach( producto => { 
    //     let suma 
    //     producto
    // })
    const [checked, setChecked] = useState(initialValues.checked)

    const handlesubmit = async (e) => {
        e.preventDefault()
        const objetoPedido = {}
        pedido.forEach(elemento => {
            Object.assign(
                objetoPedido, 
                {[elemento.nombre]:{precio: elemento.precio, cantidad: elemento.cantidad}}
                )
        })
        console.log(objetoPedido)
        await db.collection('pedidos').doc().set(objetoPedido)
        .then(res => {
            alert("agregadisimo")
            setFormulario(initialValues.formulario)
            setChecked(initialValues.checked)
        })
        .catch(err=> 
            alert("algo salio mal")
        )
    } 

    

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        })
        console.log(pedido)
    }

    const addProducto = () => {
        setPedido([...pedido, formulario])
    } 

    const handleChecked = (e) => {
        const { name } = e.target
        if(name === "yes"){
            setChecked({
                ...checked,
                yes: true,
                no: false
            })
            setFormulario({
                ...formulario,
                certify: true
            })
        }
        if(name === "no"){
            setChecked({
                ...checked,
                yes: false,
                no: true
            })
            setFormulario({
                ...formulario,
                certify: false
            })
        }
    }

    const handleAddGirls = () => {
        console.log(datos)
        datos.forEach(async dato => {
            await db.collection('asistentes').doc().set(
                {
                    ...dato,
                    rol: "graduando"
                }
            )
        .then(res => {
            console.log("agregadisimo")
        })
        .catch(err=> alert("algo salio mal"))
        })
    }

    const filtro =  async () => {
        await db.collection('asistentes').where('nombre', '==', formulario.nombre).get()
        .then(res => {
            res.docs.forEach(dato => {
                console.log(dato.data())
            })
        })
    }

    const agregar = (producto) => {
        setPedido([...pedido, {...producto, cantidad:1}])
    }

return(
    <div>
        <form onSubmit={handlesubmit} className="formulario">
            <input name="nombre" className="input" placeholder="Incerte su nombre" value={formulario.nombre} onChange={handleChange}/>  
            {/* <input name="apellido" className="input" placeholder="Incerte su apellido" value={formulario.apellido} onChange={handleChange}/>
            <input name="edad" className="input" placeholder="Incerte su edad" value={formulario.edad} onChange={handleChange}/>
            <div>
            <input type="radio" name="yes" checked={checked.yes} onChange={handleChecked}/><label>si</label>
            <input type="radio" name="no" checked={checked.no} onChange={handleChecked}/><label>no</label>
            </div>
            <button type="submit" className="enviar">enviar</button>
            <button type="button" className="enviar" onClick={addProducto}>agregar</button>
<input type="file" id="documento" accept=".xls,.xlsx"/> */}
            <button type="button" onClick={handleAddGirls}>subir archivo</button> 
            {/* <button type="button" onClick={filtro}>traer</button> */}
        </form> 
    </div>
)
}

export default Home