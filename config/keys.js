module.exports = {
    mongoLocal: 'mongodb://localhost:27017/hr_admin',
    mongoURI: 'mongodb://userName:Password',
    mongoHR_Tool3: 'mongodb+srv://sargis:qwert1234@cluster0.xnxcl.mongodb.net/userRequests',
    jwt: {
        secret: 'dev-jwt',
        tokens: {
            access: {
                type: 'access',
                expiresIn: '4h',
            },
            refresh: {
                type: 'refresh',
                expiresIn: '365d',
            },
        }
    }
}