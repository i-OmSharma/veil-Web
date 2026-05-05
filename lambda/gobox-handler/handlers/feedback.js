import { json } from "../utils/response.js";
import { saveFeedback } from "../services/dynamodb.js";
import { sendEmail } from "../services/email.js";

export const handleFeedback = async (event) => {
  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { message: "Invalid JSON" });
  }

  if (!body.email || !body.email.includes("@")) {
    return json(400, { message: "Valid email required" });
  }

  const data = {
    email: body.email,
    message: body.message || "",
    timestamp: Date.now(),
  };

  try {
    await saveFeedback(data);
    await sendEmail(
      body.email,
      "Feedback for goBox",
      `Thank you for your feedback. We will get back to you soon. \n\n Message: ${body.message}`,
    );
    return json(200, { message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback", error);
    return json(500, { message: "Failed to submit feedback" });
  }
};
