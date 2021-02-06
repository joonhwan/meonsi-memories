import jwt from "jsonwebtoken";
import { SECRET } from "../controllers/users.js";
import User from "../models/user.js";
const auth = async (req, res, next) => {
  try {
    // "Authorization=Bearer {token}"
    const token = req.headers.authorization?.split(" ")[1];
    //console.log("auth middleware detect token : ", token);
    if (token == null) {
      return res.sendStatus(401);
    }
    let decodedData = jwt.decode(token);
    const isCustomAuth = token.length < 500; //TODO

    //Authentication. 즉, 현 요청의 사용자가 누구인지 확인.
    // --> user id 를 req 에 기록. --> 이후 다른 handler들이 이를 처리할 때
    // userId 값을 확인가능.
    let userId = null;
    let userName = null;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, SECRET);
      userId = decodedData?.id;
      const user = await User.findById(userId);
      //console.log("@@@ found user : ", user);
      userName = `${user.firstName} ${user.lastName}`;
    } else {
      userId = decodedData?.sub; // OAuth user id.
      userName = decodedData?.username || decodedData?.name || "???";
    }
    req.user = {
      id: userId,
      name: userName || "unkown",
    };
    next();
  } catch (error) {
    console.log(error.message);
    if (error instanceof jwt.TokenExpiredError) {
      // https://stackoverflow.com/a/39526438
      error.statusCode = 401;
    }
    next(error);
  }
};

export default auth;
