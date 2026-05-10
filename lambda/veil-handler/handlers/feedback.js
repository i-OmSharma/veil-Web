import { json } from "../utils/response.js";
import { saveFeedback } from "../services/dynamodb.js";
import { sendSubscriptionEmail, sendFeedbackEmail } from "../services/email.js";

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

  const message = body.message || "";

  const data = {
    email: body.email,
    message,
    timestamp: Date.now(),
  };

  try {
    await saveFeedback(data);
    if (message.trim().length === 0) {
      await sendSubscriptionEmail(body.email);
    } else {
      await sendFeedbackEmail(body.email, message);
    }
    return json(200, { message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback", error);
    return json(500, { message: "Failed to submit feedback" });
  }
};
