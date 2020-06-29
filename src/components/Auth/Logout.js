import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Logout extends Component {
    constructor(props){
        super(props)
        localStorage.removeItem("token")
        localStorage.removeItem("email")
    }
    render() {
        return (
            <div>
                <h1>Você foi desconectado!!!</h1>
                <Link to="/">Entrar novamente</Link>
            </div>
        )
    }
}
