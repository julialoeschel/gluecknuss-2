import { json } from "stream/consumers";
import dbConnect from "../../db/dbConnect";
import Verdict from "../../db/models/Verdict";

export default async function handler(req: any, res: any) {
  await dbConnect();

  if (req.method == "GET") {
    const verdicts = await Verdict.find();
    return res.status(200).json(verdicts);
  }

  if (req.method === "POST" && req.body.status === "random") {
    const count = await Verdict.count();
    const random = Math.floor(Math.random() * count);

    await Verdict.findOne()
      .skip(random)
      .exec(function (_err, result) {
        res.status(200).json(result);
      });
    return;
  }

  if (req.method === "POST" && req.body.status !== "random") {
    const data = req.body;
    try {
      await Verdict.create(data);
      return res.status(201).json({ status: "ok" });
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  if (req.method === "DELETE") {
    const id = req.body.id;
    await Verdict.findByIdAndDelete(id);
    res.status(200).json({ status: "deleted" });
  }
}
