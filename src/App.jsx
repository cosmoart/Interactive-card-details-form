import { useState } from 'react';
import CardThanks from './components/CardThanks';
import CardForm from './components/CardForm';
import CreditCard from './components/CreditCard';
import './styles/App.css';

function App() {
	const [formData, setFormData] = useState({ name: null, number: null, mm: null, yy: null, cvc: null });
	const [validate, setValidate] = useState(false);

	
	const animateSlider = (validate) => {
		let axis = window.matchMedia("(max-width: 750px)").matches ? "Y" : "X";
		document.querySelector('.cardOverflow > div').style.transform = `translate${axis}(50${axis === "Y" ? "vh" : "vw"})`;

		document.body.classList.add("body-slider");

		setTimeout(() => {
			setValidate(validate);
			document.body.classList.remove("body-slider");
			document.querySelector('.cardOverflow > div').style.transform = "translate(0)";
		}, 500);
	}

	return (
		<>
			<CreditCard formData={formData} />
			<main className='cardOverflow'>
				<div>
					{validate
						? <CardThanks setFormData={setFormData} animateSlider={animateSlider} />
						: <CardForm setFormData={setFormData} animateSlider={animateSlider} formData={formData} />
					}
				</div>
			</main>
		</>
	)
}
export default App