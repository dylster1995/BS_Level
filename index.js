const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const sequelize = require('./db');
const Reading = require('./models/bloodsugar');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', "ejs");
app.set('views', path.join(__dirname, 'views'));
async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connectDB();

app.get('/', async (req, res) => {
    const { user } = req.query;
    const query = await Reading.findAll({
        attributes: ['createdAt', 'bloodsugar'],
        order: [
            ['createdAt', 'ASC'],
        ],
    });
    let data = JSON.parse(JSON.stringify(query)).map((el) => {
        return [el.createdAt, el.bloodsugar];
    });
    data.unshift(['DateTime', 'BSLevel']);
    data = JSON.stringify(data);
    let date = new Date(Date.now());
    const today = date.toISOString().split('T')[0];
    date.setDate(date.getDate() - 6);
    const weekAgo = date.toISOString().split('T')[0];
    if (user == 'susan'){
        res.render('index', {user, data, today, weekAgo, superdate: date})
        return;
    }
    res.render('index', {user: '', data, today, weekAgo});
});
app.post('/', (req, res) => {
    const { bloodsugar } = req.body;


    if (!bloodsugar) { res.send('bad data'); return; }

    Reading.create({
        bloodsugar
    }).then(res => {
        console.log(res)
    }).catch((error) => {
        console.error('Failed to create a new record : ', error);
    });

    res.redirect('/');
});

app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}.`);
});
