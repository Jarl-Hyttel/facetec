import React from 'react';
import Tilt from 'react-tilt';
import face from './face_nocircle.png';
import './Logo.css';

const Logo = () => {
	{/* Can only return a single element, so no comment on tachyon styling. 
	See Navigation.js*/}
	return (
		<div className="ma4 mt0">
			<Tilt className="Tilt br2 shadow-2" options={{ max : 45 }} style={{ height: 150, width: 150 }}>
	 			<div className="Tilt-inner">
	 				<img alt="facelogo" src={face}/>
				</div>
			</Tilt>
		</div>
	);
}

export default Logo;