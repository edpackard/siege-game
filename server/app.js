const express = require('express');
const path = require('path');
const app = express();
const port = 9003;

app.use(express.static('../public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'index.html'));
});

app.listen(port, () => {
  console.log(`Local development server listening on port ${port}`);
});
