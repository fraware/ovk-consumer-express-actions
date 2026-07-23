import express, { Request, Response, NextFunction } from "express";

const app = express();
app.use(express.json());

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const role = String(req.header("x-role") || "user");
  if (role !== "admin") {
    res.status(403).json({ error: "admin only" });
    return;
  }
  next();
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/admin/export", requireAdmin, (_req, res) => {
  res.json({ export: "redacted" });
});

const port = Number(process.env.PORT || 3000);
if (require.main === module) {
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
}

export default app;
