import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

// Route Mapping 하기 전에 사용될 middle ware 설정
app
  .use(
    bodyParser.json({
      limit: "30mb", // 이 이상의 json 요청은 받지 않음.
      extended: true, // `qs` 를 사용.
    })
  )
  .use(
    bodyParser.urlencoded({
      limit: "30mb", // 이 이상의 urlencoded 요청은 받지 않음.
      extended: true, // `qs` 를 사용.
    })
  )
  .use(cors());

// Route Mapping
app.use("/posts", routes.posts);

const CONNECT_URL =
  "mongodb+srv://joonhwan:ADGqet135!@cluster0.5ubrr.mongodb.net/memories?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECT_URL, {
    // 없으면 경고가 뜨는 옵션들을 명시적으로 지정.
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`서버가 기동되었습니다(포트:${PORT})`))
  )
  .catch((error) => console.error(error));

// see : https://mongoosejs.com/docs/deprecations.html#findandmodify
mongoose.set("useFindAndModify", false);
