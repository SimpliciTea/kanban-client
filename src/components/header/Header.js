import React from 'react';
import { Link } from 'react-router-dom';


const header = props => <div>
	<nav>
		<Link to={'/'}>Home</Link>
		{props.authed &&
			<Link to={'/signout'}>Sign Out</Link>
		}
	</nav>
</div>


export default header;
		