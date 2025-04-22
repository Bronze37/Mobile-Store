require('module-alias/register');
const express = require('express');
const sequelize = require('@config/sequelize');
const router = require('@routes/index');
const authRouter = require('@auth/auth.route');

const app = express();

app.use(express.json());

app.use('/api', router);
app.use('/auth', authRouter);

sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error.message);
    });

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
