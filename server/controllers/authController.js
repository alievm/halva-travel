const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const adminUsername = process.env.SUPER_ADMIN_USERNAME;
    const adminPassword = process.env.SUPER_ADMIN_PASSWORD;

    if (username === adminUsername && password === adminPassword) {
      const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ token });
    }

    res.status(401).json({ error: 'Неверный логин или пароль' });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });

  res.json({ success: true, message: 'Выход выполнен' });
};
