exports.validateUserRegister = function (email, username, password) {
  if (!email.includes("@")) {
    return res.json({ message: "Invalid email respose" });
  }
  if (!username) {
    return res.json({ message: "Username is required" });
  }
  if (!password) {
    return res.json({ message: "Password is required" });
  }
};

exports.validateUserLogin = function (email, username, password) {
  if (!email && !username) {
    return res
      .status(400)
      .json({ message: "Either email or username is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password should be greater than 8 characters" });
  }
};
