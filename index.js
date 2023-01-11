const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoute = require('./routes/product.route');
const userRoute = require('./routes/user.route');
const checkoutRoute = require('./routes/checkout.route');
const orderRoute = require('./routes/order.route');
const adminRoute = require('./routes/admin.route');
const promotionRoute = require('./routes/promotion.route');

const app = express()
const port = process.env.PORT || 3500
const DB = process.env.MONGO_URL

mongoose.connect(
 DB, 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    dbName: 'digitalchief-db',
    useFindAndModify: false
  }
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/products', productRoute);
app.use('/user', userRoute);
app.use('/checkout', checkoutRoute);
app.use('/order', orderRoute);
app.use('/admin', adminRoute);
app.use('/promotion', promotionRoute);


app.get('/', (req, res) => res.send('Welcome to DigitalChief, Inc. backend API server!'))

app.listen(port, () => {
  console.log(`Backend app listening at http://localhost:${port}`)
});