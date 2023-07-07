import mongoose from "mongoose";
import { config } from "./config.js";

export const mongoConnect = async function () {
  await mongoose.connect(config.dbUrl);
};
