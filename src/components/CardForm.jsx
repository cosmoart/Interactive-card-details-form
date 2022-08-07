import './CardFormStyles.css';

export default function CardForm({ handleSubmit, handleInput }) {
	return (
		<form className='cardForm' onSubmit={handleSubmit}>
			<label className='labelname'>
				Cardholder Name
				<input type="text" placeholder="e.g. Jane Appleseed" onChange={handleInput} name="name" className='card-input' />
			</label>
			<p className='info info--hidden'></p>

			<label className='labelnumber'>
				Card Number
				<input type="text" placeholder="e.g. 1234 5678 9123 0000" onChange={handleInput} name="number" className='card-input' maxLength={19} />
			</label>
			<p className='info info--hidden'></p>

			<label className='labelmm labelyy'>
				Exp. Date (MM/YY)
				<div>
					<input type="text" placeholder='MM' onChange={handleInput} name="mm" className='card-input' />
					<input type="text" placeholder='YY' onChange={handleInput} name="yy" className='card-input' />
				</div>
			</label>
			<p className='info info--hidden'></p>

			<label className='labelcvc'>
				CVC
				<input type="text" placeholder='e.g. 123' onChange={handleInput} name="cvc" className='card-input' />
			</label>
			<p className='info info--hidden'></p>

			<button type='submit' className='btn-primary'>Confirm</button>
		</form>
	);
}