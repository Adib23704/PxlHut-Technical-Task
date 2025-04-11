import express from 'express'

import { createCheckout } from './payment.controller.js'
import { authCheck } from '../../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/checkout', authCheck, createCheckout)

export default router
