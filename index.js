const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()


// midleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lyrka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
try{
    await client.connect();
    const collection = client.db("warehouse").collection("supperCar");
}
finally{
    // await client.close();
}
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Hello World')
})

// user:superUser
// password: qNksIzURM4g06YXu



app.get('/inventory', (req, res) => {
    res.send('Inventories');
})

app.listen(port, () => {
    console.log('This is super car server', port)
})