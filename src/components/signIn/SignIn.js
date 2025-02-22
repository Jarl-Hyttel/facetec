import React from 'react';

// SignIn has own state, so needs to be class
class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: "",
			signInPassword: "",
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value});
	}
 
	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value});
	}

	onSubmitSignIn = () => {
		// fetch backend signin endpoint and post input signin form
		fetch("https://thawing-reaches-89716.herokuapp.com/signin", {
			method: "post",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword,
			})
		})
			// then return user and load into App state, and change route to home
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange("home");
				}
			})		
	}

	render() {
		const { onRouteChange } = this.props;
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
		  			<div className="measure">
		  				{/* Techyon form */}
				    	<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      	<legend className="f1 fw6 ph0 mh0">Sign In</legend>
					      	<div className="mt3">
						        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
						        <input 						        	
						        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        	type="email" 
						        	name="email-address"  
						        	id="email-address" 
						        	onChange={this.onEmailChange}
						        	/>
					      	</div>
					     	<div className="mv3">
						        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
						        <input 
							        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							        type="password" 
							        name="password"  
							        id="password" 
							        onChange={this.onPasswordChange}
						        />
					      	</div>				     	 
				    	</fieldset>
				    	<div className="">
				      		<input 				      		
				      		onClick={this.onSubmitSignIn}
				      		className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      		type="submit" 
				      		value="Sign in" 
				      		/>
				    	</div>
				    	<div className="lh-copy mt3">
					     	<p 
					     	// Due to syntax of adding parameter to function call, the code now reads that the
				      		// function should be called when this code is hit. But it should be run when the
				      		// onClick event happens. An arrow function with the function defined as its return fixes this issue.
					     	onClick={() => onRouteChange("register")} className="f6 link dim black db pointer">Register</p>				      	
				   		</div>
			  		</div>
				</main>
			</article>
		);
	}
}

export default SignIn;