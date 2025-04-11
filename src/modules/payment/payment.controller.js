import asyncHandler from 'express-async-handler'

import Payment from '../payment/payment.model.js'
import stripe from '../../config/stripe.js'

const createCheckout = asyncHandler(async (req, res) => {
	const { amount, paymentMethod } = req.body

	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount * 100,
			currency: 'usd',
			payment_method: paymentMethod,
			confirm: true,
			description: `Payment for user ${req.user.id}`
		})

		const payment = await Payment.create({
			user: req.user.id,
			amount,
			currency: 'usd',
			status: paymentIntent.status,
			paymentMethod,
			transactionId: paymentIntent.id
		})

		res.status(201).json({
			success: true,
			payment,
			clientSecret: paymentIntent.client_secret
		})
		// eslint-disable-next-line no-unused-vars
	} catch (error) {
		throw new Error('Payment processing failed')
	}
})

export { createCheckout }
