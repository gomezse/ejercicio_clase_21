import express from "express";
import cookieParser from "cookie-parser";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import session from "express-session";
import "./db/configDB.js";
import MongoStore from "connect-mongo";
import "./passport.js";
import passport from "passport";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("SecretCookie"));


const URI ="mongodb+srv://gomezse:root@ecommerce.sp5zu8k.mongodb.net/";

app.use(
  session({
     store: new MongoStore({
      mongoUrl: URI,
    }),
    secret: "secretSession",
    cookie: { maxAge: 90000 },
  })
);

//config passport
app.use(passport.initialize());
app.use(passport.session());

// config handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//config routes
app.use("/", viewsRouter);
app.use("/api/sessions", sessionsRouter);

//prueba de escucha server
app.listen(8080, () => {
  console.log("Puerto:8080");
});