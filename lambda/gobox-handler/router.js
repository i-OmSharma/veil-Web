import { handleDownload } from "./handlers/download";
import { handleFeedback } from "./handlers/feedback";
import { handleStats } from "./handlers/stats";
import { json } from "./utils/response";

export const route = async (event) => {
  const path = event.rawPath;
  const method = event.requestContext.http.method;

  //CORS Check
  if (method === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }

  if (path === "/download" && method === "GET") {
    return handleDownload(event);
  }

  if (path === "/api/feedback" && method === "POST") {
    return handleFeedback(event);
  }

  if (path === "/api/stats" && method === "GET") {
    return handleStats(event);
  }

  return json(404, { message: "Not Found" });
};
