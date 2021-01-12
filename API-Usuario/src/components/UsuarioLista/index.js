import React from 'react';
import {Table, Checkbox} from 'semantic-ui-react';
import api from '../api';

function UsuarioLista(props) {
    const token = localStorage.getItem('token')
    const header = {
        headers: {'Authorization': 'Bearer ' + token}
    }

    async function deleteUser() {
        await api.delete(`usuarios/${props.id}`, header)
        .then(() => alert('Usuário apagado com sucesso!'))
        .catch(() => alert('Não foi possível apagar o usuário'), console.log(token))
    }

    return (
        <div className='user-box'>
           <Table.Body>
                  <Table.Row>
                    <Table.Cell collapsing>
                      <Checkbox onClick={deleteUser}/>
                    </Table.Cell>
                    <Table.Cell>{props.nome}</Table.Cell>
                    <Table.Cell >{props.usuario}</Table.Cell>
                    <Table.Cell >{props.dataNascimento}</Table.Cell>
                    <Table.Cell>{props.email}</Table.Cell>
                    <Table.Cell>{props.telefone}</Table.Cell>
                    <Table.Cell>{props.perfilTipo}</Table.Cell>
                  </Table.Row>
                </Table.Body>
        </div>
    )
}

export default UsuarioLista;