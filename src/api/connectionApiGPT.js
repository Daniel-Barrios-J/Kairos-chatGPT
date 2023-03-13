const API_URL = process.env.API_URL || "https://api.openai.com/v1";

const CONSTANTS = {
  token: "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",
  roleDefault: "user",
  modelDefault: "gpt-3.5-turbo",
};

export default class ConnectionApiGPT {
  constructor() {
    this.API_URL = API_URL;
  }

  get getConstants() {
    return CONSTANTS;
  }

  getToken() {
    return sessionStorage.getItem(CONSTANTS.token);
  }

  setToken(otherToken = null) {
    if (!otherToken)
      throw new Error(
        "ConnectionApiGPT: insert parameter 'otherToken' on method setToken()"
      );
      //set new token
    sessionStorage.setItem(CONSTANTS.token, otherToken);
  }

  createHeaders(options = { isAuth: true, otherHeaders: {} }) {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.otherHeaders,
    };

    if (options.isAuth) {
      headers.Authorization = `Bearer ${this.getToken()}`;
    }

    return headers;
  }
}
