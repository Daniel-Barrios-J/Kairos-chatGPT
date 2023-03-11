import { chat } from "../api";

function testPostMessage() {
  chat.setToken(process.env.API_KEY);

  chat
    .postMessage("Hola chat!")
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

it("POST-CHAT", () => {
  testPostMessage();
});
