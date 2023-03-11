import { LitElement, html, css } from "lit";
// import "bootstrap/dist/css/bootstrap.css";


// const URL_API = "http://localhost:3000";

/* const chats = [
  {
    chatId: 'lkjsdfhjklads',
    title: 'titulo',
    inputsUser: {
      input1:'ejemplo',
      input2: 'ejemplo',
      input3: 'ejemplo'
    },
    answers: {
      answer1:'ejemplo1',
      answer2:'ejemplo1',
      answer3:'ejemplo1'
    }
  },
  {
    chatId: 'lkjsdasdfhjklads',
    inputsUser: {
      input1:'ejemplo',
      input2: 'ejemplo',
      input3: 'ejemplo'
    },
    answers: {
      answer1:'ejemplo1',
      answer2:'ejemplo1',
      answer3:'ejemplo1'
    }
  },
] */

export class HistoryChat extends LitElement {
  static get is() {
    return "history-chat";
  }

  //estan ahi?
  //sip //Pues se deben subir los cambios, no?
  //dejo abierto el liveshare?
  //lo puedo dejar asi
  //si, los subo

  static get styles() {
    console.log("styles");
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
    console.log("properties");
    return {
      input: {
        type: Array,
      },
    };
  }

  constructor() {
    super();
    this.chats = [
      {
        chatId: 'lkjsdfhjklads',
        title: 'titulo chat 1',
        inputsUser: {
          input1:'input1-User',
          input2: 'input2-User',
          input3: 'input3-User'
        },
        answers: {
          answer1:'answer1-User',
          answer2:'answer2-User',
          answer3:'answer3-User'
        }
      },
      {
        chatId: 'lkjsdasdfhjklads',
        title: 'titulo chat 2',
        inputsUser: {
            input1: 'input1-User',
            input2: 'input2-User',
            input3: 'input3-User'
        },
        answers: {
            answer1:'answer1-User',
            answer2:'answer2-User',
            answer3:'answer3-User'
        }
      },
    ]

    
  }

  render() {
    console.log("render");
    return html`

    
    <div class="chats-container">
      <div class="chat">

        ${this.chats.map(chat => {
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