import { useState } from 'react';
import CardThanks from './components/CardThanks';
import CardForm from './components/CardForm';
import './App.css';

function App() {
	const [formData, setFormData] = useState({ name: null, number: null, mm: null, yy: null, cvc: null });
	const [validate, setValidate] = useState(false);


	const handleInput = (e) => {
		if (e.target.name === "number" && e.target.value) {
			e.target.value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 20);
		}

		if (e.target.name === "mm" || e.target.name === "yy") {
			e.target.value = e.target.value.toString().replace(/[^0-9]/g, '').substring(0, 2);
			if (e.target.name === "mm" && e.target.value > 12) e.target.value = "12"
		}

		if (e.target.name === "cvc") {
			e.target.value = e.target.value.substring(0, 4);
		}
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	const handleError = (target, message, type = "add") => {
		if (type === "add") {
			const submitBtn = document.querySelector('.btn-submit');
			submitBtn.classList.add("shake");
			submitBtn.addEventListener("animationend", () => submitBtn.classList.remove("shake"));
		}

		document.querySelector(`.label${target}`).nextElementSibling.innerHTML = message;
		document.querySelector(`[name="${target}"]`).classList[type](`input--error`);
		document.querySelector(`.label${target}`).nextElementSibling.classList[type === "add" ? "remove" : "add"]("info--hidden");
	}

	const animateSlider = (validate) => {
		let axis;
		window.matchMedia("(max-width: 750px)").matches ? axis = "Y" : axis = "X";
		document.querySelector('.cardOverflow > div').style.transform = `translate${axis}(50${axis === "Y" ? "vh" : "vw"})`;

		document.body.classList.add("body-slider");

		setTimeout(() => {
			setValidate(validate);
			document.body.classList.remove("body-slider");
			document.querySelector('.cardOverflow > div').style.transform = "translate(0)";
		}, 500);
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		for (let i in formData) {
			if (!formData[i]) {
				handleError(i, "Can`t be blank");
			} else handleError(i, "", "remove");
		}

		if (formData.number) {
			if (formData.number.length < 19) {
				handleError("number", "Number is too short");
			} else if (formData.number.match(/[^0-9\s]/g)) {
				handleError("number", "Wrong format, numbers only");
			} else handleError("number", "", "remove");
		}

		if (formData.cvc) {
			if (formData.cvc.length < 3) {
				handleError("cvc", "CVC is too short");
			} else handleError("cvc", "", "remove");
		}

		if (!formData.mm) handleError("mm", "Can`t be blank");
		if (!formData.yy) handleError("yy", "Can`t be blank");

		if (document.querySelectorAll('.input--error').length === 0) animateSlider(true);
	}

	const resetForm = () => {
		setFormData({ name: null, number: null, mm: null, yy: null, cvc: null });
		animateSlider(false);
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

			{!validate
				? <div className='cardOverflow'><div><CardForm handleSubmit={handleSubmit} handleInput={handleInput} /></div></div>
				: <div className='cardOverflow'><div><CardThanks resetForm={resetForm} /></div></div>
			}
			<img src="../design/desktop-design.jpg" alt="adf" className='bg' />
		</div>
	)
}
export default App