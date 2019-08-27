import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
		// If signed in return signout, otherwise return signin and register
		if (isSignedIn) {
			return (
				<nav style={{display: "flex", justifyContent: "flex-end"}}>
					{/* tachyon notation for styling */}			
					<p
					// Due to syntax of adding parameter to function call, the code now reads that the
			  		// function should be called when this code is hit. But it should be run when the
			  		// onClick event happens. An arrow function with the function defined as its return fixes this issue.
			  		// When clicked, change route to signout
					onClick={() => onRouteChange("signout")} className='f3 link dim black underline pa3 pointer'>Sign Out</p>			
				</nav>	
			);		
		} else {
			return (
					<nav style={{display: "flex", justifyContent: "flex-end"}}>
						{/* When clicked, change route to signin */}							
						<p onClick={() => onRouteChange("signin")} className='f3 link dim black underline pa3 pointer'>Sign In</p>	
						{/* When clicked, change route to register */}									
						<p onClick={() => onRouteChange("register")} className='f3 link dim black underline pa3 pointer'>Register</p>			
					</nav>
			);
		}		
}

export default Navigation;