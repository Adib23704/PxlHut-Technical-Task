/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment routes
 */

import express from 'express'

import { makePayment } from './payment.controller.js'
import { authCheck } from '../../middlewares/auth.middleware.js'
import { paymentValidation, validateRequest } from '../../middlewares/validation.middleware.js'

const router = express.Router()

/**
 * @swagger
 * /payment/make-payment:
 *   post:
 *     summary: Make a direct payment
 *     tags: [Payment]
 *     security:
 *       - BearerAuth: []
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
router.post('/make-payment', authCheck, validateRequest(paymentValidation), makePayment)

export default router
