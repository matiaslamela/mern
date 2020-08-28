import React from 'react';
import AppNavBar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/itemModal';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'reactstrap';

function App() {
	return (
		<div className="App">
			<AppNavBar />
			<Container>
				<ItemModal />
				<ShoppingList />
			</Container>
		</div>
	);
}

export default App;
