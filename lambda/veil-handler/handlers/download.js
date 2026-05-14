import { incrementMetrics } from "../services/dynamodb.js";
import { redirect } from "../utils/response.js";
import { json } from "../utils/response.js";
import { CONFIG } from "../config.js";


export const handleDownload = async (event) => {

    const query = event.queryStringParameters || {};
    const VALID_OS = ["linux", "mac", "windows"];
    const os = VALID_OS.includes(query.os) ? query.os : "linux";

    try {
        await incrementMetrics(`download_count_${os}`)
    } catch(err) {
        console.error("Error incrementing metrics", err)
    }

    if (os === "linux") {
        return redirect(
          "https://github.com/i-OmSharma/veil/releases/latest/download/veil"
        );
    }

    const osLabel = os === "mac" ? "Mac" : "Windows";
    return json(200, {
        status: "unsupported",
        message: `${osLabel} coming soon. Linux version available.`,
        os,
        linux_available: true,
    });
};
