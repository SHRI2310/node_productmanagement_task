const User = require('../models/User');

module.exports = async function createAdminIfNeeded() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return;

  const existing = await User.findOne({ email: adminEmail.toLowerCase() });
  if (existing) {
    if (existing.role !== 'admin') {
      existing.role = 'admin';
      await existing.save();
      console.log('Existing user granted admin role:', adminEmail);
    } else {
      console.log('Admin already exists:', adminEmail);
    }
    return;
  }

  const admin = new User({
    name: 'Admin',
    email: adminEmail.toLowerCase(),
    password: adminPassword,
    role: 'admin'
  });
  await admin.save();
  console.log('Initial admin created:', adminEmail);
};
