import '../styles/CardForm.css'

export default function CardForm ({ setFormData, formData, animateSlider }) {
	const handleInput = (e) => {
		const { name, value } = e.target
		if (name === 'number') e.target.value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
		if (name === 'mm' || name === 'yy') e.target.value = value.toString().replace(/[^0-9]/g, '').substring(0, 2)
		if (name === 'mm' && value > 12) e.target.value = '12'
		if (name === 'cvc') e.target.value = value.substring(0, 4)

		setFormData({ ...formData, [name]: e.target.value })
	}

	const handleError = (target, message = 'Error', type = 'add') => {
		if (type === 'add') {
			const submitBtn = document.querySelector('.btn-submit')
			submitBtn.classList.add('shake')
			submitBtn.addEventListener('animationend', () => submitBtn.classList.remove('shake'))
		}

		document.querySelector(`.label${target}`).nextElementSibling.innerHTML = message
		document.querySelector(`.label${target}`).nextElementSibling.classList[type === 'add' ? 'remove' : 'add']('info--hidden')
		document.querySelector(`[name="${target}"]`).classList[type]('input--error')
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		for (const i in formData) {
			if (!formData[i]) {
				handleError(i, 'Can`t be blank')
			} else handleError(i, '', 'remove')
		}

		if (formData.number) {
			if (formData.number.length < 19) {
				handleError('number', 'Number is too short')
			} else if (formData.number.match(/[^0-9\s]/g)) {
				handleError('number', 'Wrong format, numbers only')
			} else handleError('number', '', 'remove')
		}

		if (formData.cvc) {
			if (formData.cvc.length < 3) {
				handleError('cvc', 'CVC is too short')
			} else handleError('cvc', '', 'remove')
		}

		if (!formData.mm) handleError('mm', 'Can`t be blank')
		if (!formData.yy) handleError('yy', 'Can`t be blank')

		if (document.querySelectorAll('.input--error').length === 0) animateSlider(true)
	}

	return (
		<form className='cardForm' onSubmit={handleSubmit}>
			<label className='labelname'>
				Cardholder Name
				<input type='text' placeholder='e.g. Jane Appleseed' onChange={handleInput} name='name' className='card-input' />
			</label>
			<p className='info info--hidden' aria-live='polite'></p>

			<label className='labelnumber'>
				Card Number
				<input type='text' placeholder='e.g. 1234 5678 9123 0000' onChange={handleInput} name='number' className='card-input' minLength={19} />
			</label>
			<p className='info info--hidden' aria-live='polite'></p>

			<div className='cvc-mmyy'>
				<label className='labelmm labelyy'>
					Exp. Date (MM/YY)
					<div>
						<input type='text' placeholder='MM' onChange={handleInput} name='mm' className='card-input' />
						<input type='text' placeholder='YY' onChange={handleInput} name='yy' className='card-input' />
					</div>
				</label>
				<p className='info info--hidden' aria-live='polite'></p>

				<label className='labelcvc'>
					CVC
					<input type='text' placeholder='e.g. 123' onChange={handleInput} name='cvc' className='card-input' />
				</label>
				<p className='info info--hidden' aria-live='polite'></p>
			</div>

			<button type='submit' className='btn-submit btn-primary'>Confirm</button>
		</form>
	)
}
