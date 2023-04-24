export const isAdmin = async (req, res, next) => {
  if (req.session?.role === "admin") {
    next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
}
