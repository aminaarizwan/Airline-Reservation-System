const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
const path = require('path');
const open = require('open').default; // Correct for Node.js v24+
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'Public'))); // Serve static files (HTML/CSS/JS)

// Oracle DB connection function
async function connectDB() {
  try {
    const connection = await oracledb.getConnection({
      user: 'system',          // Change to your Oracle DB username
      password: '123',         // Change to your password
      connectString: 'localhost/XEPDB1' // Your DB connection string
    });
    console.log('Connected to Oracle DB');
    return connection;
  } catch (err) {
    console.error('Oracle DB connection error:', err);
  }
}

// Routes

// Get all flights
app.get('/flights', async (req, res) => {
  const connection = await connectDB();
  try {
    const result = await connection.execute('SELECT * FROM Flights');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching flights');
  } finally {
    if (connection) await connection.close();
  }
});

// Book a flight
app.post('/reserve', async (req, res) => {
  const { user_id, flight_id, seat_number } = req.body;
  const connection = await connectDB();
  try {
    await connection.execute(
      `INSERT INTO Reservations (reservation_id, user_id, flight_id, seat_number, booking_date) 
       VALUES (reservations_seq.NEXTVAL, :user_id, :flight_id, :seat_number, SYSDATE)`,
      [user_id, flight_id, seat_number],
      { autoCommit: true }
    );
    res.send('Reservation successful!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error booking flight');
  } finally {
    if (connection) await connection.close();
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  open(`http://localhost:${PORT}`); // Automatically open browser
});