const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from server side',
    app: 'Natours 2026',
  });
});

app.post('/', (req, res) => {
  res.send('Working');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
