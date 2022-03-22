import express, { Request, Response } from "express";

const app = express();

const port = "9000";

app.get("/", (req: Request, res: Response) => {
    return res.send("Hello API");
});

app.listen(port, () => {
    console.log("Server on Port: " + port);
});
