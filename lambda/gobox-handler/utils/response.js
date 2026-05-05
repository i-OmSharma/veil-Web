const baseHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


export const json = (statusCode, body) => ({
    statusCode,
    headers: {
        ...baseHeaders,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
});

export const redirect = (localtion) => ({ //used for redirecting to locaiton
    statusCode: 302,
    headers: {
        ...baseHeaders,
        Location: localtion
    }
})