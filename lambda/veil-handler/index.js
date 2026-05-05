import { route } from "./router.js";
import { json } from "./utils/response.js";
   
export const handler = async (event) => {
    console.log("EVENT:", JSON.stringify(event));

    try {
        const res = await route(event)
        console.log("RESPONSE: ", JSON.stringify(res));
        return res
    } catch (error) {
        console.error("Error in handler", error)
    
        return json(500, { error: "Internal server error" })
    }
}