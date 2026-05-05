export const CONFIG = {
    REGION: "ap-south-1",
    METRICS_TABLE: "gobox-metrics",
    FEEDBACK_TABLE: "gobox-feedback",
    DOWNLOAD_PATH: "/releases/gobox-linux",
    FROM_EMAIL: process.env.FROM_EMAIL || "",
}