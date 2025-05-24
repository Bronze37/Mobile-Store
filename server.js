require('module-alias/register');
const express = require('express');
const sequelize = require('@config/sequelize');
require('@models/index.model');
const router = require('@routes/index');
const authRouter = require('@auth/auth.route');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);
app.use('/auth', authRouter);

sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error.message);
    });

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});