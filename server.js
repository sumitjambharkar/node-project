const express = require('express');
const dotenv = require('dotenv')
const database = require('./Database/database');
const userRouter = require("./routes/userRoute");
const cors = require('cors')
dotenv.config()
const port = process.env.PORT;
const app = express();
app.use(cors())
database()
app.use('/',userRouter)

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
