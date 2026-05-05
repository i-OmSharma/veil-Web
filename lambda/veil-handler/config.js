if (!process.env.FROM_EMAIL) {
    throw new Error("FROM_EMAIL not configured");
}

export const CONFIG = {
    REGION: process.env.AWS_REGION || "ap-south-1",
    METRICS_TABLE: process.env.METRICS_TABLE,
    FEEDBACK_TABLE: process.env.FEEDBACK_TABLE,
    DOWNLOAD_PATH: "/releases/veil-linux",
    FROM_EMAIL: process.env.FROM_EMAIL,
}