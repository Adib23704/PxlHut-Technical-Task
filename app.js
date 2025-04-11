import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
	res.status(200).json({ message: 'API is running' })
})

// Error handling middleware
app.use((err, req, res, _next) => {
	console.error(err.stack)
	res.status(500).json({ message: 'Something broke!' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
