import {SESv2Client, SendEmailCommand} from "@aws-sdk/client-sesv2";
import { CONFIG } from "../config";


const ses = new SESv2Client({
  region: CONFIG.REGION,
});

export const sendEmail = async (to, subject, body) => {

    if (!to) {
        return { status: 400,  message: "Email missing"}
    }
  try {
    await ses.send(
      new SendEmailCommand({
        FromEmailAddress: CONFIG.FROM_EMAIL,
        Destination: {
          ToAddresses: [to],
        },
        Content: {
          Simple: {
            Subject: {
              Data: subject,
            },
            Body: {
              Text: {
                Data: body,
              },
            },
          },
        },
      }),
    );
  } catch (err) {
    console.error("SESv2 error", err);
  }
};
