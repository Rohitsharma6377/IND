export function setupSSE(app, bus) {
  app.get("/__indjs/events", (req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    });
    const send = (type, data) => {
      res.write(`event: ${type}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };
    const onError = (e) =>
      send("error", {
        message: e?.message || String(e),
        stack: e?.stack || "",
      });
    const onRebuild = (info) => send("rebuild", info || {});
    const onBuildStart = (info) => send("build-start", info || {});
    const onBuildEnd = (info) => send("build-end", info || {});
    bus.on("error", onError);
    bus.on("rebuild", onRebuild);
    bus.on("build-start", onBuildStart);
    bus.on("build-end", onBuildEnd);
    req.on("close", () => {
      bus.off("error", onError);
      bus.off("rebuild", onRebuild);
      bus.off("build-start", onBuildStart);
      bus.off("build-end", onBuildEnd);
    });
  });
}
