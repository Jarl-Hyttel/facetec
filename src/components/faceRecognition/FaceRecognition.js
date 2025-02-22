import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
	return (
		<div className="center ma">
			<div className="absolute mt2">
				{/* Format image to be 500 pixels wide and then auto adjust height
				so it is not warped. */}
				<img id="inputimage" alt="" src={imageUrl} width="500px" height="auto"/>	
				{/* Draw box around detected face based on incoming position info */}
				<div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>
	);
}

export default FaceRecognition;