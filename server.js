const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 10000;

app.use(cors()); // Enable cross-origin requests

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://kashyapmistry2021:ws7Gqbfgy3*hQZ5@db1cluster1.skf8r.mongodb.net/?retryWrites=true&w=majority&appName=DB1Cluster1', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Define RideHistory schema
const rideHistorySchema = new mongoose.Schema({
name: String,
rideDetails: Array,
});

// Define RideHistory model
const RideHistory = mongoose.model('RideHistory', rideHistorySchema);

// Route to fetch ride history based on name
app.get('/api/ride-history/:name', async (req, res) => {
const { name } = req.params;
try {
    const rideHistory = await RideHistory.findOne({ name: name });
    if (rideHistory) {
    res.json(rideHistory.rideDetails); // Send back the ride details
    } else {
    res.status(404).json({ message: 'No ride history found for this user.' });
    }
} catch (error) {
    res.status(500).json({ message: 'Error fetching ride history.', error });
}
});

app.listen(port, () => {
console.log(`Server running on port ${port}`);
});
