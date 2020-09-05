import React, {Component} from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container} from 'reactstrap';
import RegisterModal from './RegisterModal';
export default class AppNavBar extends Component {
	state = {
		isOpen: false,
	};
	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	};
	render() {
		return (
			<div>
				<Navbar color="dark" dark expand="sm" className="mb-5">
					<Container>
						<NavbarBrand href="/">ShoppingList</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								<RegisterModal />
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</div>
		);
	}
}
