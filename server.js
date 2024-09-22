const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 10000;

// Middleware to handle JSON requests and CORS
app.use(express.json());
app.use(cors()); // Allow requests from different origins (e.g., Netlify frontend)

// Connect to MongoDB
mongoose.connect('mongodb+srv://kashyapmistry2021:ws7Gqbfgy3*hQZ5@db1cluster1.skf8r.mongodb.net/?retryWrites=true&w=majority&appName=DB1Cluster1', { useNewUrlParser: true, useUnifiedTopology: true });

// Ride schema and model
const rideSchema = new mongoose.Schema({
pickup: String,
destination: String,
name: String,
dateTime: String, // Date and time of the ride
});

const Ride = mongoose.model('Ride', rideSchema, 'rides'); // 'rides' is the collection name

// Fetch ride history for a specific user by name
app.get('/api/ridehistory/:name', async (req, res) => {
try {
    const userName = req.params.name;
    const rides = await Ride.find({ name: userName });
    res.json(rides);
} catch (error) {
    res.status(500).json({ error: 'Server error while fetching ride history' });
}
});

// Start the server
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});
