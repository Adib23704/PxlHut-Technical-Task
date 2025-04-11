const paymentSchemas = {
	PaymentRequest: {
		type: 'object',
		required: ['amount', 'paymentMethod'],
		properties: {
			amount: { type: 'number', example: 25.99 },
			paymentMethod: { type: 'string', example: 'pm_card_visa' }
		}
	}
}

export default paymentSchemas
