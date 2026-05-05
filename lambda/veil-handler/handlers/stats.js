import { getMetrics } from "../services/dynamodb.js";
import { json } from "../utils/response.js";


export const handleStats = async () => {
    try {
        const [linux, mac, windows] = await Promise.all([
            getMetrics("download_count_linux"),
            getMetrics("download_count_mac"),
            getMetrics("download_count_windows"),
        ])

        const total = (linux.count || 0) + (mac.count || 0) + (windows.count || 0)

        return json(200, { downloads: total })
    } catch (err) {
        console.error("Error fetching stats", err)
        return json(500, { error: "Failed to fetch stats" })
    }
}