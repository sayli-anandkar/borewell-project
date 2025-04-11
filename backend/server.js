const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const usersFile = path.join(__dirname, 'users.json');
const borewellFile = path.join(__dirname, 'database', 'borewell-history.json');
const cropInfoFile = path.join(__dirname, 'database', 'crop-info.json');
const motorScheduleFile = path.join(__dirname, 'database', 'motor-schedule.json');

fs.ensureFileSync(borewellFile);
fs.ensureFileSync(cropInfoFile);
fs.ensureFileSync(motorScheduleFile);
fs.ensureDirSync(path.dirname(borewellFile));
fs.ensureDirSync(path.dirname(cropInfoFile));
fs.ensureDirSync(path.dirname(motorScheduleFile));

let users = [];
fs.readJson(usersFile)
  .then(data => users = data)
  .catch(() => users = []);

let borewellEntries = [];
fs.readJson(borewellFile)
  .then(data => borewellEntries = data)
  .catch(() => borewellEntries = []);

let cropInfoEntries = [];
fs.readJson(cropInfoFile)
  .then(data => cropInfoEntries = data)
  .catch(() => cropInfoEntries = []);

let motorSchedules = [];
fs.readJson(motorScheduleFile)
  .then(data => motorSchedules = data)
  .catch(() => motorSchedules = []);

// Save functions
function saveUsers() {
  return fs.writeJson(usersFile, users, { spaces: 2 });
}

function saveBorewellEntries() {
  return fs.writeJson(borewellFile, borewellEntries, { spaces: 2 });
}

function saveCropInfoEntries() {
  return fs.writeJson(cropInfoFile, cropInfoEntries, { spaces: 2 });
}

function saveMotorSchedules() {
  return fs.writeJson(motorScheduleFile, motorSchedules, { spaces: 2 });
}

// User registration and login
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = {
    id: uuidv4(),
    username,
    password
  };

  users.push(newUser);
  await saveUsers();

  res.json({ message: 'Registered successfully', userId: newUser.id });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const token = `${user.id}-token`; // Dummy token for simplicity
  res.json({ message: 'Login successful', token, userId: user.id });
});

// Borewell routes (same as before)
app.post('/borewell', async (req, res) => {
  const { userId, borewellId, connectedTo, distance, speed, startTime } = req.body;
  if (!userId || !borewellId || !connectedTo || !distance || !speed || !startTime) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newEntry = {
    id: uuidv4(),
    userId,
    borewellId,
    connectedTo,
    distance,
    speed,
    startTime
  };

  borewellEntries.push(newEntry);
  await saveBorewellEntries();
  res.json({ message: 'Borewell connection saved', entry: newEntry });
});

app.get('/borewell/:userId', (req, res) => {
  const userEntries = borewellEntries.filter(entry => entry.userId === req.params.userId);
  res.json(userEntries);
});

// Crop Info routes
app.post('/crop-info', async (req, res) => {
  const { userId, cropId, cropType, soilType, waterRequired, startTime } = req.body;
  if (!userId || !cropId || !cropType || !waterRequired || !startTime) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newEntry = {
    id: uuidv4(),
    userId,
    cropId,
    cropType,
    soilType,
    waterRequired,
    startTime
  };

  cropInfoEntries.push(newEntry);
  await saveCropInfoEntries();
  res.json({ message: 'Crop info saved', entry: newEntry });
});

app.get('/crop-info/:userId', (req, res) => {
  const userEntries = cropInfoEntries.filter(entry => entry.userId === req.params.userId);
  res.json(userEntries);
});

// Motor Schedule routes
app.post('/motor-schedule', async (req, res) => {
  const { userId, borewellId, waterAmount, startTime, speed } = req.body;
  if (!userId || !borewellId || !waterAmount || !startTime || !speed) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newEntry = {
    id: uuidv4(),
    userId,
    borewellId,
    waterAmount,
    startTime,
    speed
  };

  motorSchedules.push(newEntry);
  await saveMotorSchedules();
  res.json({ message: 'Motor schedule saved', entry: newEntry });
});

app.get('/motor-schedule/:userId', (req, res) => {
  const userEntries = motorSchedules.filter(entry => entry.userId === req.params.userId);
  res.json(userEntries);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
