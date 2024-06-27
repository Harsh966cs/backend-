import express from "express";
import bodyParser from 'body-parser';
import 'dotenv/config';
import { connect, url } from "../../../../config/db/index.js";
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import Journal from "../../../../model/Paper/Journals/Journals.js";
import Project from "../../../../model/Teachings/projects/index.js";
import Conference from "../../../../model/Paper/Conference/Conference.js";
import Books from "../../../../model/Paper/Books/Books.js";
import Workshops from "../../../../model/Paper/Workshops/Workshops.js";
import Patents from "../../../../model/Paper/Patents/Patents.js";

import event from "../../../../model/Highlights/events.js"
import news from "../../../../model/Highlights/news.js"
import announcement from "../../../../model/Highlights/announcements.js"

const router = express.Router();
import authentication from "../../../../middleware/authFromTokenForAdmin/index.js";
router.use(authentication);

const app = express();
app.use(bodyParser.json());
app.use(express.json())

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

export const getHelloWorld = (async (req, res) => {
  try {
    res.status(200).send("Hello World")
  } catch (error) {
    res.status(400).send({ 'message': error })
  }
})


// This is for creation in Publication By Admin which have collections are Journal,Conference,Workshops,,Patents2,Books

export const createPublicationJournal = (async (req, res) => {
  try {
    await connectClient();

    const publicationJSON = new Journal(req.body);
    console.log(publicationJSON)
    const savePublications = await publicationJSON.save();
    const database = User.db("Paper")
    const JournalDatabase = database.collection("Journals")
    const serialno = database.collection.find({}, { serialno: 1 }).sort({ serialno: -1 })
    const data = await JournalDatabase.insertOne(savePublications);
    console.log(data)
    res.status(200).send({ data: data });
  } catch (error) {
    res.status(500).send({ 'message': error })
  }
})

export const createPublicationConference = (async (req, res) => {
  try {
    await connectClient();
    const publicationJSON = new Conference(req.body);
    const savePublications = await publicationJSON.save();
    const database = User.db("Paper")
    const ConferenceDatabase = database.collection("Conference")
    const data = await ConferenceDatabase.insertOne(savePublications);
    console.log(data)
    res.status(200).send({ data: data });
  } catch (error) {
    res.status(500).send({ 'message': error })
  }
})


export const createPublicationPatents = (async (req, res) => {
  try {
    await connectClient();
    const publicationJSON = new Patents(req.body);
    const savePublications = await publicationJSON.save();
    const database = User.db("Paper")
    const ConferencePatents = database.collection("Patents")
    const data = await ConferencePatents.insertOne(savePublications);
    console.log(data)
    res.status(200).send({ data: data });
  } catch (error) {
    res.status(500).send({ 'message': error })
  }
})



export const createPublicationBooks = (async (req, res) => {
  try {
    await connectClient();
    const publicationJSON = new Books(req.body);
    console.log(publicationJSON);
    const savePublications = await publicationJSON.save();
    const database = User.db("Paper")
    const JournalDatabase = database.collection("Books");
    const data = await JournalDatabase.insertOne(savePublications);
    console.log(data)
    res.status(200).send({ data: data });
  } catch (error) {
    res.status(500).send({ 'message': error })
  }
})


export const createPublicationWorkshops = (async (req, res) => {
  try {
    await connectClient();
    const publicationJSON = new Workshops(req.body);
    console.log(publicationJSON)
    const savePublications = await publicationJSON.save();
    const database = User.db("Paper")
    const JournalDatabase = database.collection("Workshops")
    const data = await JournalDatabase.insertOne(savePublications);
    console.log(data)
    res.status(200).send({ data: data });
  } catch (error) {
    res.status(500).send({ 'message': error })
  }
})



// This is for updating in Publication By Admin which have collections are Journal,Conference,Workshops,Patents,Books

