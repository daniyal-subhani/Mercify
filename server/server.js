import app from "./app.js";
import { connectDB } from "./config/db.connect.js";

const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error starting server: ${error}`);
  });
