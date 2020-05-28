import React from 'react';

const Total = ({parts}) => {
	let total = parts.reduce((a, b) => a+b.exercises, 0)
	return (
		<div>
			<p>
				Number of exercises {total}
			</p>
		</div>  
	) 
}


export default Total