export const UpdatePublicationBooks = (async (req, res) => {
  try {
    await connectClient();
    const titleFilter = req.params.title;
    const BooksJson = new Books(req.body);
    const database = User.db("Paper");
    const postData = database.collection("Books");
    const result = await postData.findOneAndUpdate(
      { title: { $regex: titleFilter, $options: "i" } },
      {
        $set: {
          serialno: BooksJson.serialno,
          authors: BooksJson.authors,
          title: BooksJson.title,
          additionalInfo: BooksJson.additionalInfo,
          ISBN: BooksJson.ISBN,
          volume: BooksJson.volume,
          pages: BooksJson.pages,
          publishingDate: BooksJson.publishingDate,
          publisher: BooksJson.publisher,
          weblink: BooksJson.weblink
        }
      },
      { returnDocument: 'after' }
    );
    console.log(result)


    res.status(200).send({ updateData: result });
  } catch (error) {
    res.status(500).send({ 'message': error })
  }
})


export const UpdatePublicationConference = (async (req, res) => {
  try {
    await connectClient();
    const titleFilter = req.params.title;
    const publicationJSONConference = new Conference(req.body);
    console.log(titleFilter)
    const database = User.db("Paper");
    const postData = database.collection("Conference");
    const result = await postData.findOneAndUpdate(
      { title: { $regex: titleFilter, $options: "i" } },
      {
        $set: {
          serialno: publicationJSONConference.serialno,
          authors: publicationJSONConference.authors,
          roleInProject: publicationJSONConference.roleInProject,
          title: publicationJSONConference.title,
          conference: publicationJSONConference.conference,
          location: publicationJSONConference.location,
          ranking: publicationJSONConference.ranking,
          DOI: publicationJSONConference.DOI,
          pages: publicationJSONConference.pages,
          additionalInfo: publicationJSONConference.additionalInfo
        }
      },
      { returnDocument: 'after' }
    );

    console.log(result)
    res.status(200).send({ updateData: result });
  } catch (error) {
    res.status(500).send({ 'message': error })
  }
})


export const UpdatePublicationJournal = (async (req, res) => {
  try {
    await connectClient();
    const titleFilter = req.params.title;
    const publicationJSONJournal = new Journal(req.body);
    const database = User.db("Paper");
    const postData = database.collection("Journals");
    const result = await postData.findOneAndUpdate(
      { title: { $regex: titleFilter, $options: "i" } },
      {
        $set: {
          authors: publicationJSONJournal.authors,
          title: publicationJSONJournal.title,
          journal: publicationJSONJournal.journal,
          volume: publicationJSONJournal.volume,
          pages: publicationJSONJournal.pages,
          publishedOn: publicationJSONJournal.publishedOn,
          DOI: publicationJSONJournal.DOI,
          IF: publicationJSONJournal.IF,
          SJR: publicationJSONJournal.SJR,
          additionalInfo: publicationJSONJournal.additionalInfo,
        }
      },
      { returnDocument: 'after' }
    );
    console.log(publicationJSONJournal)
    console.log(result)
    res.status(200).send({ updateData: result });
  } catch (error) {
    res.status(500).send({ 'message': error })
  }
})


export const UpdatePublicationPatents = (async (req, res) => {
  try {
    await connectClient();
    const titleFilter = req.params.title;
    const publicationJSONPatents = new Patents(req.body);
    console.log(titleFilter)
    const database = User.db("Paper");
    const postData = database.collection("Patents");
    const result = await postData.findOneAndUpdate(
      { title: { $regex: titleFilter, $options: "i" } },
      {
        $set: {
          status: publicationJSONPatents.status,
          serialno: publicationJSONPatents.serialno,
          authors: publicationJSONPatents.authors,
          title: publicationJSONPatents.title,
          date: publicationJSONPatents.date,
          pages: publicationJSONPatents.pages,
          patent_number: publicationJSONPatents.patent_number,
          application_number: publicationJSONPatents.application_number,
          publisher: publicationJSONPatents.publisher,
          weblink: publicationJSONPatents.publisher,
          additionalInfo: publicationJSONPatents.additionalInfo,
        }
      },
      { returnDocument: 'after' }
    );

    console.log(result)
    res.status(200).send({ updateData: result });
  } catch (error) {
    res.status(500).send({ 'message': error })
  }
})


