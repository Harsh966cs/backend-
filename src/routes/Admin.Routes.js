import bodyParser from 'body-parser';
import express from 'express';
import {
    createPublicationJournal,
    createPublicationBooks,
    createPublicationConference,
    getHelloWorld, createProjects,
    updateProject, DeleteProject,
    createPublicationWorkshops,
    createPublicationPatents,
    UpdatePublicationBooks,
    UpdatePublicationConference, 
    UpdatePublicationJournal, 
    UpdatePublicationPatents, 
    UpdatePublicationWorkshops,
    DeletePublicationConference,
    DeletePublicationPatents,
    DeletePublicationJournal,
    DeletePublicationBooks,
    DeletePublicationWorkshops,
    createEvent,
    updateEvent,
    deleteEvent,
    createNews,
    updateNews,
    deleteNews,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
} from '../controller/Admin/actions/Admin/index.js';
import AdminAutheatioaction from '../middleware/authFromTokenForAdmin/index.js'

const router = express.Router();


// router.use(AdminAutheatioaction);
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//This is for Publications
router.post('/createPublication/Journal', createPublicationJournal);
router.post('/createPublication/Books', createPublicationBooks);
router.post('/createPublication/Conference', createPublicationConference);
router.post('/createPublication/Workshops', createPublicationWorkshops)
router.post('/createPublication/Patent', createPublicationPatents);
//for update
router.put('/UpdatePublication/Journal/:title', UpdatePublicationJournal);
router.put('/UpdatePublication/Books/:title', UpdatePublicationBooks);
router.put('/UpdatePublication/Conference/:title', UpdatePublicationConference);
router.put('/UpdatePublication/Workshops/:title', UpdatePublicationWorkshops)
router.put('/UpdatePublication/Patent/:title', UpdatePublicationPatents);

//for delete
router.delete('/DeletePublication/Journal/:title', DeletePublicationJournal);
router.delete('/DeletePublication/Books/:title', DeletePublicationBooks);
router.delete('/DeletePublication/Conference/:title', DeletePublicationConference);
router.delete('/DeletePublication/Workshops/:title', DeletePublicationWorkshops)
router.delete('/DeletePublication/Patent/:title', DeletePublicationPatents);


//This is for project
router.post('/createProject', createProjects);
router.put('/updateProject/:title', updateProject);
router.delete('/DeleteProject/:title', DeleteProject);
router.get('/helloWorld', getHelloWorld);

// This is for events

router.post('/createEvent', createEvent);
router.put('/updateEvent/:id', updateEvent);
router.delete('/deleteEvent/:id', deleteEvent);

// This is for announcements

router.post('/createAnnouncement', createAnnouncement);
router.put('/updateAnnouncement/:id', updateAnnouncement);
router.delete('/deleteAnnouncement/:id', deleteAnnouncement);

// This is for news
router.post('/createNews', createNews);
router.put('/updateNews/:id', updateNews);
router.delete('/deleteNews/:id', deleteNews);

export default router;