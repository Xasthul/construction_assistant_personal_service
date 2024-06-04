export default () => ({
    port: parseInt(process.env.PORT),
    jwtSecret: process.env.JWTSECREN,
    dbType: process.env.DB_TYPE,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbDatabase: process.env.DB_DATABSE,
})
