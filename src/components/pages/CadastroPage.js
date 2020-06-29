import React, { Component } from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBRow
} from 'mdbreact';

import { Link, Redirect } from 'react-router-dom';
import axios from "axios";

export default class CadastroPage extends Component {
  constructor(props){
    super(props)
    const token = localStorage.getItem("token")

    let loggedIn = true;


    if(token == null){
      loggedIn = false
    }

    this.state = {
        id: null,
        nome:"",
        cpf:"",
        logradouro:"",
        cidade:"",
        bairro:"",
        uf:"",
        cep:"",
        complemento:"",
        email:"",
        telefones:[
            {
                ddd:"",
                numero:"",
                tipo:""
            }
        ],
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

        axios.post('http://localhost:8080/api/clientes',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem("token")
            },
            nome: this.state.nome,
            cpf: this.state.cpf,
            email: this.state.email,
            logradouro: this.state.logradouro,
            cidade: this.state.cidade,
            bairro: this.state.bairro,
            uf: this.state.uf,
            cep: this.state.cep,
            complemento: this.state.complemento,
            telefones: [
                {
                    ddd:this.state.telefones.ddd,
                    numero:this.state.telefones.numero,
                    tipo:this.state.telefones.tipo
                }
            ]
        })
            .then(res => {
                if(res.status === 200) {
                    this.setState( {
                        loggedIn: true
                    })
                }
            })
    }

  render(){
    if(this.state.loggedIn === false){
      return <Redirect to="/" />
    }


    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="12" >
                    {alert}
                    <form onSubmit={this.submitForm}>
                        <MDBCard>
                            <MDBCardBody className="mx-4 mt-4">
                                <MDBInput
                                    label="Nome"
                                    name="nome"
                                    value={this.state.nome}
                                    group
                                    type="text"
                                    validate
                                    onChange={this.onChange}
                                />

                                <MDBInput
                                    label="CPF"
                                    name="cpf"
                                    value={this.state.cpf}
                                    group
                                    type="text"
                                    validate
                                    containerClass="mb-0"
                                    onChange={this.onChange}
                                />
                                Telefone
                                <MDBInput
                                    label="DDD"
                                    name="ddd"
                                    value={this.state.telefones.ddd}
                                    group
                                    type="text"
                                    validate
                                    containerClass="mb-0"
                                    onChange={this.onChange}
                                />
                                <MDBInput
                                    label="Telefone"
                                    name="numero"
                                    value={this.state.telefones.numero}
                                    group
                                    type="text"
                                    validate
                                    containerClass="mb-0"
                                    onChange={this.onChange}
                                />
                                <MDBInput
                                    label="Tipo"
                                    name="tipo"
                                    value={this.state.telefones.tipo}
                                    group
                                    type="text"
                                    validate
                                    containerClass="mb-0"
                                    onChange={this.onChange}
                                />
                                Endereço
                                <MDBInput
                                    label="Logradouro"
                                    name="logradouro"
                                    value={this.state.logradouro}
                                    group
                                    type="text"
                                    validate
                                    containerClass="mb-0"
                                    onChange={this.onChange}
                                />
                                <MDBInput
                                    label="Bairro"
                                    name="bairro"
                                    value={this.state.bairro}
                                    group
                                    type="text"
                                    validate
                                    containerClass="mb-0"
                                    onChange={this.onChange}
                                />
                                <MDBInput
                                    label="Cidade"
                                    name="cidade"
                                    value={this.state.cidade}
                                    group
                                    type="text"
                                    validate
                                    containerClass="mb-0"
                                    onChange={this.onChange}
                                />
                                <MDBInput
                                    label="UF"
                                    name="uf"
                                    value={this.state.uf}
                                    group
                                    type="text"
                                    validate
                                    containerClass="mb-0"
                                    onChange={this.onChange}
                                />
                                <MDBInput
                                    label="Cep"
                                    name="cep"
                                    value={this.state.cep}
                                    group
                                    type="text"
                                    validate
                                    containerClass="mb-0"
                                    onChange={this.onChange}
                                />
                                <MDBInput
                                    label="Complemento"
                                    name="complemento"
                                    value={this.state.complemento}
                                    group
                                    type="text"
                                    validate
                                    containerClass="mb-0"
                                    onChange={this.onChange}
                                />

                                <div className="text-center mb-4 mt-5">
                                    <MDBBtn
                                        color="primary"
                                        type="sumbit"
                                        className="btn-block z-depth-2"
                                        onClick={this.toggle}
                                    >
                                        Cadastrar
                                    </MDBBtn>
                                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                        <MDBModalHeader toggle={this.toggle}>Erro ao Cadastrar o cliete</MDBModalHeader>
                                        <MDBModalBody>
                                            Cliente não Cadastrado
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
