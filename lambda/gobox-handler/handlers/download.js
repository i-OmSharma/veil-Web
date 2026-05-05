import { incrementMetrics } from "../services/dynamodb";
import { redirect, json } from "../utils/response"
import { CONFIG } from "../config";


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
        return redirect(CONFIG.DOWNLOAD_PATH)
    }

    return json(200, {
        message: `${os.charAt(0).toUpperCase() + os.slice(1)} version coming soon`,
        linuxPath: CONFIG.DOWNLOAD_PATH
    })
};