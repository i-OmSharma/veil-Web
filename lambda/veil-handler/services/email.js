import { Resend } from "resend";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

if (!process.env.FROM_EMAIL) throw new Error("FROM_EMAIL env var not set");
if (!process.env.SSM_PARAM_RESEND_API_KEY) throw new Error("SSM_PARAM_RESEND_API_KEY env var not set");

const ssm = new SSMClient({});
let _cachedApiKey;

const getResendApiKey = async () => {
  if (_cachedApiKey) return _cachedApiKey;
  const { Parameter } = await ssm.send(
    new GetParameterCommand({
      Name: process.env.SSM_PARAM_RESEND_API_KEY,
      WithDecryption: true,
    })
  );
  _cachedApiKey = Parameter.Value;
  return _cachedApiKey;
};

export const sendEmail = async (to, subject, body) => {
  if (!to) throw new Error("Recipient email missing");

  const apiKey = await getResendApiKey();
  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: `Veil <${process.env.FROM_EMAIL}>`,
      to: [to],
      subject,
      html: `<div style="font-family: sans-serif;"><h2>Veil</h2><p>${body}</p></div>`,
    });
  } catch (err) {
    console.error("Resend error", err);
    throw err;
  }
};
