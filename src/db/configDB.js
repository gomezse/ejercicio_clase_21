import mongoose from "mongoose";

const URI =
  "mongodb+srv://gomezse:root@ecommerce.sp5zu8k.mongodb.net/";

mongoose
  .connect(URI)
  .then(() => console.log("Conectado a DB"))
  .catch((error) => console.log(error));