const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoute = require('../server/routes/product.route');
const userRoute = require('../server/routes/user.route');
const checkoutRoute = require('../server/routes/checkout.route');
const orderRoute = require('../server/routes/order.route');
const adminRoute = require('../server/routes/admin.route');
const promotionRoute = require('../server/routes/promotion.route');

const app = express()
const port = process.env.PORT || 5000
const DB = process.env.MONGO_URL

mongoose.connect(
 DB, 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    dbName: 'digitalchief-db'
  }
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/Products', productRoute);
app.use('/user', userRoute);
app.use('/checkout', checkoutRoute);
app.use('/order', orderRoute);
app.use('/admin', adminRoute);
app.use('/promotion', promotionRoute);


app.get('/', (req, res) => res.send('Welcome to DigitalChief, Inc. backend! This is a API REST datbase server...'))

app.listen(port, () => {
  console.log(`Backend app listening at http://localhost:${port}`)
});