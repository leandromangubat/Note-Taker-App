const express = require('express');
const htmlRoutes = require('./routes/html_routes');
const apiRoutes = require('./routes/api_routes');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('Develop'));
app.use(htmlRoutes);
app.use(apiRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
