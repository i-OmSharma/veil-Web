import { route } from "./router.js";
   
export const handler = async (event) => {
    console.log("EVENT:", JSON.stringify(event));

    try {
        const res = await route(event)
        console.log("RESPONSE: ", JSON.stringify(res));
        return res
    } catch (error) {
        console.error("Error in handler", error)
    
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Internal server error"})
        }
    }
}