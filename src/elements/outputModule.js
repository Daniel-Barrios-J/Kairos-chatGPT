import { LitElement, html, css } from "lit-element";

export class OutputModule extends LitElement {
  /*data:
  Contain Array 
  with Cuestion to ChatGPT ('String')
  and 
  Response by ChatGPT ('Object')
  */
  static get properties() {
    return {
      data: { type: Object },
    };
  }
  static get styles() {
    const { cssRules } = document.styleSheets[0];
    const globalStyle = css([
      Object.values(cssRules)
        .map((rule) => rule.cssText)
        .join("\n"),
    ]);
    return [
      globalStyle,
      css`
        .container-output {
          /* background-color: #343541; */
          padding: 20px;
          margin: 0 auto;
          min-width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .output-user {
          text-align: end;
        }
        
        section {
          padding: 10px;
          display: flex;
          width: 100%;
        }
        .message-container {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
        }
        .message {
          background-color: rgba(255, 255, 255, 0.1);
          padding: 10px;
          border-radius: 15px;
          color: white;
          font-family: sans-serif;
          font-size: 14px;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.data = {};
  }

  render() {
    return html`
      <div class="container-output">
        ${this.data?.choices?.map(({ message }) => {
          return html`
            <section class="row">
              ${message.role === "assistant"
                ? html`
                <div class="message-container">
                  <img width="60" heigth="60" src="https://cdn-icons-png.flaticon.com/512/149/149071.png"/>
                  <div class="message col-md-10">
                    <p>${message.content}</p>
                  </div>
                </div>
                `
                : html`
                <div class="message-container">
                  <div class="message col-md-10">
                    <p class="output-user">${message.content}</p>
                  </div>
                  <img width="60" src="https://cdn-icons-png.flaticon.com/512/149/149071.png"/>
                </div>
                `
                }
                
            </section>
          `;
        })}
      </div>
    `;
  }
}

export default customElements.define("output-module", OutputModule);