export const UpdatePublicationWorkshops = (async (req, res) => {
  try {
    await connectClient();
    const titleFilter = req.params.title;
    const publicationJSONWorkShop = new Workshops(req.body);
    console.log(publicationJSONWorkShop)
    const database = User.db("Paper");
    const postData = database.collection("Workshops");

    const result = await postData.findOneAndUpdate(
      { title: { $regex: titleFilter, $options: "i" } },
      {
        $set: {
          serialno: publicationJSONWorkShop.serialno,
          names: publicationJSONWorkShop.names,
          title: publicationJSONWorkShop.title,
          workshop: publicationJSONWorkShop.workshop,
          pages: publicationJSONWorkShop.pages,
          location: publicationJSONWorkShop.location,
          year: publicationJSONWorkShop.year,
          weblink: publicationJSONWorkShop.weblink,
          ranking: publicationJSONWorkShop.ranking,
          awardedBy: publicationJSONWorkShop.awardedBy,
          additionalInfo: publicationJSONWorkShop.additionalInfo,
        }
      },
      { returnDocument: 'after' }
    );

    res.status(200).send({ updateData: result });
  } catch (error) {
    res.status(500).send({ 'message': error })
  }

})



// This is for deleting in Publication By Admin which have collections are Journal,Conference,Workshops,Patents,Books

export const DeletePublicationBooks = (async (req, res) => {
  try {
    await connectClient();
    const titleFilter = req.params.title;
    const database = User.db("Paper");
    const postData = database.collection("Books");
    const result = await postData.findOneAndDelete(
      { title: { $regex: titleFilter, $options: "i" } },
      { returnDocument: 'after' }
    );
    console.log(result)
    res.status(200).send({ DeleteData: result });
  } catch (error) {
    res.status(500).send({ 'message': error })
  }
})


export const DeletePublicationConference = (async (req, res) => {
  try {
    await connectClient();
    const titleFilter = req.params.title;
    const database = User.db("Paper");
    const postData = database.collection("Conference");
    const result = await postData.findOneAndDelete(
      { title: { $regex: titleFilter, $options: "i" } },
      { returnDocument: 'after' }
    );

    console.log(result)
    res.status(200).send({ DeleteData: result });
  } catch (error) {
    res.status(500).send({ 'message': error })
  }
})


export const DeletePublicationJournal = (async (req, res) => {
  try {
    await connectClient();
    const titleFilter = req.params.title;
    const publicationJSONJournal = new Journal(req.body);
    const database = User.db("Paper");
    const postData = database.collection("Journals");
    const result = await postData.findOneAndDelete(
      { title: { $regex: titleFilter, $options: "i" } },
      { returnDocument: 'after' }
    );
    console.log(publicationJSONJournal)
    console.log(result)
    res.status(200).send({ DeleteData: result });
  } catch (error) {
    res.status(500).send({ 'message': error })
  }
})


export const DeletePublicationPatents = (async (req, res) => {
  try {
    await connectClient();
    const titleFilter = req.params.title;
    console.log(titleFilter)
    const database = User.db("Paper");
    const postData = database.collection("Patents");
    const result = await postData.findOneAndDelete(
      { title: { $regex: titleFilter, $options: "i" } },
      { returnDocument: 'after' }
    );

    console.log(result)
    res.status(200).send({ DeleteData: result });
  } catch (error) {
    res.status(500).send({ 'message': error })
  }
})


export const DeletePublicationWorkshops = (async (req, res) => {
  try {
    await connectClient();
    const titleFilter = req.params.title;
    const database = User.db("Paper");
    const postData = database.collection("Workshops");
    const result = await postData.findOneAndDelete(
      { title: { $regex: titleFilter, $options: "i" } },
      { returnDocument: 'after' }
    );
    res.status(200).send({ DeleteData: result });
  } catch (error) {
    res.status(500).send({ 'message': error })
  }

})

