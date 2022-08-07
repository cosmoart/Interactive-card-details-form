import { useState } from 'react';
import CardThanks from './components/CardThanks';
import CardForm from './components/CardForm';
import './App.css';

function App() {
	const [formData, setFormData] = useState({ name: null, number: null, mm: null, yy: null, cvc: null });
	const [validate, setValidate] = useState(false);


	const handleInput = (e) => {
		if (e.target.name === "number") {
			if (e.target.value.length < 20) {
				let valueWithoutSpaces = e.target.value.toString().replace(/\s/g, '');
				e.target.value = valueWithoutSpaces ? valueWithoutSpaces.match(/.{1,4}/g).join(" ") : "";
				setFormData({ ...formData, number: valueWithoutSpaces ? valueWithoutSpaces.match(/.{1,4}/g).join(" ") : null });
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

	const handleError = (target, message, type) => {
		if (type === "add") {
			document.querySelector(`[name="${target}"]`).classList.add(`input--error`);
			document.querySelector(`.label${target}`).nextElementSibling.innerHTML = message;
			document.querySelector(`.label${target}`).nextElementSibling.classList.remove("info--hidden");
		} else {
			document.querySelector(`[name="${target}"]`).classList.remove(`input--error`);
			document.querySelector(`.label${target}`).nextElementSibling.classList.add("info--hidden");
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		for (let i in formData) {
			if (!formData[i]) {
				handleError(i, "Can`t be blank", "add");
			} else handleError(i, "", "remove");
		}
		if (formData.number) {
			if (formData.number.match(/[^0-9]s/g)) {
				handleError("labelnumber", "Wrong format, numbers only", "add");
			} else handleError("labelnumber", "", "remove");

			if (formData.number.length < 19) {
				handleError("labelnumber", "Number is too short", "add");
			} else handleError("labelnumber", "", "remove");
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

			{!validate ? <CardForm handleSubmit={handleSubmit} handleInput={handleInput} /> : <CardThanks />}
		</div>
	)
}
export default App