import jwt from "jsonwebtoken";
import { SECRET } from "../controllers/users.js";

const auth = async (req, res, next) => {
  try {
    // "Authorization=Bearer {token}"
    const token = req.headers.authorization?.split(" ")[1];
    console.log("auth middleware detect token : ", token);
    if (token) {
      let decodedData = jwt.decode(token);
      const isCustomAuth = token.length < 500; //TODO

      //Authentication. 즉, 현 요청의 사용자가 누구인지 확인.
      // --> user id 를 req 에 기록. --> 이후 다른 handler들이 이를 처리할 때
      // userId 값을 확인가능.
      if (token && isCustomAuth) {
        decodedData = jwt.verify(token, SECRET);
        req.userId = decodedData?.id;
      } else {
        req.userId = decodedData?.sub; // OAuth user id.
      }
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
