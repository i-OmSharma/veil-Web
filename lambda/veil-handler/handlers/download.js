import { incrementMetrics } from "../services/dynamodb.js";
import { redirect } from "../utils/response.js";
import { CONFIG } from "../config.js";


export const handleDownload = async (event) => {

    const query = event.queryStringParameters || {};
    const VALID_OS = ["linux", "mac", "windows"];
    const os = VALID_OS.includes(query.os) ? query.os : "linux";

    try {
        await Promise.all([
            incrementMetrics("visit_count"),
            incrementMetrics(`download_count_${os}`),
        ])
    } catch(err) {
        console.error("Error incrementing metrics", err)
    }

    if (os === "linux") {
        return redirect(CONFIG.DOWNLOAD_PATH);
    }

    return redirect("/unsupported");
};