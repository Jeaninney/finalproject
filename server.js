const express = require('express');
const path = require('path');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/medCheck', { useNewUrlParser: true });
const PORT = process.env.PORT || 3001;
const app = express();

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", { useNewUrlParser: true });
// const PORT = process.env.PORT || 3001;
// const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const apiRoutes = require("./routes/api");
app.use(apiRoutes);
const routes = require('./routes');

app.use(routes);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// Define API routes here
// Define any API routes before this runs
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});