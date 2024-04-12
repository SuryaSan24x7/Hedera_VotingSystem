// const mongoose = require("mongoose")
// mongoose.set('strictQuery', false);
// mongoose.connect("mongodb://127.0.0.1:27017/voting")
//     .then(() => {console.log("Database Connected")})
//     .catch((err) => {
//         console.log("Database Connection Failed")
//         console.log(err)
//     })

// const mongoose = require("mongoose");

// async function connectToDatabase() {
//   try {
//     mongoose.set('strictQuery', false);
//     await mongoose.connect("mongodb://127.0.0.1:27017/voting");
//     console.log("Database Connected");
//   } catch (error) {
//     console.log("Database Connection Failed");
//     console.log(error);
//   }
// }

// connectToDatabase();

require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
