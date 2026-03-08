# ✈ Airline Reservation System

A professional Airline Reservation System with **Oracle database integration**. 

Users can view flights, book tickets, cancel bookings, and generate reports through a modern **dashboard UI.**

## Features:

**Dashboard Layout:** Left sidebar, right content area for smooth navigation.

**Available Flights:** Professional, attractive tables that display all flights from the Oracle DB.

**Book Flight:** Input passenger info, select flight, loyalty tiers, and number of travelers.

**Passenger History:** Search by Passenger ID, cancel flights with notifications.

**Reports:** Popular flights & peak booking hours.

**Persistent Data:** All bookings stored in Oracle DB.

## Requirements:

Node.js (v18+ recommended)

Oracle Database (XE or full version)

Node OracleDB driver (oracledb package)

Optional: GitHub to clone the repository

## Installation:
### 1. Install dependencies:
npm install express body-parser oracledb open

### 2. Configure Oracle DB connection in db.js:
const oracledb = require('oracledb');

async function connectDB() 

{ return await oracledb.getConnection(

{ user: 'YOUR_DB_USER', 

password: 'YOUR_DB_PASSWORD', 

connectString: 'localhost/XE;' }); }

module.exports = connectDB;

### 3. Start the server:

node server.js

The dashboard will automatically open in your browser.

## Database Setup:

Create tables for Flights, Reservations, and optionally Passengers in SQL Plus:

Flights table CREATE TABLE Flights ( flight_id VARCHAR2(10) PRIMARY KEY, origin VARCHAR2(50), destination VARCHAR2(50), seats NUMBER );

Reservations table CREATE TABLE Reservations ( reservation_id NUMBER PRIMARY KEY, passenger_id VARCHAR2(10), flight_id VARCHAR2(10), seat_number NUMBER, booking_date DATE );

### Optional: 

Populate Flights with sample data 

INSERT INTO Flights (flight_id, origin, destination, seats) VALUES ('F101', 'Jeddah (Saudi Arabia)', 'Dubai (UAE)', 100); 

INSERT INTO Flights (flight_id, origin, destination, seats) VALUES ('F102', 'Lahore (Pakistan)', 'London (UK)', 180); 

INSERT INTO Flights (flight_id, origin, destination, seats) VALUES ('F103', 'Islamabad (Pakistan)', 'New York (USA)', 160);

## Execute the Project

Run the server: node server.js

The browser opens automatically to the dashboard.

Navigate via sidebar: Available Flights → Book Flight → Passenger History → Reports.

Book flights, view history, cancel flights, and generate reports.
