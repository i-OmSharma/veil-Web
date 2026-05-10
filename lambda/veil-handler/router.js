import { handleDownload } from "./handlers/download.js";
import { handleFeedback } from "./handlers/feedback.js";
import { handleStats } from "./handlers/stats.js";
import { handleVisit } from "./handlers/visit.js";
import { json } from "./utils/response.js";

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

  if (path === "/api/visit" && method === "POST") {
    return handleVisit(event);
  }

  return json(404, { message: "Not Found" });
};
