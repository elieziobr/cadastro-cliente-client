import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from 'mdbreact';

export default class Login extends Component {
    constructor(props){
        super(props);
        const token = localStorage.getItem("token")

        let loggedIn = true
        if(token == null){
            loggedIn = false
        }


        this.state ={
            email:'',
            senha:'',
            loggedIn,
            modal: false
        }
        this.onChange = this.onChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    toggle = () => {
        if(this.state.loggedIn === false){
            this.setState({
                modal: !this.state.modal
              });
        }

      }

    submitForm(e){
        e.preventDefault()

        /*request to get token*/
        axios.post('http://localhost:8080/auth', {
            email: this.state.email,
            senha: this.state.senha
         })
            .then(res => {
               //check if the request has succeeded
               if(res.status === 200){
                   localStorage.setItem("token",res.data.accessToken)
                   localStorage.setItem("email",this.state.email)
                   console.log(localStorage.getItem("token"))

                   this.setState({
                       loggedIn: true
                    })
               }
            })
    }


    render() {

        if(this.state.loggedIn){
            return <Redirect to="/dashboard" />
        }

        return (
            <MDBContainer>
            <MDBRow>
              <MDBCol md="6" >
                {alert}
                <form onSubmit={this.submitForm}>
                <MDBCard>
                  <div className="header pt-3 grey lighten-2">
                    <MDBRow className="d-flex justify-content-start">
                      <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                        Acessar o Cadastro de Cliente
                      </h3>
                    </MDBRow>
                  </div>

                  <MDBCardBody className="mx-4 mt-4">
                    <MDBInput
                        label="E-mail"
                        name="email"
                        value={this.state.email}
                        group
                        type="text"
                        validate
                        onChange={this.onChange}
                    />

                    <MDBInput
                      label="Senha"
                      name="senha"
                      value={this.state.senha}
                      group
                      type="password"
                      validate
                      containerClass="mb-0"
                      onChange={this.onChange}
                    />
                    <p className="font-small grey-text d-flex justify-content-end">
                      Esqueceu
                      <a
                        href="#!"
                        className="dark-grey-text font-weight-bold ml-1"
                      >
                        sua senha?
                      </a>
                    </p>
                    <div className="text-center mb-4 mt-5">
                        <MDBBtn
                            color="primary"
                            type="sumbit"
                            className="btn-block z-depth-2"
                            onClick={this.toggle}
                        >
                            Entrar
                        </MDBBtn>
                        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                            <MDBModalHeader toggle={this.toggle}>Erro ao Logar no Sistema</MDBModalHeader>
                            <MDBModalBody>
                                E-mail ou Senha incorreta!
                            </MDBModalBody>
                        </MDBModal>
                    </div>
                  </MDBCardBody>
                </MDBCard>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        )
    }
}
