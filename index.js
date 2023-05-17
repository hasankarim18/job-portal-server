const express = require('express')
const cors = require('cors')
require("dotenv").config();
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require("mongodb");


const app = express()

// middle wares
app.use(cors())
app.use(express.json())

const user_name = process.env.USER_NAME;
const password = process.env.DB_PASSWORD; 




const uri =
  `mongodb+srv://${user_name}:${password}@cluster0.nzfxe6e.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const jobPortaldatabase = client.db("jopPortals");
    const allJobs = jobPortaldatabase.collection("jopPosts");
    const navmenus    = jobPortaldatabase.collection('navmenu')
    const skillLists = jobPortaldatabase.collection("skillLists");

    app.get("/alljobs", async (req, res) => {
      try {
         const result = await allJobs.find().toArray();
         res.send(result);
      } catch (error) {
          res.send({error:error, message:"Error"})
      }      
    });

    app.get('/navmenus', async (req, res)=> {
        try {
             const result = await navmenus.find().toArray();
             res.send(result);
        } catch (error) {
             res.send({ error: error, message: "Error" });
        }
    } )

    app.get('/skills', async (req, res)=> {
        try {
            const result = await skillLists.find().toArray();
            res.send(result);
        } catch (error) {
            res.send({ error: error, message: "Error" });
        }
    } )

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  //  await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res)=> {
    res.send('Job portal server is running')
} )


app.listen(port, ()=> {
    console.log("Console job portal");
} )


