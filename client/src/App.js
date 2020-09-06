import React, {Component} from 'react';
import AppNavBar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/itemModal';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'reactstrap';
import {loadUser} from './actions/authActions';
import {Provider} from 'react-redux';
import store from './store';

class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser());
	}
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
