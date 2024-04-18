const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/router');
const sequelize = require('./config/database');
const User = require('./model/userModel'); 

const app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

const PORT = process.env.PORT || 5001;
(async () => {
    try {
        await sequelize.sync();
        console.log('Models synced with database.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error syncing models with database: ', error);
    }
})();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
