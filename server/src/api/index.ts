import app from "../app";
import mongoose from "mongoose";

const port = process.env.PORT || 3000;
const database = process.env.DATABASE as string;

mongoose
  .connect(database)
  .then(() => {
    app.listen(port, function () {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
