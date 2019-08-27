import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {	
	return (
		<div>
			{/* tachyon notation for styling */}
			<p className="f3">
				{"This Magic AI will detect faces in your pictures. Give it a try!"}
			</p>
			<div className="center">
				<div className="form center pa4 br3 shadow-5">
					{/* Update onInputChange when user enters URL */}
					<input className="f4 pa2 w-70 center" type="tex" onChange={onInputChange}/>
					{/* When clicked, runs the onButtonSubmit method of App class in App.js */}
					<button 
						className="w-30 grow f4 link ph3 pv2 dib white bg-gray"
						onClick={onButtonSubmit}
					>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;