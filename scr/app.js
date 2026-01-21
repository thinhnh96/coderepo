const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check (QA/CI hay dùng)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    env: process.env.NODE_ENV || 'qa',
    time: new Date().toISOString()
  });
});

// Demo login API (để test)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'standard_user' && password === 'secret_sauce') {
    return res.status(200).json({
      success: true,
      message: 'Login success'
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid credentials'
  });
});

// Home page (Playwright có thể check)
app.get('/', (req, res) => {
  res.send(`
    <h1>Demo App - QA Environment</h1>
    <p>Status: Running</p>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 App running on http://localhost:${PORT}`);
});
