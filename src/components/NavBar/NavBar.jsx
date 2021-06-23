import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'

const NavBar = ( { lista } ) => {
    return(
        <nav>
            <ul className="menu">
               {lista&&lista.map((e, i)=>{
                   return(
                       <li key={i} className="option"><NavLink exact to={e}>{e}</NavLink></li>
                   )
               })}
            </ul>
        </nav>
    )
}

export default NavBar;