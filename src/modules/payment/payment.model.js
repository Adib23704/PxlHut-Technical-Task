import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	currency: {
		type: String,
		default: 'usd'
	},
	status: {
		type: String,
		default: 'pending'
	},
	paymentMethod: String,
	transactionId: String,
	createdAt: {
		type: Date,
		default: Date.now
	}
})

export default mongoose.model('Payment', paymentSchema)
