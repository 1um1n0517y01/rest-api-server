const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert = `Your booking was successfull! Please check your email for confirmation. If your booking doesn't show here immediately, please come back later.`;
  next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1. Build template

  // 2. Render that template
  res.status(200).render('overview', {
    title: 'Home Page',
  });
});

exports.getSignupForm = catchAsync(async (req, res) => {
  res.status(200).render('signup', {
    title: `Sign up your account`,
  });
});

exports.getLoginForm = catchAsync(async (req, res) => {
  res.status(200).render('login', {
    title: `Log into your account`,
  });
});

exports.getForgotPasswordForm = catchAsync(async (req, res) => {
  res.status(200).render('forgotPassword', {
    title: `Reset your password`,
  });
});

exports.getResetPasswordForm = catchAsync(async (req, res) => {
  const { token } = req.params;
  res.status(200).render('passwordChange', {
    title: 'Set your new password',
    token,
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: `Your account`,
  });
};

// UPDATE USER DATA WITHOUT API
exports.updateUserData = catchAsync(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: `Your account`,
    user: updatedUser,
  });
});
