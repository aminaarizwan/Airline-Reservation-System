# ✈ Airline Reservation System 
A professional Airline Reservation System with full **Oracle database integration**.  
Users can view flights, book tickets, cancel bookings, and generate reports through a modern **dashboard UI**.

## **Features**

- **Dashboard Layout**: Left sidebar, right content area.
- **Available Flights**: Professional, sortable tables from Oracle DB.
- **Book Flight**: Input passenger info, select flight, loyalty tiers, and number of travelers.
- **Passenger History**: Search by ID, cancel flights with notifications.
- **Reports**: Popular flights & peak booking hours.
- **Persistent Data**: All bookings stored in Oracle DB.

## **Requirements**

- Node.js (v18+ recommended)
- Oracle Database (XE or full version)
- Node OracleDB driver (`oracledb` package)

## **Installation**

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/AirlineReservation.git
cd AirlineReservation

## **Installation Dependencies**

npm install express body-parser oracledb open

Configure Oracle DB in db.js:

const oracledb = require('oracledb');

async function connectDB() {
  return await oracledb.getConnection({
    user: 'YOUR_DB_USER',
    password: 'YOUR_DB_PASSWORD',
    connectString: 'localhost/XE;'
  });
}

module.exports = connectDB;

Start the server:

node server.js

The dashboard will automatically open in your browser.

## **Database Setup**

Create tables for Flights, Reservations, and optionally Passengers in SQL Plus

-- Flights table
CREATE TABLE Flights (
  flight_id VARCHAR2(10) PRIMARY KEY,
  origin VARCHAR2(50),
  destination VARCHAR2(50),
  seats NUMBER
);

-- Reservations table
CREATE TABLE Reservations (
  reservation_id NUMBER PRIMARY KEY,
  passenger_id VARCHAR2(10),
  flight_id VARCHAR2(10),
  seat_number NUMBER,
  booking_date DATE
);

Populate Flights with sample data for testing.

## **File Strcuture**
AirlineReservation/
│
├── index.html        # Dashboard frontend
├── style.css         # CSS for styling
├── script.js         # JS for frontend interactions
├── server.js         # Express server connecting to Oracle
├── db.js             # Oracle DB connection
├── README.md


## **RUN THE PROJECT**

Run the server: node server.js

The browser opens automatically to the dashboard.

Navigate via sidebar: Available Flights → Book Flight → Passenger History → Reports.

Book flights, view history, cancel flights, and generate reports.
