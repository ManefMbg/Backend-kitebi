const isAdmin = async (req, res, next) => {
    try {
      const adminStatus = req.body.isAdmin;
  
      if (adminStatus) {
        next();
      } else {
        res.status(401).send({ errors: [{ msg: "Not authorized !!1" }] });
      }
    } catch (error) {
      res.status(401).send({ errors: [{ msg: "Not authorized !!3" }] });
    }
  };
  
  export default isAdmin;