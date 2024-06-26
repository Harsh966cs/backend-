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
    getASinglePublicationOnBasisTitleBooks,
    getASinglePublicationOnBasisTitleConference,
    getASinglePublicationOnBasisTitleJournal,
    getASinglePublicationOnBasisTitlePatents,
    getASinglePublicationOnBasisTitleWorkshops
    
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
//Get only one document by title
router.get('/getASinglePublication/Journal/:title',getASinglePublicationOnBasisTitleJournal);
router.get('/getASinglePublication/Books/:title',getASinglePublicationOnBasisTitleBooks);
router.get('/getASinglePublication/Conference/:title',getASinglePublicationOnBasisTitleConference);
router.get('/getASinglePublication/Workshops/:title',getASinglePublicationOnBasisTitleWorkshops);
router.get('/getASinglePublication/Patent/:title',getASinglePublicationOnBasisTitlePatents);
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



export default router;