import axios from "axios";
import Cookies from "universal-cookie";
import BaseURL from "../BaseURL";

const Auth = async (id, username, password) => {
    const cookies = new Cookies();
    const request = await axios.post(BaseURL + "cms-backend/checkAuth.php", {
        id: id,
        username: username,
        password: password,
    })
    try {
        if (request.data.resp == "200" && request.data.id == cookies.get("id")) {
            return {
                id: request.data.id,
                avatar: `../Images/avatars/${request.data.avatar}`,
                name: request.data.name,
                family: request.data.family,
                time: request.data.time,
                activity: request.data.activity,
                mobile : request.data.mobile,
                customAvatar : request.data.avatar,
            }
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


export default Auth;