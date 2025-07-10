export const roleCheckMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      const { role } = req.user; 

      if (!allowedRoles.includes(role)) {
        return res.status(403).json({ success: false, message: "Access denied" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
  };
};
