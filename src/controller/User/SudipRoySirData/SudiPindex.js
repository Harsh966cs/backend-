import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';
import { connect, url } from "../../../config/db/index.js";
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';


const app = express();
app.use(bodyParser.json());


const User = new MongoClient(url);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

let isConnected = false;
const connectClient = async () => {
  if (!isConnected) {
    await User.connect();
    isConnected = true;
  }
};

const closeClient = async () => {
  if (isConnected) {
    await User.close();
    isConnected = false;
  }
};




export const getAllStudents = async(req,res)=>{
    try {
        await connectClient();
    } catch (error) {
        
    }
    finally
    {
     await closeClient();
    }
}


// Export app for further use



export const getHelloWorld = (async(req,res)=>{
    try {
        res.status(200).send("Hello World From sir routes")
    } catch (error) {
        res.status(400).send({'message':error})
    }
})


//News and events 

//Announcements

//Teaching 


//Publications 


  export const getPublicationsOfSudipRoy = async (req, res) => {
  try {
    await connectClient(); // Connect to MongoDB

    const database = User.db("Paper"); // Assuming User is your MongoDB client and "Paper" is your database

    // Define collections and their corresponding names
    const collections = [
      { name: "Journals", variableName: "arrayOfJournals" },
      { name: "Conference", variableName: "arrayOfConference" },
      { name: "Books", variableName: "arrayOfBooks" },
      { name: "Workshops", variableName: "arrayOfWorkshops" }
  ];

    // Fetch data for each collection and sort by year
    const results = {};

    // Fetch patent data
    const patentData = database.collection("Patents");

    // Fetch granted patents
    const grantedPatents = await patentData.find({ status: "Granted" }).sort({ date: -1 }).toArray();
    results["arrayOfGrantedPatents"] = grantedPatents;

    // Fetch filed patents
    const filedPatents = await patentData.find({ status: "Filed" }).sort({ date: -1 }).toArray();
    results["arrayOfFiledPatents"] = filedPatents;

    // Fetch data for each collection and sort by year
    for (const collection of collections) {
      const col = database.collection(collection.name);
      results[collection.variableName] = await col.find().sort({ year: -1 }).toArray();
    }

    // Respond with all arrays in a single object
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: error.message });
  } finally {
    await closeClient(); // Close MongoDB connection
  }
}; 


export const getProjects = async (req, res) => {
  try {
    await connectClient(); // Connect to MongoDB

    const database = User.db("Teachings"); 

  
    const results = {};

    // Fetch patent data
    const ProjectsData = database.collection("projects");

    // Fetch granted patents
    const OngoingProjects = await ProjectsData.find({ status: true }).sort({ end_date: -1 }).toArray();
    results["arrayOfOngoingProjects"] = OngoingProjects;

    // Fetch filed patents
    const FundedProjects = await ProjectsData.find({ status: false }).sort({ end_date: -1 }).toArray();
    results["arrayOfFundedProjects"] = FundedProjects;

 

    // Respond with all arrays in a single object
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: error.message });
  } finally {
    await closeClient(); // Close MongoDB connection
  }
}; 
