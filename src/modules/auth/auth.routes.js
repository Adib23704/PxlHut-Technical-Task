import express from 'express'

import { registerUser, loginUser, getMe } from './auth.controller.js'
import { protect } from '../../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

export default router
