const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');
const { Product } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);


// Sync Sequelize models to the database
sequelize.sync({ force: false }).then(() => {
  console.log('All models have been synced to the database!');
});

// // create Product table if it doesn't exist
// Product.sync();


// start server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
