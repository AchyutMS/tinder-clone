import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors';

import cards from './dbCards.js';

//App Config
const app = express();
const port = process.env.PORT || 8001

//ENTER THE MONGO DB CONNECTION URL BELOW
const connection_url = ''

//Middlewares
app.use(express.json());
app.use(Cors());

//DB Config
mongoose.connect(connection_url)

//API Endpoints
app.get('/', (req,res) => res.status(200).send('Hello World'));

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

app.get('/tinder/cards', (req, res) => {

    cards.find((err, data) => {
        if (err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

//Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));