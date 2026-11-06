// 1. Load environment variables FIRST — nothing else should run before this
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// 2. Import the packages we need
const express = require('express');
const cors = require('cors');

// 3. Create the Express application
const app = express();

// 4. Read PORT from .env, fall back to 5000 if not defined
const PORT = process.env.PORT || 5000;

/* ---------- Global middleware ---------- */

// 5. Parse incoming JSON request bodies → available as req.body
app.use(express.json());

// 6. Parse form-style URL-encoded bodies (e.g. from HTML forms)
app.use(express.urlencoded({ extended: true }));

// 7. Enable CORS so our React frontend can call this API
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);

/* ---------- Routes ---------- */

// 8. Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hostel Food Management API is healthy 🍜',
    timestamp: new Date().toISOString(),
  });
});

// 9. Catch-all 404 handler — for any route we haven't defined
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// 10. Global error handler — catches any error thrown in routes above
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

/* ---------- Start server ---------- */

// 11. Start listening for requests
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// 12. Graceful shutdown — close the server when the app is stopped
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed.');
    process.exit(0);
  });
});