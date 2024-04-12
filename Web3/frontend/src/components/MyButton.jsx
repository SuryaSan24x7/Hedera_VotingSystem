import React from "react";

function MyButton(props) {
	return (
		<div>
			<button onClick={props.fcn} className="btn btn-success ms-2">
				{props.buttonLabel}
			</button>
		</div>
	);
}
export default MyButton;
