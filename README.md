# Personal Loan Manager - Complete Documentation

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Use Cases](#use-cases)
- [API Endpoints](#api-endpoints)
- [Developer Documentation](#developer-documentation)
- [Extending the Application](#extending-the-application)
- [License](#license)

## Overview

Personal Loan Manager is a customer-facing web application designed to streamline the personal loan application process. It leverages the Command Query Responsibility Segregation (CQRS) pattern to enhance performance and maintainability, ensuring a seamless user experience across multiple sessions and interactions.

## Key Features

- **User Management**: Register, login, and manage user accounts.
- **Session Management**: Maintain state across multiple pages and user interactions.
- **Loan Application**: Guide users through the loan application process.
- **Document Management**: Allow users to upload and manage required documents.
- **Loan Offers**: Present and manage loan offers to the user.
- **Dynamic UI Control**: Utilize session-stored page meta and config for dynamic UI adjustments.
- **Activity Tracking**: Monitor all commands, queries, and data interactions for analysis and debugging.

## Technology Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose for data modeling
- **Authentication**: Passport, bcrypt for password hashing
- **Logging and Monitoring**: Winston for logging, custom middleware for activity tracking
- **Frontend**: React (can be adapted for other frameworks)

## Getting Started

1. Clone the repository: `git clone https://github.com/yourusername/personal-loan-manager.git`
2. Navigate to the project directory: `cd personal-loan-manager`
3. Install dependencies: `npm install`
4. Configure environment variables: Create a `.env` file and add your MongoDB URI.
5. Run the application: `npm start`

## Architecture

The application follows a modular and clean architecture, designed for scalability and maintainability.

### Directory Structure

```
personal-loan-manager/
│
├── src/
│   ├── commands/
│   ├── queries/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── .gitignore
├── package.json
└── README.md
```

## Use Cases

### Personal Loan Application

**Scenario**: A user wants to apply for a personal loan, navigating through multiple pages, filling out forms, and uploading documents.

1. **User Registration/Login**: The user creates an account or logs in.
2. **Session Initialization**: A new session is created to store the user's progress.
3. **Filling Out Forms**: The user navigates through the application, filling out various forms.
4. **Document Upload**: The user uploads necessary documents.
5. **Loan Offers**: The user receives and reviews loan offers.
6. **Review and Submit**: The user reviews their application and submits it.

## API Endpoints

### Session Management

- **Update Session**: `POST /sessions/:sessionId`
- **Get Session**: `GET /sessions/:sessionId`

### Loan Offers

- **Add Loan Offer**: `POST /loan-offers/:sessionId`
- **Get Loan Offers**: `GET /loan-offers/:sessionId`

## Developer Documentation

### Commands and Queries

- **Commands**: Located in `src/commands/`, these handle write operations to the database.
- **Queries**: Located in `src/queries/`, these handle read operations from the database.

### Models

- **Write Models**: Located in `src/models/write/`, used for writing data to the database.
- **Read Models**: Located in `src/models/read/`, optimized for read operations.

### Middleware

- **Tracking Middleware**: Located in `src/middleware/`, used for monitoring all data interactions.

### Logging and Monitoring

- **Winston**: Used for logging data interactions, errors, and other important information.

### Extending the Application

The Personal Loan Manager application is designed to be highly modular and extensible. By following the existing structure, developers can add new features, update models, and create new API endpoints with ease. Below is a detailed guide and examples on how to extend the application:

#### 1. Adding New Features

##### Example: Implementing a Credit Score Check

1. **Create a New Command**: In `src/commands/`, create a new file `creditScoreCommands.js`.
   ```javascript
   async function checkCreditScore(userId) {
     // Implement logic to check credit score
     const creditScore = await externalCreditScoreService.check(userId);
     return creditScore;
   }

   module.exports = { checkCreditScore };
   ```

2. **Create a New Query**: If needed, create a new query in `src/queries/` to fetch related data.

3. **Update Models**: If the new feature requires storing additional data, update the necessary models in `src/models/`.

4. **Create an API Endpoint**: In `src/routes/`, create a new file `creditScoreRoutes.js`.
   ```javascript
   const express = require('express');
   const router = express.Router();
   const { checkCreditScore } = require('../commands/creditScoreCommands');

   router.get('/:userId', async (req, res) => {
     try {
       const creditScore = await checkCreditScore(req.params.userId);
       res.json({ creditScore });
     } catch (error) {
       res.status(500).send(error.toString());
     }
   });

   module.exports = router;
   ```

5. **Update `app.js`**: Import and use the new routes in `src/app.js`.
   ```javascript
   const creditScoreRoutes = require('./routes/creditScoreRoutes');
   app.use('/credit-score', creditScoreRoutes);
   ```

#### 2. Updating Models

When updating models, ensure that you handle data migrations if necessary. This is crucial when deploying updates to a live application to prevent data inconsistencies.

#### 3. Creating API Endpoints

Follow RESTful conventions when creating API endpoints. Ensure that each endpoint has a clear purpose and is designed to handle a specific type of request.

#### 4. Front-End Integration

Once the back-end has been updated, integrate the new features into the front-end. Use the application's state management and UI libraries to create a seamless user experience.

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LoanOffers({ sessionId }) {
  const [loanOffers, setLoanOffers] = useState([]);

  useEffect(() => {
    async function fetchLoanOffers() {
      const response = await axios.get(`/loan-offers/${sessionId}`);
      setLoanOffers(response.data);
    }
    fetchLoanOffers();
  }, [sessionId]);

  return (
    <div>
      <h1>Loan Offers</h1>
      <ul>
        {loanOffers.map((offer, index) => (
          <li key={index}>
            Amount: ${offer.amount}, Interest Rate: {offer.interestRate}%, Accepted: {offer.accepted ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoanOffers;

```


#### Example with page meta 

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LoanOffers({ sessionId }) {
  const [loanOffers, setLoanOffers] = useState([]);
  const [pageMeta, setPageMeta] = useState({});
  const [config, setConfig] = useState({});

  useEffect(() => {
    async function fetchLoanOffers() {
      const response = await axios.get(`/sessions/${sessionId}`);
      setLoanOffers(response.data.loanOffers || []);
      setPageMeta(response.data.pageMeta || {});
      setConfig(response.data.config || {});
    }
    fetchLoanOffers();
  }, [sessionId]);

  return (
    <div style={config.pageStyle}>
      <h1>{pageMeta.title}</h1>
      <ul>
        {loanOffers.map((offer, index) => (
          <li key={index} style={config.offerStyle}>
            Amount: ${offer.amount}, Interest Rate: {offer.interestRate}%, Accepted: {offer.accepted ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoanOffers;

```

#### 5. Testing

Ensure that all new features, models, and endpoints are thoroughly tested. Write unit tests and integration tests to verify that everything works as expected.

