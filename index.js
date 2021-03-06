const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const objectId = require('mongodb').ObjectId;
require('dotenv').config()


// midleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lyrka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const collection = client.db("warehouse").collection("supperCar");

        app.get('/inventory', async (req, res) => {
            const query = {};
            const cursor = collection.find(query);
            const inventories = await cursor.toArray();
            res.send(inventories)
        })

        app.post("/inventory", async (req, res) => {
            const newQuantity = req.body;
            console.log('Restoking new cars', (newQuantity));
            const result = await collection.insertOne(newQuantity);
            res.send(result)
        })

        app.delete('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await collection.deleteOne(query);
            res.send(result);
        })
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Hello World')
})

// user:superUser
// password: qNksIzURM4g06YXu



app.get('/inventories', (req, res) => {
    res.send('Inventories');
})

app.listen(port, () => {
    console.log('This is super car server', port)
})