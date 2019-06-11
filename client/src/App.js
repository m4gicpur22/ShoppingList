import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import { Provider } from 'react-redux';
import store from './Store';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';


class App extends Component {
  render() { 
    return (
    <Provider store={store}>
    <div className="App">
      <AppNavBar />
      <Container>
        <ItemModal />
        <ShoppingList />
      </Container>
    </div>
    </Provider>
    );
  }
}
export default App;
