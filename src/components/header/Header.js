import React from 'react';
import { Link } from 'react-router-dom';


const header = props => <div>
	{props.authed &&
		<nav className='site-nav'>
			<Link to={'/signout'}>Sign Out</Link>
		</nav>
	}
</div>


export default header;
		