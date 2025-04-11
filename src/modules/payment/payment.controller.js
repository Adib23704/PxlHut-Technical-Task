import asyncHandler from 'express-async-handler'

import Payment from '../payment/payment.model.js'
import User from '../user/user.model.js'
import stripe from '../../config/stripe.js'

const makePayment = asyncHandler(async (req, res) => {
	const { amount, paymentMethod } = req.body

	try {
		const user = await User.findById(req.user.id)
		if (!user) {
			res.status(404)
			throw new Error('User not found')
		}

		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount * 100,
			currency: 'usd',
			payment_method: paymentMethod,
			confirm: true,
			description: `Payment for user ${user.name} (${user.email})`,
			automatic_payment_methods: {
				enabled: true,
				allow_redirects: 'never'
			}
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
		res.status(500)
		throw new Error('Payment processing failed')
	}
})

export { makePayment }
