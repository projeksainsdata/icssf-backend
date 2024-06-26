import authService from "../services/auth.service.js";
import userServices from "../services/user.service.js";
import generatePayload from "../utils/generatePayload.js";

class UserControllers {
  service = userServices();
  
}
export default UserControllers;
