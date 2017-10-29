import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {

	render() {
		return (
			<div>
				<nav>
					<Link to={'/'}>Home</Link>
					<Link to={'/auth/signin'}>Sign In</Link>
					<Link to={'/auth/signup'}>Sign Up</Link>
					<Link to={'/boards'}>Boards</Link>
					<Link to={'/boards/0'}>Board</Link>
				</nav>
			</div>
		)
	}
}


export default Header;