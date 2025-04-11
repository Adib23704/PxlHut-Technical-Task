import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import schemas from '../docs/index.js'

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'PxlHut Test API',
			version: '1.0.0',
			description: 'Demo Backend API for PxlHut Technical Task'
		},
		servers: [
			{
				url: `${process.env.BACKEND_URL}:${process.env.PORT || 3000}`
			}
		],
		components: {
			securitySchemes: {
				BearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT'
				}
			},
			schemas
		}
	},
	apis: ['./src/modules/**/*.js']
}

const swaggerSpec = swaggerJsdoc(options)

const swaggerDocs = app => {
	app.use(
		'/docs',
		swaggerUi.serve,
		swaggerUi.setup(swaggerSpec, {
			swaggerOptions: {
				persistAuthorization: true
			}
		})
	)
	console.log('Swagger docs available at /docs')
}

export default swaggerDocs
