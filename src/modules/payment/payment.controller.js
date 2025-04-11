/* eslint-disable no-unused-vars */
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
	} catch (error) {
		res.status(500)
		throw new Error('Payment processing failed')
	}
})

const createCheckout = asyncHandler(async (req, res) => {
	const { amount } = req.body

	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: {
							name: `Order for user ${req.user.name} (${req.user.email})`
						},
						unit_amount: amount * 100
					},
					quantity: 1
				}
			],
			mode: 'payment',
			customer_email: req.user.email,
			success_url: `${process.env.FRONTEND_URL}/payment/payment-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.FRONTEND_URL}/payment/payment-cancelled`
		})

		res.status(200).json({ url: session.url })
	} catch (error) {
		res.status(500)
		throw new Error('Failed to create checkout session')
	}
})

const paymentSuccess = asyncHandler(async (req, res) => {
	const { session_id } = req.query

	if (!session_id) {
		return res.status(400).send('Missing session ID')
	}

	try {
		const session = await stripe.checkout.sessions.retrieve(session_id)

		const exists = await Payment.findOne({ transactionId: session.id })
		if (exists) {
			return res.send('<h2>✅ Payment already processed</h2>')
		}

		const user = await User.findOne({ email: session.customer_email })

		if (!user) {
			return res.status(404).send('User not found')
		}

		await Payment.create({
			user: user._id,
			amount: session.amount_total / 100,
			currency: session.currency,
			status: session.payment_status,
			transactionId: session.id,
			paymentMethod: 'stripe_checkout'
		})

		res.send('<h2>✅ Payment successful and recorded!</h2>')
	} catch (error) {
		res.status(500)
		throw new Error('Failed to process payment success')
	}
})

export { makePayment, createCheckout, paymentSuccess }
