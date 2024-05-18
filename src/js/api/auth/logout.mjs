import { remove } from "../../storage/remove.mjs";

export function logOut() {
    remove("token");
    remove("profile");  
    
}   