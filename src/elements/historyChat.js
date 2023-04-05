import { LitElement, html, css } from "lit";
import { chat } from "../api";

export class HistoryChat extends LitElement {
  static get is() {
    return "history-chat";
  }

  static get styles() {
    const { cssRules } = document.styleSheets[0];
    const gobalStyle = css([
      Object.values(cssRules)
        .map((rule) => rule.cssText)
        .join("\n"),
    ]);
    return [
      gobalStyle,
      css`
        .chats-container {
          text-align: left;
          width: 100%;
          background-color: #343541;
          min-height: 100vh;
          padding:16px
        }
        .chat {
          padding: 12px;
          background-color: #444654;
          border-radius: 12px;
          cursor: pointer
        }
        .chat:hover{
          box-shadow: 0 0 6px rgba(255,255,255,0.5);
        }
        .chat h5 {
          color: #ffffff;
          margin: 0;
        }
      `,
    ];
  }

  static get properties() {
    return {
      chats: {
        type: Array,
      },
      chat: {
        type: Object,
      }
    };
  }

  constructor() {
    super();
    this.chats = [];
    this.titles = [];
  }

  titleExists(input) {
    return this.titles.some(title => title.input === input)
  }

  async getTitle(){
    if(Object.entries(this.chats[0]).length && !this.titleExists(this.chats[0].choices[0].message.content)) {
      let newTitle = {}
      const inputTitle = await chat.postMessage(`Hazme un titulo de 3 o maximo 4 palabras de la siguiente frase o pregunta: ${this.chats[0].choices[0].message.content}`);
      newTitle.input = this.chats[0].choices[0].message.content;
      newTitle.title = inputTitle.choices[0].message.content;
      this.titles.push(newTitle);
      this.requestUpdate();
    }
  }

  updated() {
    this.getTitle();
  }

  render() {
    return html`
      <div class="chats-container">
        <div class="chat">
          ${this.titles.length ? this.titles.map(title=>html`<h5>${title.title}</h5>`):html`<h5>Aun no hay chats</h5>`}
        </div>
      </div>
    `;
  }
}

// eslint-disable-next-line no-undef
export default customElements.define(HistoryChat.is, HistoryChat);
