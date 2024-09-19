const express = require('express');
const cors = require('cors');
const userRouter = require('./src/routes/usersRoute'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 

app.use('/api', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
