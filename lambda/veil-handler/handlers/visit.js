import { incrementMetrics, getMetrics } from "../services/dynamodb.js";
import { json } from "../utils/response.js";

export const handleVisit = async () => {
    try {
        await incrementMetrics("visit_count");
        const [linux, mac, windows, visits] = await Promise.all([
            getMetrics("download_count_linux"),
            getMetrics("download_count_mac"),
            getMetrics("download_count_windows"),
            getMetrics("visit_count"),
        ]);
        const total = (linux.count || 0) + (mac.count || 0) + (windows.count || 0);
        return json(200, { downloads: total, visits: visits.count || 0 });
    } catch (err) {
        console.error("Error in visit handler", err);
        return json(500, { error: "Failed" });
    }
};
