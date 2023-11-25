const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const OpenAI = require('openai');

const SystemPrompt = `
You're a knowledgeable tutor specialized in various subjects.
Respond to user inquiries with comprehensive and accurate information related to their academic queries.
Be concise and informative to assist them effectively in their studies.
`;
const defaultTopics = [
	{ name: "Physics", url: "https://www.youtube.com/embed/8dRPzktsaU8?si=uwrt8XpqktDhOTgD"},
	{ name: "Chemistry", url: "https://www.youtube.com/embed/LpsYlYM-o0Y?si=_SnEy2oh-4g-yHbg"},
	{ name: "Biology", url: "https://www.youtube.com/embed/CbZLcwuQJdA?si=PgYv9YJtvJPankpe"},
	{ name: "Maths", url: "https://www.youtube.com/embed/jD2InfX_96I?si=NtHBEMM_5ITTeQV3"},
];

const openai = new OpenAI({
    apiKey: `${process.env.OPENAI_API_KEY}`,
});

// Connect to the MongoDB database
mongoose.connect(
  process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/topicsDB',
);

// Define a Topic model
const topicSchema = new mongoose.Schema({
  name: String,
  url: String
});
const Topic = mongoose.model('Topic', topicSchema);

const app = express();
app.use(cors());
app.use(express.json());

// Mock user for the purpose of this example
const users = [
  {
    id: 1,
    username: "user",
    password: bcrypt.hashSync("password", 2), // hashing password for security reasons
  },
  // Add additional users as needed
];

app.get('/api/init', async (_req, res) => {
  try {
    await Topic.insertMany(defaultTopics);
    res.json({ message: "Topics added" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// API endpoint to get topics
app.get('/api/topics', async (_req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (error) {
    res.status(500).send(error);
  }
});

// API endpoint to get a topic by name
app.get('/api/topic/:name', async (req, res) => {
  try {
    const topicName = req.params.name;
    const topic = await Topic.findOne({ name: topicName }).exec();
    if (topic) {
      res.json(topic);
    } else {
      res.status(404).json({ message: 'Topic not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Login endpoint (NOT for production use, as it stands, for educational purposes only)
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find the user by username (in a real application you would query your database)
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if the password is correct
    const isMatch = bcrypt.compareSync(password, user.password); 
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Successfully logged in
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    try {
      const chatCompletion = await openai.chat.completions.create({
          messages: [
              { role: "system", content: SystemPrompt },
              { role: "user", content: message }
          ],
          model: "gpt-3.5-turbo-1106",
      });
      const response = chatCompletion.choices[0].message.content;

      res.json({ response });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
});

app.get('/api/ping', (_req, res) => {
  res.send('pong');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
