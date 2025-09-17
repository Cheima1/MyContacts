const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // On attend un header du type "Authorization: Bearer <token>"
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token manquant" });
    }

    // Vérifie le token
    const decoded = jwt.verify(token, process.env.JWTSECRET || "dev_secret");
    req.userId = decoded.userId; // on garde l'id utilisateur pour plus tard

    next(); // passe la main à la route
  } catch (err) {
    return res.status(401).json({ error: "Token invalide" });
  }
};
