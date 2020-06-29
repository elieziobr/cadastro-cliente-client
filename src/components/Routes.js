import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CadastroPage from './pages/CadastroPage';
import ListagemPage from './pages/ListagemPage';
import NotFoundPage from './pages/NotFoundPage';
import Login from './Auth/Login';
import Logout from './Auth/Logout';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/logout' exact component={Logout} />
        <Route path='/dashboard' component={CadastroPage} />
        <Route path='/tables' component={ListagemPage} />
        <Route path='/404' component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
