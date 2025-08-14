import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const { accessToken } = req.cookies;
  if (!accessToken) return res.status(401).json({ message: "Token Required" });
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, error => {
    if (error) return res.status(400).json({ message: error.message });
    return next();
  });
  return true;
}

export function refreshTheToken(req, res, next) {
  const { refreshToken } = req.cookies;
  jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.status(403).json({ message: error.message });
    const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .json({ message: "Token refreshed successfully" });
    return next();
  });
}
