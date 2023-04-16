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
        background-color: white;
      }
      .chat {
        height: 100vh;
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
      @media all and (max-width: 640px) {
        .main-container {
        display: flex;
        flex-direction: column-reverse;
        }
        .chat {
        height: 90vh;
        width: 100vw;
        }
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
    this.actualChat = this.chats[0];
    this.requestUpdate();
  }

  handleChatGpt(event) {

    const { input, gpt } = event.detail.message;
    
    if (this.chats.length && Object.keys(this.actualChat.gpt).length) {
      this.actualChat.gpt?.choices?.push({
        index: this.actualChat.gpt.choices.length,
        message: { role: "user", content: input },
      });
      this.actualChat.gpt.choices?.push({
        index: this.actualChat.gpt.choices.length,
        message: {
          role: "assistant",
          content: gpt?.choices[0]?.message?.content,
        },
      });
    } else if(!this.chats.length){
      const newChat = {}
      newChat.id = uuidv4();
      newChat.gpt = {...gpt}
      this.chats.unshift(newChat);
      this.actualChat = this.chats[0];
      this.actualChat.gpt.choices?.unshift({
        index: this.actualChat?.gpt?.choices?.length,
        message: { role: "user", content: input },
      });
    } else {
      this.actualChat.gpt = {...gpt};
      this.actualChat.gpt.choices.unshift({
        index: this.actualChat?.gpt?.choices?.length,
        message: { role: "user", content: input },
      });
    }
    this.requestUpdate();
  }

  changeChat(e) {
    const {idChat} = e.detail;
    if(idChat === this.actualChat.id) return
    const indexChat = this.chats.findIndex(chat => chat.id === idChat)
    this.actualChat = this.chats[indexChat];
    this.requestUpdate()
  }

  render() {
    return html`<div>
      <main class="main-container">
        <div class="history">
          <history-chat 
            @new-chat=${this.handleNewChat}
            chats=${JSON.stringify(this.chats)}
            actualChatId=${this.actualChat.id}
            @change-chat=${this.changeChat}
          ></history-chat>
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
