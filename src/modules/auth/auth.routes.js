import express from 'express'

import { registerUser, loginUser, getMe } from './auth.controller.js'
import { authCheck } from '../../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', authCheck, getMe)

export default router
