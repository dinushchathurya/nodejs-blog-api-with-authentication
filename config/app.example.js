require('dotenv').config();

if (process.env.APP_ENVIRONMENT === 'production') {
    module.exports = {
        app: {
            environment: "production",
            database_uri: "",
        }
    };
} else {
    module.exports = {
        app: {
            environment: "development",
            database_uri: ""
        }
    };
}
