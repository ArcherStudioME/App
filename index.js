const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const APPSCRIPT_ENDPOINT = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await axios.post(APPSCRIPT_ENDPOINT, { email, password }, {
      headers: { 'Content-Type': 'application/json' }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error communicating with Apps Script:', error);
    res.status(500).json({ status: 'error', message: 'Backend error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Render backend running on port ${PORT}`));
