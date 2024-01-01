const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const short = require("short-uuid");
const { authenticateUser, verifyToken } = require("./auth");
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const handleDateFormat = () => {
  const date = new Date();
  const formattedDate = new Date(date).toLocaleDateString();
  return formattedDate;
};


const generateDummyData = (count) => {
  const dummyData = [];

  for (let i = 0; i < count; i++) {
    const firstName = `First${i}`;
    const lastName = `Last${i}`;
    const age = Math.floor(Math.random() * 50) + 20;
    const tcNumber = Math.floor(Math.random() * 100000000000).toString().padStart(11, '0');
    const applicationReason = `Reason${i}`;
    const applicationDate = handleDateFormat();
    const address = `Address${i}`;
    const attachments = `file${i}.pdf`;
    const id = short.generate();

    const data = {
      firstName,
      lastName,
      age,
      tcNumber,
      applicationReason,
      applicationDate,
      address,
      attachments,
      id
    };

    dummyData.push(data);
  }

  return dummyData;
};

const savedApplications = generateDummyData(50);
const savedAnswers = [];



app.post("/api/saveApplication", (req, res) => {
  const formData = req.body;
  const id = short.generate(); 
  const applicationDate = handleDateFormat();

  console.log("Gelen Form Verisi:", formData);


  const applicationData = {
    ...formData,
    id,
    applicationDate
  };

  savedApplications.push(applicationData);

  res.json({ success: true, id, message: "Başvuru başarıyla kaydedildi." });
});

app.get("/api/savedApplications", (req, res) => {
  res.json(savedApplications);
});

app.get("/api/savedApplications/:id", (req, res) => {
  const id = req.params.id;
  const application = savedApplications.find(
    (application) => application.id === id
  );
  res.json(application);
});


app.post("/api/saveAnswer", (req, res) => {
  const answerData = req.body;
  const { id, answer } = answerData;

  const existingAnswerIndex = savedAnswers.findIndex(
    (savedAnswer) => savedAnswer.id === id
  );

  if (existingAnswerIndex !== -1) {
    savedAnswers[existingAnswerIndex] = { id, answer };
  } else {
    savedAnswers.push(answerData);
  }

  res.json({ success: true, message: "Cevap başarıyla kaydedildi." });
});


app.get("/api/savedAnswers/:id", (req, res) => {
  const id = req.params.id;
  const savedAnswer = savedAnswers.find((savedAnswer) => savedAnswer.id === id);
  res.json(savedAnswer);
});

app.get("/api/savedAnswers", (req, res) => {
  res.json(savedAnswers);
});

app.delete("/api/savedApplications/:id", (req, res) => {
  const id = req.params.id;
  const index = savedApplications.findIndex(app => app.id === id);

  if (index !== -1) {
    savedApplications.splice(index, 1);
    res.json({ success: true, message: "Application deleted successfully." });
  } else {
    res.status(404).json({ success: false, message: "Application not found." });
  }
});

app.delete("/api/savedAnswers/:id", (req, res) => {
  const id = req.params.id;
  const index = savedAnswers.findIndex(answer => answer.id === id);

  if (index !== -1) {
    savedAnswers.splice(index, 1);
    res.json({ success: true, message: "Answer deleted successfully." });
  } else {
    res.status(404).json({ success: false, message: "Answer not found." });
  }
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const result = authenticateUser(username, password);

  res.json(result);
});

app.get("/api/isLoggedIn", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.json({ success: false, error: "Token not provided" });
    return;
  }

  const result = verifyToken(token);
  res.json(result);
});

app.get("/api/admins", (req, res) => {
  res.json(admins);
});



app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor.`);
});
