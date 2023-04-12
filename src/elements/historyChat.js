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
          padding:16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
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
        .new-chat {
          background-color: currentColor;
          text-align: center;
        }
      `,
    ];
  }

  static get properties() {
    return {
      chats: {
        type: Array,
      },
      actualChat: {
        type: Object,
      }
    };
  }

  constructor() {
    super();
    this.chats = [];
    this.titles = [];
    this.actualChatId = ''
  }
  
    createNewChat() {
      this.dispatchEvent(
        new CustomEvent('new-chat', {
          detail: {message: 'creating a new chat...'}
        })
      )
    }

  titleExists(id) {
    return this.titles.some(title => title.id === id)
  }

  theresContentGpt() {
    if(Object.keys(this.chats[0]?.gpt).length) return true
    return false;
  }

  async getTitle(){
    if(this.chats.length && !this.titleExists(this.actualChatId) && this.theresContentGpt()) {
      let newTitle = {}
      const inputTitle = await chat.postMessage(`Hazme un titulo de 3 o maximo 4 palabras de la siguiente frase o pregunta: ${this.chats[0].gpt.choices[0].message.content}`);
      newTitle.id = this.actualChatId;
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
        ${this.chats.length
          ? this.chats.map((chat, index)=>html`
            <div>
              ${this.titles[index]?.title}   
            </div>
          `)
          : ''
        }

        <div class="new-chat chat" @click=${this.createNewChat}>
          <h5>Nuevo chat +</h5>
        </div>
      </div>
    `;
  }
}

export default customElements.define(HistoryChat.is, HistoryChat);
