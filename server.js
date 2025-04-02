require('module-alias/register');
const express = require('express');
const productRoute = require('@routes/product.route');

const app = express();

app.use(express.json());

app.use('/api/products', productRoute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
