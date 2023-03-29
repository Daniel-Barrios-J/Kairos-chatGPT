import { LitElement, html, css } from "lit";

//local components
import "./input-element";
import "./outputModule";
import "./historyChat";

export class IndexPage extends LitElement {
  static get styles() {
    return css`
      .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
      }
      
      .history {
        grid-column: 1;
        grid-row: 1;
      }
      .chat {
        grid-column: 3;
        grid-row: 1;
        display: flex;
        flex-direction: column;
      }
      .input {
        align-self: flex-end;
      }
    `;
  }
  static get is() {
    return "index-page";
  }

  constructor() {
    super();
    this.chats = {};
  }

  handleChatGpt(event) {
    const { input, gpt } = event.detail.message;

    if (Object.keys(this.chats).length) {
      this.chats?.choices?.push({
        index: this.chats?.choices.length,
        message: { role: "user", content: input },
      });
      this.chats?.choices?.push({
        index: this.chats?.choices.length,
        message: {
          role: "assistant",
          content: gpt?.choices[0]?.message?.content,
        },
      });
    } else {
      this.chats = gpt;
      this.chats?.choices?.unshift({
        index: this.chats?.choices.length,
        message: { role: "user", content: input },
      });
    }
    this.requestUpdate();
  }

  render() {
    return html`<div>
      <div class="grid">
        <div class="history">
          <history-chat chats=${JSON.stringify([this.chats])}></history-chat>
        </div>
        <div class="chat">
          <div class="output">
            <output-module data=${JSON.stringify(this.chats)}></output-module>
          </div>
          <div class="input">
            <input-element @send-response=${this.handleChatGpt}></input-element>
          </div>
        </div>
      </div>
    </div>`;
  }
}

export default customElements.define(IndexPage.is, IndexPage);
