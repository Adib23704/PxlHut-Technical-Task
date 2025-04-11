/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment routes
 */

import express from 'express'

import { createCheckout } from './payment.controller.js'
import { authCheck } from '../../middlewares/auth.middleware.js'
import { paymentValidation, validateRequest } from '../../middlewares/validation.middleware.js'

const router = express.Router()

/**
 * @swagger
 * /payment/checkout:
 *   post:
 *     summary: Create a checkout session
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentRequest'
 *     responses:
 *       201:
 *         description: Checkout session created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/checkout', authCheck, validateRequest(paymentValidation), createCheckout)

export default router
