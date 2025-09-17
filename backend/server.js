require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const User = require("./models/user.model")
const app = require("./app");

app.use(express.json())
 
 
const PORT =  3000;
const MONGODB_URI = process.env.MONGODB_URI;
async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Connexion to MongoDB failed:", err.message);
    process.exit(1); 
  }
}
start();


/* routes test
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)

    }catch (error){
        res.status(500).json({message: error.message})

    }
})

app.post('/api/users', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)

    }catch (error){
        res.status(500).json({message: error.message})

    }
})
*/
