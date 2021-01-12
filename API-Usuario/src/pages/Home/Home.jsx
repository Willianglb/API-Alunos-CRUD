import React, { useEffect, useState } from 'react';
import {Button, Segment, Table, Icon, Checkbox} from 'semantic-ui-react';
import {useHistory} from 'react-router-dom';
import api from '../../components/api';
import 'semantic-ui-css/semantic.min.css'
import './Home.css';

const PagesHome = () => {
  const [usuarios, setUsuarios] = useState([]);
  const history = useHistory();

  useEffect(() => {
    MostrarUsuarios();
  }, []);

  var token = localStorage.getItem('token');
  token = token.replace('"', "");
  token = token.replace('"', "");
    const header = {
      headers: { Authorization: `Bearer ${token}` },
 };

  async function MostrarUsuarios() {
    await api.get('/usuarios')
    .then((response) => {
        setUsuarios(response.data.content)
    })
}

  async function DeletarUsuario(id) {
 
    await api
      .delete(`usuarios/${id}`, header)
      .then(() => {
        alert('Usuario Deletado')
        MostrarUsuarios();
      })
      .catch(() => {
        alert("Não foi possível deletar o usuário");
      });
  }

  function BotaoSair() {
    localStorage.removeItem('token')
    localStorage.removeItem('authorizated')
    api.defaults.headers.Authorization = undefined
    history.push('/')
  }
  
  async function BotaoEditarUsuario(id) {
    history.push(`list/${id}`)
  }

  return (
    <div>
      <div className="botao-sair">
        <Segment inverted>
          <Button inverted color='red' className="botaoSair" onClick={BotaoSair}>
            Sair
          </Button>
        </Segment>
      </div>
      <div className="tabela">
        <Table celled definition selectable>
          <Table.Header>
            <Table.Row>
            <Table.HeaderCell />
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>Usuário</Table.HeaderCell>
              <Table.HeaderCell>Telefone</Table.HeaderCell>
              <Table.HeaderCell>Nascimento</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Perfil</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {usuarios.map((usuario) => {
           return <Table.Body>
                  <Table.Row key={usuario.id}>
                    <Table.Cell collapsing>
                      <Button color='red' icon='trash' onClick={() => DeletarUsuario(usuario.id)} />
                    </Table.Cell>
                    <Table.Cell onClick={() => BotaoEditarUsuario(usuario.id)}>{usuario.nome}</Table.Cell>
                    <Table.Cell onClick={() => BotaoEditarUsuario(usuario.id)}>{usuario.usuario}</Table.Cell>
                    <Table.Cell onClick={() => BotaoEditarUsuario(usuario.id)}>{usuario.dataNascimento}</Table.Cell>
                    <Table.Cell onClick={() => BotaoEditarUsuario(usuario.id)}>{usuario.email}</Table.Cell>
                    <Table.Cell onClick={() => BotaoEditarUsuario(usuario.id)}>{usuario.telefone}</Table.Cell>
                    <Table.Cell onClick={() => BotaoEditarUsuario(usuario.id)}>{usuario.perfilTipo}</Table.Cell>
                  </Table.Row>
                </Table.Body>
          })}

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='4'>
                <Button
                  floated='left'
                  icon
                  labelPosition='right'
                  primary
                  size='small'
                  href='/list'
                >
                  <Icon name='user' /> Add Usuário
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
};

export default PagesHome;
