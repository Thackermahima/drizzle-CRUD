const express = require('express');
const cors = require('cors');
const userRouter = require('./src/routes/usersRoute'); // Import the user router

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Use the user router
app.use('/api', userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
