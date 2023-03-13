import { LitElement, html, css } from "lit";



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
            text-align:left;
            width: 100%;
            background-color: #343541;
            min-height: 100vh;
        }
        .chat {
            padding: 25px;
            background-color: #444654;
        }
        .chat h5 {
            color: #ffffff;
          }
      `,
    ];
  }

  static get properties() {
    return {
      chat: {
        type: Object,
      },
    };
  }
  

  constructor() {
    super();
    this.chat = {}
    this.chats = [
      // {
      //    id:'dlsjkfhas',
      //    title: 'titulo 1',
      //    sessionChat: [
      //     ...this.chats,
      //     {...this.chat}
      //    ]
      // }
    ]
    
  }



  render() {
    return html`
    <div class="chats-container">
      <div class="chat">

        ${this.chats?.map(chat => {
          return html`
          <h5>
            ${chat.title}
          </h5>
          `
        })}
        
      </div>
    </div>
    `      
  }
}

// eslint-disable-next-line no-undef
export default customElements.define(HistoryChat.is, HistoryChat);