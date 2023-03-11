import ConnectionApiGPT from "./connectionApiGPT";

export class Chat extends ConnectionApiGPT {
  postMessage(
    message = null,
    options = {
      role: this.getConstants.roleDefault,
      model: this.getConstants.modelDefault,
    }
  ) {
    return new Promise((resolve, reject) => {
      if (!message) {
        reject("Chat: insert parameter 'message' on method postMessage()");
      }

      fetch(`${this.API_URL}/chat/completions`, {
        method: "POST",
        headers: this.createHeaders(),
        body: JSON.stringify({
          model: options.model,
          message: [{ model: options.model, content: message }],
        }),
      })
        .then((res) => res.json())
        .then((dataReponse) => resolve(dataReponse))
        .catch((error) => reject(error));
    });
  }
}

const chat = new Chat();
export default chat;
