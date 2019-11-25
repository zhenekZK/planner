const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 4000;
// require('./passport');
const listRouter = require('./routes/listRouter');
const taskRouter = require('./routes/taskRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use('/lists', listRouter);
app.use('/tasks', taskRouter);
app.use('/user', userRouter);
// app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});
