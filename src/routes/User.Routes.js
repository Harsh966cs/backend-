import bodyParser from 'body-parser';
import express from 'express';
import {
    getPublication,
    getAllStudents,
    getStudentById,
    getAllNews,
    getEvents,
    getAnnouncements,
    getNewStudents,
    
  } from "../controller/User/CodaLabData/index.js";
  import {
    getHelloWorld,
    getPublicationsOfSudipRoy,
    getProjects,
  } from "../controller/User/SudipRoySirData/SudiPindex.js";
const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
 
 //This routes from Sudip sir lab
 router.get('/getHelloWorld',getHelloWorld);
 router.get('/getProjects',getProjects);
 router.get('/PublicationsOfSudipRoySir',getPublicationsOfSudipRoy);
 //This routes from coda lab
 router.get('/publication', getPublication);
 router.get('/students', getAllStudents);
 router.get("/students/:id", getStudentById);
 router.get('/news', getAllNews);
 router.get('/events', getEvents);
 router.get('/announcements', getAnnouncements);
 router.get('/newstudents', getNewStudents);


export default router;