// This is for creation in projects By Admin which have collections are projects


export const createProjects = (async (req, res) => {
  try {
    await connectClient();
    const publicationJSON = new Project(req.body);
    const savePublications = await publicationJSON.save();
    const database = User.db("Teachings")
    const JournalDatabase = database.collection("projects")
    const data = await JournalDatabase.insertOne(savePublications);
    console.log(data)
    res.status(200).send({ data: data });
  } catch (error) {
    res.status(500).send({ 'message': error })
  }
})


export const updateProject = (async (req, res) => {
  try {
    await connectClient();
    const titleFilter = req.params.title;
    const { projectTitle, typeOfProject, roleInProject, sponsors, collaboration, total_grant_inr, total_grant_usd, duration, additionalInfo } = req.body;

    console.log(titleFilter)
    const database = User.db("Teachings");
    const postData = database.collection("projects");

    const result = await postData.findOneAndUpdate(
      { projectTitle: { $regex: titleFilter, $options: "i" } },
      {
        $set: { projectTitle, typeOfProject, roleInProject, sponsors, collaboration, total_grant_inr, total_grant_usd, duration, additionalInfo }
      },
      { returnDocument: 'after' }
    );


    res.status(200).send({ updateData: result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  } finally {
    await closeClient();
  }
})



export const DeleteProject = (async (req, res) => {
  try {
    await connectClient();
    const titleFilter = req.params.title;
    console.log(titleFilter)
    const database = User.db("Teachings");
    const postData = database.collection("projects");

    const result = await postData.findOneAndDelete(
      { projectTitle: { $regex: titleFilter, $options: "i" } },
      { returnDocument: 'after' }
    );

    console.log(result)
    res.status(200).send({ updateData: result, Document: "delete" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  } finally {
    await closeClient();
  }
})



// This is for creation in Events By Admin which have collections are events.

// Create an Event
export const createEvent = async (req, res) => {
  try {
    await connectClient();
    const database = User.db("Highlights")
    // const eventsCollection = database.collection("events")
    const { year, month, day, eventDescription, url } = req.body;
    const eventDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0)); // month - 1 because month is zero-indexed in Date

    const newEvent = new event({
      date: eventDate,
      eventDescription,
      url
    });

    try {
      const savedEvent = await newEvent.save();
      res.status(201).json(savedEvent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  catch (error) {
    res.status(500).send({ message: error.message });
  } finally {
    await closeClient();
  }
}

// Update an Event
export const updateEvent = async (req, res) => {
  try {
    await connectClient();
    const database = User.db("Highlights")
    // const eventsCollection = database.collection("events")
    const { id } = req.params;
    const { year: newYear, month: newMonth, day: newDay, eventDescription, url } = req.body;

    const newDate = new Date(Date.UTC(newYear, newMonth - 1, newDay, 0, 0, 0));

    try {
      const Event = await event.findById(id);

      if (!Event) {
        return res.status(404).json({ message: "Event not found" });
      }

      Event.eventDescription = eventDescription;
      Event.url = url;
      Event.date = newDate;
      Event.updatedAt = new Date();

      const updatedEvent = await Event.save();
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
  finally {
    await closeClient();
  }

};

// Delete an Event
export const deleteEvent = async (req, res) => {
  try {
    await connectClient();
    const database = User.db("Highlights")
    // const eventsCollection  = database.collection("events")
    const { id } = req.params;

    try {
      const Event = await event.findById(id);

      if (!Event) {
        return res.status(404).json({ message: "Event not found" });
      }

      await Event.deleteOne({ _id: event._id });
      res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  } catch (error) {
    res.status(500).send({ message: error.message });
  } finally {
    await closeClient();
  }
};



// This is for creation in News By Admin which have collections are news.

// Create News
export const createNews = async (req, res) => {
  try {
    await connectClient();
    const database = User.db("Highlights")
    // const newsCollection = database.collection("news")
    const { year, month, day, newsTopic, newsDescription, urlToImage, url } = req.body;
    const createdAt = new Date(Date.UTC(year, month - 1, day, 0, 0, 0)); // month - 1 because month is zero-indexed in Date

    const newNews = new news({
      newsTopic,
      createdAt,
      newsDescription,
      urlToImage,
      url
    });

    try {
      const savedNews = await newNews.save();
      res.status(201).json(savedNews);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

  } catch (error) {
    res.status(500).send({ message: error.message });
  } finally {
    await closeClient();
  }
};

// Update News
export const updateNews = async (req, res) => {
  try {
    await connectClient();
    const database = User.db("Highlights")
    // const newsCollection = database.collection("news")
    const { id } = req.params;
    const { newsTopic, newsDescription, urlToImage, url } = req.body;

    try {
      const News = await news.findById(id);

      if (!News) {
        return res.status(404).json({ message: "News not found" });
      }

      News.newsTopic = newsTopic;
      News.newsDescription = newsDescription;
      News.urlToImage = urlToImage;
      News.url = url;
      News.updatedAt = new Date(); // Update updatedAt to current date

      const updatedNews = await News.save();
      res.status(200).json(updatedNews);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
  finally {
    await closeClient();
  }
};

// Delete News
export const deleteNews = async (req, res) => {
  try {
    await connectClient();
    const database = User.db("Highlights")
    // const newsCollection = database.collection("news")
    const { id } = req.params;

    try {
      const News = await news.findById(id);

      if (!News) {
        return res.status(404).json({ message: "News not found" });
      }

      await News.deleteOne({ _id: news._id });
      res.status(200).json({ message: "News deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
  finally {
    await closeClient();
  }
};



// This is for creation in Announcements By Admin which have collections are announcements.

// Create Announcement

export const createAnnouncement = async (req, res) => {
  try {
    await connectClient();
    const database = User.db("Highlights")
    // const announcementsCollection = database.collection("announcements")
    const { year, month, day, topicOfAnnouncement, readMore } = req.body;
    const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0)); // month - 1 because month is zero-indexed in Date

    const newAnnouncement = new announcement({
      date,
      topicOfAnnouncement,
      readMore
    });

    try {
      const savedAnnouncement = await newAnnouncement.save();
      res.status(201).json(savedAnnouncement);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

  } catch (error) {
    res.status(500).send({ message: error.message });
  } finally {
    await closeClient();
  }
};

// Update Announcement
export const updateAnnouncement = async (req, res) => {
  try {
    await connectClient();
    const database = User.db("Highlights")
    // const announcementsCollection = database.collection("announcements")
    const { id } = req.params;
    const { year: newYear, month: newMonth, day: newDay, topicOfAnnouncement, readMore } = req.body;

    const newDate = new Date(Date.UTC(newYear, newMonth - 1, newDay, 0, 0, 0)); // new date for the announcement

    try {
      const Announcement = await announcement.findById(id);

      if (!Announcement) {
        return res.status(404).json({ message: "Announcement not found" });
      }

      Announcement.topicOfAnnouncement = topicOfAnnouncement;
      Announcement.readMore = readMore;
      Announcement.date = newDate; // update date

      const updatedAnnouncement = await Announcement.save();
      res.status(200).json(updatedAnnouncement);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  } finally {
    await closeClient();
  }
};

// Delete Announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    await connectClient();
    const database = User.db("Highlights")
    // const announcementsCollection = database.collection("announcements")
    const { id } = req.params;

    try {
      const Announcement = await announcement.findById(id);

      if (!Announcement) {
        return res.status(404).json({ message: "Announcement not found" });
      }

      await Announcement.deleteOne({ _id: announcement._id });
      res.status(200).json({ message: "Announcement deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  } catch (error) {
    res.status(500).send({ message: error.message });
  } finally {
    await closeClient();
  }

};
