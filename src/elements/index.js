import { LitElement, html, css } from "lit";
import { v4 as uuidv4 } from 'uuid';


//local components
import "./input-element";
import "./outputModule";
import "./historyChat";

export class IndexPage extends LitElement {
  static get styles() {
    return css`
      .main-container {
        display: flex;
      }
      .history {
        min-width: 250px;
      }
      .chat {
        height: 95vh;
        width: 80vw;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
      }
      .output {
        width: 100%;
      }
      .input {
        width: 100%;
      }
    `;
  }
  static get is() {
    return "index-page";
  }

  constructor() {
    super();
    this.chats = [];
    this.actualChat = {
      id: '',
      gpt: {}
    };
  }

  handleNewChat(e) {
    const newChat = {}
    newChat.id = uuidv4();
    newChat.gpt = {};
    this.chats.unshift(newChat);
    this.actualChat = newChat;
    this.requestUpdate();
  }

  handleChatGpt(event) {

    const { input, gpt } = event.detail.message;
    console.log({...gpt});
    if (this.chats.length && this.actualChat.id !== '') {
      const index = this.chats.findIndex(chat => chat.id === this.actualChat.id)
      console.log(index);
      if(!Object.keys(this.actualChat.gpt).length) this.chats[index].gpt = {...gpt};
      console.log(this.chats);
      this.chats[index].gpt?.choices?.push({
        index: this.chats[index].gpt.choices.length,
        message: { role: "user", content: input },
      });
      this.chats[index].gpt.choices?.push({
        index: this.chats[index].gpt.choices.length,
        message: {
          role: "assistant",
          content: gpt?.choices[0]?.message?.content,
        },
      });
    } else {
      const id = uuidv4();
      this.chats.push({id, gpt});
      this.chats[0]?.gpt?.choices.unshift({
        index: this.chats[0].gpt.choices.length,
        message: { role: "user", content: input },
      });
      this.actualChat = this.chats[0];
    }
    this.requestUpdate();
  }

  render() {
    return html`<div>
      <main class="main-container">
        <div class="history">
          <history-chat @new-chat=${this.handleNewChat} chats=${JSON.stringify(this.chats)} actualChatId=${this.actualChat?.id}></history-chat>
        </div>
        <div class="chat">
          <div class="output">
            <output-module data=${JSON.stringify(this.actualChat?.gpt)}></output-module>
          </div>
          <div class="input">
            <input-element @send-response=${this.handleChatGpt}></input-element>
          </div>
        </div>
      </main>
    </div>`;
  }
}

export default customElements.define(IndexPage.is, IndexPage);
