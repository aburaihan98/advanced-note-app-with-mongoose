import mongoose from "mongoose";
import app from "./app";

const PORT = 5000;

let server;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://aburaihanrahmani:gDng3596DSYKVjpz@raihan.0p9bes0.mongodb.net/advanced-note?retryWrites=true&w=majority&appName=Raihan"
    );

    server = app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
