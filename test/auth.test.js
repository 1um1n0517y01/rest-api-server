const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/userModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

beforeAll(async () => {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('DB connection successful!');
    });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Model', () => {
  test('should create a password reset token', () => {
    const user = new User({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
      passwordConfirm: 'password',
    });

    const resetToken = user.createPasswordResetToken();

    expect(user.passwordResetToken).toBeDefined();
    expect(user.passwordResetExpires).toBeDefined();
    expect(resetToken).toBeDefined();
  });
});
