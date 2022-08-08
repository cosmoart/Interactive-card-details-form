import './CardThanksStyles.css';

export default function CardThanks({ resetForm }) {
	return (
		<div className='cardThanks'>
			<img src="icon-complete.svg" alt="" />
			<p>Thank you!</p>
			<p>We've added your card details</p>
			<button className='btn-primary' onClick={resetForm}>Continue</button>
		</div>
	);
}