const express = require('express');
const subdomain = require('express-subdomain');
const path = require('path');
const app = express();
const router = express.Router();

app.use(subdomain('webcam', router));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

router.get('/users', function(req, res) {
    res.json([
        { name: "Brian" }
    ]);
});


app.listen(8080);
