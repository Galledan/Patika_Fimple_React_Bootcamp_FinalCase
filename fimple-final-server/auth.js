const jwt = require("jsonwebtoken");
const { secretKey, admins } = require("./secrets");

function generateToken(userId) {
  return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
}

function authenticateUser(username, password) {
  const foundAdmin = admins.find(
    (admin) => admin.username === username && admin.password === password
  );

  if (foundAdmin) {
    const token = generateToken(foundAdmin.id);
    return { success: true, token };
  } else {
    return { success: false, error: "Kullanıcı adı ya da şifre yanlış" };
  }
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return { success: true, decoded };
  } catch (error) {
    return { success: false, error: "Invalid token" };
  }
}

module.exports = { generateToken, authenticateUser, verifyToken };
