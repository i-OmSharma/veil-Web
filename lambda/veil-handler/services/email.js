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

const baseTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:48px 24px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:36px 48px 28px;border-bottom:3px solid #dc2626;">
              <span style="font-size:26px;font-weight:900;color:#2d2d2d;letter-spacing:-1px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">veil<span style="color:#dc2626;">.</span></span>
            </td>
          </tr>

          <!-- Body -->
          ${content}

          <!-- Footer -->
          <tr>
            <td style="background:#2d2d2d;padding:24px 48px;">
              <p style="font-size:11px;color:#6b7280;margin:0;line-height:1.7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
                You received this email because you signed up at
                <a href="https://veils.systems" style="color:#dc2626;text-decoration:none;">veil</a>.
                &nbsp;·&nbsp;
                <a href="mailto:support@veils.systems" style="color:#6b7280;text-decoration:none;">support@veils.systems</a>
                <br />© ${new Date().getFullYear()} Veil. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const subscriptionHtml = () => baseTemplate(`
  <!-- Main content -->
  <tr>
    <td style="padding:40px 48px 32px;">
      <h1 style="font-size:20px;font-weight:900;color:#2d2d2d;letter-spacing:-0.5px;margin:0 0 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
        You're on the list.
      </h1>
      <p style="font-size:15px;color:#6b7280;line-height:1.75;margin:0 0 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
        Thanks for subscribing. We'll notify you the moment veil ships — release notes, binary downloads, and nothing else. No spam, ever.
      </p>
      <p style="font-size:15px;color:#6b7280;line-height:1.75;margin:0 0 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
        Veil is a daemonless, OCI-compliant container runtime written in Go — built from scratch on Linux primitives. No daemons, no wrappers, no runtime dependencies. Just namespaces, cgroups v2, and OverlayFS.
      </p>
      <!-- CTAs -->
      <table cellpadding="0" cellspacing="0" style="margin-top:8px;">
        <tr>
          <td style="background:#2d2d2d;padding:13px 24px;">
            <a href="https://veils.systems" style="font-size:11px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:1.5px;text-transform:uppercase;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Visit Site</a>
          </td>
          <td width="16"></td>
          <td style="padding:13px 0;border-bottom:2px solid #2d2d2d;">
            <a href="https://github.com/i-OmSharma/veil" style="font-size:11px;font-weight:700;color:#2d2d2d;text-decoration:none;letter-spacing:1.5px;text-transform:uppercase;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">GitHub →</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
`);

const feedbackHtml = (message) => baseTemplate(`
  <tr>
    <td style="padding:40px 48px 40px;">
      <h1 style="font-size:20px;font-weight:900;color:#2d2d2d;letter-spacing:-0.5px;margin:0 0 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
        We got your message.
      </h1>
      <p style="font-size:15px;color:#6b7280;line-height:1.75;margin:0 0 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
        Thanks for reaching out. We read every message and will get back to you shortly.
      </p>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;border-left:3px solid #dc2626;">
        <tr>
          <td style="padding:16px 20px;">
            <p style="font-size:12px;font-weight:700;color:#9ca3af;letter-spacing:1px;text-transform:uppercase;margin:0 0 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Your message</p>
            <p style="font-size:14px;color:#2d2d2d;line-height:1.7;margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">${message}</p>
          </td>
        </tr>
      </table>
      <p style="font-size:13px;color:#9ca3af;line-height:1.7;margin:24px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
        — Om Sharma, Veil
      </p>
    </td>
  </tr>
`);

export const sendSubscriptionEmail = async (to) => {
  if (!to) throw new Error("Recipient email missing");
  const apiKey = await getResendApiKey();
  const resend = new Resend(apiKey);
  try {
    await resend.emails.send({
      from: `Veil <${process.env.FROM_EMAIL}>`,
      to: [to],
      subject: "You're on the list — Veil.",
      html: subscriptionHtml(),
    });
  } catch (err) {
    console.error("Resend error", err);
    throw err;
  }
};

export const sendFeedbackEmail = async (to, message) => {
  if (!to) throw new Error("Recipient email missing");
  const apiKey = await getResendApiKey();
  const resend = new Resend(apiKey);
  try {
    await resend.emails.send({
      from: `Veil <${process.env.FROM_EMAIL}>`,
      to: [to],
      subject: "We got your message — Veil.",
      html: feedbackHtml(message),
    });
  } catch (err) {
    console.error("Resend error", err);
    throw err;
  }
};
