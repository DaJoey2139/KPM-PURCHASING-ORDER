import config from "../config";
import ServiceHTTP from "./ServiceHTTP";

const ServiceAuth = {};
const ENDPOINT_LOGIN = "/user/signin";
const ENDPOINT_CHECK_TOKEN = "/hello/world";
const KEY_LOCAL_STORAGE_TOKEN = "TOKEN";

ServiceAuth.login = ({ email, password }) => {
  return ServiceHTTP.post(`${config.BASE_URL}${ENDPOINT_LOGIN}`,{
    email,
    password,
  });
};

ServiceAuth.tokenVerify = async () => {
  const token = ServiceAuth.getToken();

  try {
    if (token) {
      await ServiceHTTP.post(
        `${config.BASE_URL}${ENDPOINT_CHECK_TOKEN}`,
        {},
        {
          headers: {
            "x-access-token": ServiceAuth.getToken(),
          },
        }
      );

      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};

ServiceAuth.saveToken = (token) => {
  localStorage.setItem(KEY_LOCAL_STORAGE_TOKEN, token);
};

ServiceAuth.getToken = () => {
  return localStorage.getItem(KEY_LOCAL_STORAGE_TOKEN);
};

export default ServiceAuth;
