import { register } from "../src/api/auth";

register("Laura Figueroa", "lauraemail@gmail.com", "laura123")
 .then((res) => console.log("Success:", res))
 .catch((err) => console.error("Error:", err.message));