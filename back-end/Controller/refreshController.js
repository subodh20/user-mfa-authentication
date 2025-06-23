module.exports = {
  refreshController: (req, res) => {
    const refToken = req.cookies.refreshToken;
    if (!refToken) {
      return res.status(401).json({ message: "No Refresh token provided" });
    }
    const isExpired = req.cookies.isExpired;
    if(isExpired){
      return res.status(401).json({message:"Refresh token expired, please login again"});
    }
    
  },
};
