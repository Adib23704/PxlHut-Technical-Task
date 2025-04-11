import express from 'express'

import { createCheckout } from './payment.controller.js'
import { authCheck } from '../../middlewares/auth.middleware.js'
import { paymentValidation, validateRequest } from '../../middlewares/validation.middleware.js'

const router = express.Router()

router.post('/checkout', authCheck, validateRequest(paymentValidation), createCheckout)

export default router
