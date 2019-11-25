const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 4000;
const passport = require('passport');
const listRouter = require('./routes/listRouter');
const taskRouter = require('./routes/taskRouter');
const userRouter = require('./routes/userRouter');

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

app.use('/lists', passport.authenticate('jwt', { session: false }), listRouter);
app.use('/tasks', passport.authenticate('jwt', { session: false }), taskRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});
