import { LitElement, html,css } from 'lit-element';
import { chat } from "../api";

export class OutputModule extends LitElement {
    static get properties() {
        return {
            data:{type:Array},
        };
    }
    static get styles() {
        console.log("styles");
        const { cssRules } = document.styleSheets[0];
        const globalStyle = css([
          Object.values(cssRules)
            .map((rule) => rule.cssText)
            .join("\n"),
        ]);
        return [
            globalStyle,
            css`
            section{
                margin:6px 5px;
                padding:10px;
                display:flex;
                flex-direction:row;
            }
            .conteiner-output{
              background-color: #343541;
              padding: 20px;
              margin:0px
            }
            .message{
              background-color: rgba(255, 255, 255, 0.1);
              padding: 10px;
              border-radius: 15px;
              color: white;
              font-family: sans-serif;
              font-size: 14px
            }
            .message-dummy{
              color: white;
              font-family: sans-serif;

            }
            `,
          ];}
    
    constructor() {
        super();
        this.data = {};
        this.mensaje = '';

      }

pregunta (mensajeParaChat='') {
    chat.postMessage(mensajeParaChat)
    .then ((data) => console.log(data))
    .catch ((err) => console.log(err))
}
//

  render() {
    const respuestaChat = {
        "id": "chatcmpl-123",
        "object": "chat.completion",
        "created": 1677652288,
        "choices": [{
          "index": 0,
          "message": {
            "role": "assistant",
            "content": "\n\nHello there, how may I assist you today?",
          },
          "finish_reason": "stop"
        }],
        "usage": {
          "prompt_tokens": 9,
          "completion_tokens": 12,
          "total_tokens": 21
        }
      }
      
    return html`
      <div class="conteiner-output">
        <div class="colum">
            <section class="row">
                <div class="message col-md-10">Mensaje para ChatGPT</div> 

                <div class="photo col-md-1">
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" width=60>
                </div>
            </section>
            <section class="row">
                <div class="photo col-md-1">
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" width=60>
                </div>
                <div class="message col-md-10">${respuestaChat.choices[0].message.content}</div>
            </section>
        </div>
      </div>
    `;
  }
}
// "choices": [{
//     "index": 0,
//     "message": {
//       "role": "fotoUsuario",
//       "content": "\n\nHello there, esta vivi xD",
//     },

/*{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 12,
    "total_tokens": 21
  }
}*/
export default customElements.define('output-module',OutputModule);