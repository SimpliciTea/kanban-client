import React from 'react';


const ViewWrapper = (WrappedComponent, greeting) => {
	return class extends React.Component {
		render() { 
			return (
				<div className="auth-view">
					<div className="auth-modal">
						<div className="auth-modal__branding-pane">
							<h1 className="auth-modal__title">KANBAN!</h1>
						</div>

						<div className="auth-modal__form-pane">
							<h2 className="auth-modal__greeting">{greeting}</h2>
							<WrappedComponent {...this.props} />
						</div>
					</div>
					<p className="auth-tip"><strong>ProTip:</strong> use a fake e-mail address. They're just logins here. :)</p>

					<div className="site-attrib">
						Made with love by <a href="https://simplicitea.github.io">John Ley</a>
					</div>
				</div>
			)
		}
	}
}


export default ViewWrapper;