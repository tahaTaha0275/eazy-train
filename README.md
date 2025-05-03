# 🚄 EazyTrain

EazyTrain is a modern, user-friendly train ticket reservation system designed to enhance the train travel experience in Saudi Arabia. It allows passengers to search, book, and manage train tickets with ease, while providing train operators and administrators with tools to manage operations and ensure smooth travel.

## ✨ Features

- Search train schedules by city and date
- Book and pay for train tickets securely
- Modify or cancel existing reservations
- Receive real-time updates on train status (e.g., delays, cancellations)
- User, Operator, and Admin dashboards
- Manage train trips and operator accounts (Admin)

## 📦 Tech Stack

- **Frontend:** React.js
- **Package Manager:** npm

## 👨‍💻 Project Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tahaTaha0275/eazy-train.git
   cd eazy_train_frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Run the development server:**

   ```bash
   npm run dev
   ```
   This will start the development server and open the application in your default web browser. The app will automatically reload if you make changes to the source code.

Make sure Node.js and npm are installed on your machine. You can download them from [Node.js official website](https://nodejs.org/).

I'll help integrate the train router endpoints into the API documentation. Here's the updated section for the Trains endpoints in the README:

# 🚄 EazyTrain API Documentation

### 🚂 Trains

#### Search Trains
```
GET /trains/search
```
**Query Parameters:**
- `depStation` (required): Departure station
- `arrivStation` (required): Arrival station
- `departureDate` (required): Date in YYYY-MM-DD format

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "code": "string",
    "availableSeats": "number",
    "totalSeats": "number",
    "status": "string",
    "depStation": "string",
    "arrivStation": "string",
    "depTime": "string",
    "departureDate": "string"
  }
]
```
**Error Response:**
```json
{
  "message": "Missing query parameters."
}
```
**Status Codes:**
- `200`: Success
- `400`: Missing parameters
- `500`: Server error

#### Get Train by ID
```
GET /trains/:trainId
```
**Parameters:**
- `trainId`: Train identifier

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "code": "string",
  "availableSeats": "number",
  "totalSeats": "number",
  "status": "string",
  "depStation": "string",
  "arrivStation": "string",
  "depTime": "string",
  "departureDate": "string"
}
```
**Error Response:**
```json
{
  "message": "Train not found"
}
```
**Status Codes:**
- `200`: Success
- `404`: Train not found

#### Create Train
```
POST /trains
```
**Request Body:**
```json
{
  "name": "string",
  "code": "string",
  "availableSeats": "number",
  "totalSeats": "number",
  "status": "string",
  "depStation": "string",
  "arrivStation": "string",
  "depTime": "string",
  "departureDate": "string"
}
```
**Response:**
```json
{
  "message": "Train created",
  "train": {
    "id": "string",
    "name": "string",
    "code": "string",
    "availableSeats": "number",
    "totalSeats": "number",
    "status": "string",
    "depStation": "string",
    "arrivStation": "string",
    "depTime": "string",
    "departureDate": "string"
  }
}
```
**Error Response:**
```json
{
  "message": "Error message details"
}
```
**Status Codes:**
- `201`: Train created successfully
- `400`: Invalid request body


👥 Contributors
-   Mohammed Rashad Ali
-   Ahmad Taha
-   Moutaz
-   Mohammed Alhussaini
-   Abdallah Qalalwah


📌 Motivation
EazyTrain was built to address the challenges faced by train travelers in Saudi Arabia, such as limited booking options and difficulty managing reservations. Inspired by Saudi Vision 2030, the system aims to improve the public transportation experience by offering a centralized, accessible, and efficient train reservation platform.

