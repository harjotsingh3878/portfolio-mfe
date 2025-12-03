const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
app.use(express.json());

const SECRET = 'your-secret-key';

// Mock data
const users = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    name: 'John Doe',
    role: 'admin',
    phone: '123-456-7890',
  },
  {
    id: 2,
    email: 'user@example.com',
    password: 'user123',
    name: 'Jane Smith',
    role: 'user',
    phone: '098-765-4321',
  },
];

const transactions = [
  {
    id: 1,
    date: '2024-01-15',
    description: 'Salary Deposit',
    category: 'Income',
    amount: 5000,
    status: 'completed',
  },
  {
    id: 2,
    date: '2024-01-14',
    description: 'Grocery Shopping',
    category: 'Food',
    amount: -150,
    status: 'completed',
  },
  {
    id: 3,
    date: '2024-01-13',
    description: 'Electric Bill',
    category: 'Utilities',
    amount: -85,
    status: 'pending',
  },
];

const notifications = [
  {
    id: 1,
    title: 'New Transaction',
    message: 'You received $5000 salary deposit',
    type: 'transaction',
    read: false,
    timestamp: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    title: 'Security Alert',
    message: 'New login from Chrome browser',
    type: 'security',
    read: true,
    timestamp: '2024-01-14T15:20:00Z',
  },
];

const featureFlags = {
  darkMode: true,
  notifications: true,
  advancedAnalytics: false,
};

// Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET);
  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

app.get('/api/dashboard', authenticate, (req, res) => {
  const balance = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const recentTransactions = transactions.slice(0, 3);
  res.json({ balance, recentTransactions });
});

app.get('/api/transactions', authenticate, (req, res) => {
  res.json(transactions);
});

app.get('/api/profile', authenticate, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  res.json(user);
});

app.put('/api/profile', authenticate, (req, res) => {
  const userIndex = users.findIndex((u) => u.id === req.user.id);
  users[userIndex] = { ...users[userIndex], ...req.body };
  res.json(users[userIndex]);
});

app.get('/api/notifications', authenticate, (req, res) => {
  res.json(notifications);
});

app.patch('/api/notifications/:id/read', authenticate, (req, res) => {
  const notif = notifications.find((n) => n.id === parseInt(req.params.id));
  if (notif) notif.read = true;
  res.json(notif);
});

app.get('/api/feature-flags', (req, res) => {
  res.json(featureFlags);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
