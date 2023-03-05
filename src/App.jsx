import { useState } from 'react'
import CardThanks from './components/CardThanks'
import CardForm from './components/CardForm'
import CardCredit from './components/CardCredit'
import './styles/App.css'

function App () {
	const [formData, setFormData] = useState({ name: null, number: null, mm: null, yy: null, cvc: null })
	const [validate, setValidate] = useState(false)

	const animateSlider = (validate) => {
		const axis = window.matchMedia('(max-width: 750px)').matches ? 'Y' : 'X'
		document.querySelector('.cardOverflow > div').style.transform = `translate${axis}(50${axis === 'Y' ? 'vh' : 'vw'})`

		document.body.classList.add('body-slider')

		setTimeout(() => {
			setValidate(validate)
			document.body.classList.remove('body-slider')
			document.querySelector('.cardOverflow > div').style.transform = 'translate(0)'
		}, 500)
	}

	return (
		<>
			<CardCredit formData={formData} />
			<main className='cardOverflow'>
				<div>
					{validate
						? <CardThanks setFormData={setFormData} animateSlider={animateSlider} />
						: <CardForm setFormData={setFormData} animateSlider={animateSlider} formData={formData} />
					}
				</div>
			</main>
			<footer className='attribution'>
				<p>Made with ♥️ by <a href='https://github.com/cosmoart' target='_blank' rel='noopener noreferrer'>Cosmo</a> - <a href='https://github.com/cosmoart/Interactive-card-details-form' target='_blank' rel='noopener noreferrer'>Repository</a>
				</p>
			</footer>
		</>
	)
}
export default App
