import { login } from "../src/api/auth";

login( "lauraemail@gmail.com", "laura123")
 .then((res) => console.log("Success:", res))
 .catch((err) => console.error("Error:", err.message));