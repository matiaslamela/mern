import React, {Component} from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
	NavLink,
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class RegisterModal extends Component {
	state = {
		modal: false,
		name: '',
		email: '',
		password: '',
		msg: null,
	};
	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
	};
	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};
	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};
	onSubmit = (e) => {
		e.preventDefault();
		const newItem = {
			name: this.state.name,
		};
		this.props.addItems(newItem);
		this.toggle();
	};
	render() {
		return (
			<div>
				<NavLink onClick={this.toggle} href="#">
					Register
				</NavLink>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Register</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="name">Name</Label>
								<Input
									className="mb-3"
									type="text"
									name="name"
									id="name"
									placeholder="Add name"
									onChange={this.onChange}
								/>
								<Label for="email">Email</Label>
								<Input
									className="mb-3"
									type="email"
									name="email"
									id="email"
									placeholder="Add Email"
									onChange={this.onChange}
								/>
								<Label for="password">Password</Label>
								<Input
									className="mb-3"
									type="password"
									name="password"
									id="password"
									placeholder="Add password"
									onChange={this.onChange}
								/>
								<Button color="dark" style={{marginTop: '2rem'}} block>
									Add it
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
});

export default connect(mapStateToProps)(RegisterModal);
