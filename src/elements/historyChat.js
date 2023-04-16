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
          cursor: pointer;
        }
        .chat-selected {
          box-shadow: 0 0 6px rgba(255,255,255,0.5);
        }
        .chat:hover{
          box-shadow: 0 0 6px rgba(255,255,255,0.5);
        }
        .chat p {
          font-size: 14px;
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
      },
      actualChatId: {
        type: String,
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
  
  indexChat() {
    return this.chats?.findIndex(chat => chat.id === this.actualChatId)
  }

  indexTitle(id) {
    const index = this.titles.findIndex(title => title.id === id)
    return index
  }

  theresContentGpt() {
    if(Object.keys(this.chats[this.indexChat()]?.gpt).length) return true
    return false;
  }

  async getTitle(){
    if(this.chats.length && !this.titleExists(this.actualChatId) && this.theresContentGpt()) {
      let newTitle = {}
      const inputTitle = await chat.postMessage(`Hazme un titulo de estrictamente 3 o maximo 4 palabras de la siguiente frase, palabra o pregunta: ${this.chats[this.indexChat()].gpt.choices[0].message.content}`);
      newTitle.id = this.actualChatId;
      newTitle.title = inputTitle.choices[0].message.content;
      this.titles.push(newTitle);
      this.requestUpdate();
    }
  }

  updated() {
    this.getTitle();
  }

  changeChat(idChat) {
    this.dispatchEvent(
      new CustomEvent('change-chat',{
        detail: {message: `changing to chat...${idChat}`, idChat}
      })
    )
  }

  render() {
    return html`
      <div class="chats-container">
        ${this.chats.length
          ? this.chats.map((chat)=>html`
            <div class=${chat.id === this.actualChatId ?"chat chat-selected": "chat"} @click=${()=>this.changeChat(chat.id)}>
              <p>
                ${this.titles[this.indexTitle(chat.id)]?.title ? this.titles[this.indexTitle(chat.id)].title : 'New chat'}   
                <!-- ${chat.id} -->
              </p>
            </div>
          `)
          : ''
        }

        <div class="new-chat chat" @click=${this.createNewChat}>
          <p>Nuevo chat +</p>
        </div>
      </div>
    `;
  }
}

export default customElements.define(HistoryChat.is, HistoryChat);
