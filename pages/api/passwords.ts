import dbConnect from "../../db/dbConnect";
import Passwort from "../../db/models/Passwords";

//makeMyDay
export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    const passwordFromUser = req.body;
    const password = await Passwort.find();
    console.log(password);
    if (password[0].password === passwordFromUser) {
      res.status(200).json({ status: "ok" });
    } else {
      res.status(401).json({ status: "Passwort simmt nicht" });
    }
  }
}
