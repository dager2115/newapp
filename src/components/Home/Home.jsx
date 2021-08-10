import React, { useState } from 'react'
import './home.css'
import { db } from '../../firebase'
import { useParams } from 'react-router-dom'

const producto = {
    nombre: "mafe",
    apellido: "caro",
    edad: "18"
}

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
    const [pedido, setPedido] = useState([producto])
    const [formulario, setFormulario] = useState(initialValues.formulario)

    const [checked, setChecked] = useState(initialValues.checked)

    const handlesubmit = async (e) => {
        e.preventDefault()
        const objetoPedido = {}
        pedido.forEach(elemento => {
            Object.assign(
                objetoPedido, 
                {[elemento.nombre]:{apellido: elemento.apellido, edad: elemento.edad}}
                )
        })
        console.log(objetoPedido)
        await db.collection('pedidos').doc().set(objetoPedido)
        .then(res => {
            alert("agregadisimo")
            setFormulario(initialValues.formulario)
            setChecked(initialValues.checked)
        })
        .catch(err=> alert("algo salio mal"))
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

return(
    <div>
        <h1>{id}</h1>
        <form onSubmit={handlesubmit} className="formulario">
            <input name="nombre" className="input" placeholder="Incerte su nombre" value={formulario.nombre} onChange={handleChange}/>  
            <input name="apellido" className="input" placeholder="Incerte su apellido" value={formulario.apellido} onChange={handleChange}/>
            <input name="edad" className="input" placeholder="Incerte su edad" value={formulario.edad} onChange={handleChange}/>
            <div>
            <input type="radio" name="yes" checked={checked.yes} onChange={handleChecked}/><label>si</label>
            <input type="radio" name="no" checked={checked.no} onChange={handleChecked}/><label>no</label>
            </div>
            <button type="submit" className="enviar">enviar</button>
            <button type="button" className="enviar" onClick={addProducto}>agregar</button>
        </form>
        <div>
            {pedido?.map((elem, index) => 
                <div key={index}>
                    <h3>{elem.nombre}</h3>
                    <p>{elem.apellido}</p>
                    <p>{elem.edad}</p>
                </div>
            )}
        </div>
    </div>
)
}

export default Home