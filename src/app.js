import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import { notFound, errorHandler } from './middlewares/error.middleware.js'
import requestLogger from './middlewares/logger.middleware.js'
import connectDB from './config/db.js'
import authRoutes from './modules/auth/auth.routes.js'
import paymentRoutes from './modules/payment/payment.routes.js'
import swaggerDocs from './config/swagger.js'

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100
})
app.use(limiter)

app.use(requestLogger)

swaggerDocs(app)

app.use('/auth', authRoutes)
app.use('/payment', paymentRoutes)

app.get('/', (req, res) => {
	res.status(200).json({ message: 'API is running' })
})

app.use((err, req, res, _next) => {
	console.error(err.stack)
	res.status(500).json({ message: 'Something broke!' })
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, async () => {
	await connectDB()
	console.log(`Server running on port ${PORT}`)
})
