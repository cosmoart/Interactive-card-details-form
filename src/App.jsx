import { useState } from 'react'
import './App.css'

function App() {
	const [formData, setFormData] = useState({ name: null, number: null, mm: null, yy: null, cvc: null });
	let validate = false;

	const handleInput = (e) => {
		if (e.target.name === "number") {
			if (e.target.value.length < 19) {
				let valueWithoutSpaces = e.target.value.toString().replace(/\s/g, '');

				setFormData({ ...formData, number: valueWithoutSpaces ? valueWithoutSpaces.match(/.{1,4}/g).join(" ") : null });
				e.target.value = valueWithoutSpaces ? valueWithoutSpaces.match(/.{1,4}/g).join(" ") : "";
			} else {
				e.target.value = e.target.value.substring(0, 19);
			}
		} else if (e.target.name === "mm" || e.target.name === "yy") {
			e.target.value = e.target.value.toString().replace(/[^0-9]/g, '').substring(0, 2);

			if (e.target.name === "mm" && e.target.value > 12) e.target.value = "12"

			setFormData({ ...formData, [e.target.name]: e.target.value });
		} else if (e.target.name === "cvc") {
			e.target.value.length > 2 && (e.target.value = e.target.value.substring(0, 4));
			setFormData({ ...formData, [e.target.name]: e.target.value });
		} else {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		for (let i in formData) {
			console.log(formData[i]);
			console.log(Boolean(formData[i]));
		}
	}

	return (
		<div className="App">

			<div className='cardDeco'>
				<div className='cardFront'>
					<span>{formData.number || "0000 0000 0000 0000"}</span>
					<div>
						<span>{formData.name || "Jane Appleseed"}</span>
						<span>{formData.mm || "00"}/{formData.yy || "00"}</span>
					</div>
				</div>

				<div className='cardBack'><span>{formData.cvc || "000"}</span></div>
			</div>

			{!validate ?
				<form className='cardForm' onSubmit={handleSubmit}>
					<label>
						Cardholder Name
						<input type="text" placeholder="e.g. Jane Appleseed" onChange={handleInput} name="name" className='card-input' />
					</label>

					<label>
						Card Number
						<input type="text" placeholder="1234 5678 9123 0000" onChange={handleInput} name="number" className='card-input' maxLength={19} />
					</label>

					<label>
						Exp. Date (MM/YY)
						<div>
							<input type="text" placeholder='MM' onChange={handleInput} name="mm" className='card-input' />
							<input type="text" placeholder='YY' onChange={handleInput} name="yy" className='card-input' />
						</div>
					</label>

					<label>
						CVC
						<input type="text" placeholder='e.g. 123' onChange={handleInput} name="cvc" className='card-input' />
					</label>

					<button type='submit' className='btn-primary'>Confirm</button>
				</form>
				:
				<div className='cardThanks'>
					<img src="src/assets/icon-complete.svg" alt="" />
					<p>Thank you!</p>
					<p>We've added your card details</p>
					<button className='btn-primary'>Continue</button>
				</div>
			}
		</div>
	)
}

export default App
