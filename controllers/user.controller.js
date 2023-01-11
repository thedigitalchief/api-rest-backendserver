const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.index = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user);
}

module.exports.signup = async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email});
  if (emailExist) return res.status(400).send('Email already exists.');

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    address: req.body.address,
    city: req.body.city,
    district: req.body.district,
    phone: req.body.phone,
  })

  try {
    const savedUser = await user.save();
    res.json('successful');
  } catch {
    res.status(400).send(err);
  }
}

module.exports.signin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Email is not found.');
  }

  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid password');
  res.status(200).json({token: token});
}

module.exports.update = async (req, res) => {
  try {
    const data = req.body;
    const result = await User.findByIdAndUpdate(req.user._id, data, { new: true });
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}