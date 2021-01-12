import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import StoreContext from 'components/Store/Context';
import UIButton from 'components/UI/Button/Button';
import './Login.css';
import api from '../../api';

function initialState() {
  return { user: '', password: ''};
}

const UserLogin = () => {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(null);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const { setToken } = useContext(StoreContext);
  const history = useHistory();

  async function onSubmit(event) {
    event.preventDefault();

    await api
      .post("/autenticacao", {
        usuario: usuario,
        senha: senha,
      })
      .then((res) => {        
        setToken(res.data.token);
        history.push("/home");
     
      })
      .catch(() => {
        setError(error);
        setValues(initialState);
      });  
  }

  return (
    <div className="user-login">
      <div className="espacamento"></div>
      <h1 className="user-login__title">Acesso ao sistema</h1>
      <form onSubmit={onSubmit}>
        <div className="user-login__form-control">
          <label htmlFor="user">Usuário</label>
          <input
            id="user"
            type="text"
            name="user"
            onChange={(e) => setUsuario(e.target.value)}
            value={usuario}
          />
        </div>
        <div className="user-login__form-control">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(e) => setSenha(e.target.value)}
            value={senha}
          />
        </div>
        {error && (
          <div className="user-login__error">{error}</div>
        )}
        <UIButton
          type="submit"
          theme="contained-green"
          className="user-login__submit-button"
          rounded
        >
          Login
        </UIButton>
      </form>
    </div>
  );
};

export default UserLogin;
