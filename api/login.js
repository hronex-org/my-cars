module.exports = (req, res) => {
  // Basic server-side credential check. Credentials must be set in environment variables
  // AUTH_USER and AUTH_PASS in Vercel (or your host). Do NOT store secrets in the client bundle.
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end('Method Not Allowed');
    return;
  }

  let body = '';
  req.on('data', chunk => (body += chunk));
  req.on('end', () => {
    try {
      const data = JSON.parse(body || '{}');
      const username = data.username;
      const password = data.password;

      const AUTH_USER = process.env.AUTH_USER;
      const AUTH_PASS = process.env.AUTH_PASS;

      if (!AUTH_USER || !AUTH_PASS) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: false, error: 'Auth not configured on server' }));
        return;
      }

      if (username === AUTH_USER && password === AUTH_PASS) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: true }));
      } else {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: false }));
      }
    } catch (e) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ ok: false, error: 'Invalid request body' }));
    }
  });
};