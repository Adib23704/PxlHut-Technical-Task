const authSchemas = {
	RegisterUser: {
		type: 'object',
		required: ['name', 'email', 'password'],
		properties: {
			name: { type: 'string', example: 'Adib' },
			email: { type: 'string', example: 'adib@example.com' },
			password: {
				type: 'string',
				example: 'Password123!',
				minLength: 6,
				description:
					'Password must be at least 6 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character'
			},
			role: {
				type: 'string',
				enum: ['user', 'admin'],
				default: 'user',
				description: "Role of the user, available roles are 'user' and 'admin'"
			}
		}
	},
	LoginUser: {
		type: 'object',
		required: ['email', 'password'],
		properties: {
			email: { type: 'string', example: 'adib@example.com' },
			password: { type: 'string', example: 'Password123!' }
		}
	},
	RefreshToken: {
		type: 'object',
		required: ['refreshToken'],
		properties: {
			refreshToken: { type: 'string', example: 'your-refresh-token' }
		}
	}
}

export default authSchemas
