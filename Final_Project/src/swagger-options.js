export const swaggerOptions = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'API Documentation',
            description: 'Information endpoints'
        }
    },
    apis: ['src/docs/api/**/*.yaml']
}