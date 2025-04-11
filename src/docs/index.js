import authSchemas from './auth.schemas.js'
import paymentSchemas from './payment.schemas.js'

const schemas = {
	...authSchemas,
	...paymentSchemas
}

export default schemas
