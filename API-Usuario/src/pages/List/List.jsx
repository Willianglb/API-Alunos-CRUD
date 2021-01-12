import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {Button, TextField, Select} from '@material-ui/core';
import api from '../../components/api';

import './List.css'

function UserForm() {
    const {id} = useParams()
    const history = useHistory()
    const [nome, setNome] = useState('')
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [idade, setIdade] = useState('')
    const [dataNasc, setDataNasc] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [sexo, setSexo] = useState('')
    const [tipoConta, setTipoConta] = useState(1)

    var token = localStorage.getItem('token')
    token = token.replace('"', "");
    token = token.replace('"', "");
    const header = {
        headers: {'Authorization': 'Bearer ' + token}
    }

    async function getUserData() {
        await api.get(`usuarios/${id}`, {}, header)
        .then((res) => {
            setNome(res.data.nome)
            setIdade(res.data.idade)
            setDataNasc(res.data.dataNascimento)
            setEmail(res.data.email)
            setTelefone(res.data.telefone)
            setSexo(res.data.sexo)
        })
    }

    useEffect(() => {getUserData()},[id])

    async function EditarUsuario(e) {
        e.preventDefault()
        await api.put(`usuarios/${id}`, {
            dataNascimento: dataNasc,
            email: email,
            idade: idade,
            nome: nome,
            sexo: sexo,
            telefone: telefone,
        }, header)
        .then(() => {
            alert('Usuário editado com sucesso!')
            setTimeout(() => history.push('/home'), 3000)
        })
        .catch(() => alert('Não foi possível editar o usuário!'))

    }

    async function CriarUsuario(e) {
        e.preventDefault()
        await api.post('/usuarios', {
            dataNascimento: dataNasc,
            email: email,
            idade: idade,
            nome: nome,
            perfilId: tipoConta,
            senha: senha,
            sexo: sexo,
            telefone: telefone,
            usuario: usuario
        }, header)
        .then(() => {
            alert('Usuário cadastrado com sucesso!')
            setTimeout(() => history.push('/home'), 3000)
        })
        .catch(() => alert('Falha ao cadastrar usuário!'))
    }

    return (
        <div className='user-form-container'>
            <header className='user-form-header'>
                <h2>{id ? 'Edição de um usuário' : 'Cadastro de um novo usuário'}</h2>
            </header>
            <form 
                className='form-container' 
                onSubmit={id ? EditarUsuario : CriarUsuario}
            >
                <TextField
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    id='name'
                    label='Nome'
                    type='text'
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                />
                {id ? '' :
                <TextField
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    id='username'
                    label='Nome de usuário'
                    type='text'
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                />}
                {id ? '' :
                <TextField
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    id='password'
                    label='Senha'
                    type='password'
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                />}
                <TextField
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                    id='age'
                    label='Idade'
                    type='text'
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                />
                <TextField
                    value={dataNasc}
                    onChange={(e) => setDataNasc(e.target.value)}
                    id='birth'
                    label='Data de nascimento'
                    type='text'
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                />
                <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id='email'
                    label='Email'
                    type='email'
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                />
                <TextField
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    id='phone'
                    label='Telefone'
                    type='text'
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                />
                <div className='form-end'>
                    <div className='select-container'>
                        <Select
                            native
                            value={sexo}
                            onChange={(e) => setSexo(e.target.value)}
                            variant='outlined'
                        >
                            <option defaultChecked value="">Sexo</option>
                            <option value='MASCULINO'>Masculino</option>
                            <option value='FEMININO'>Feminino</option>
                        </Select>
                        {id ? '' :
                        <Select
                            native
                            value={tipoConta}
                            onChange={(e) => setTipoConta(e.target.value)}
                            variant='outlined'
                        >
                            <option defaultChecked value={1}>Tipo de conta</option>
                            <option value={1}>Normal</option>
                            <option value={2}>Admin</option>
                        </Select>}
                    </div>
                    <Button type='submit' variant='contained' color='primary'>{id ? 'Editar' : 'Cadastrar'}</Button>
                </div>
            </form>
        </div>
    )
}

export default UserForm