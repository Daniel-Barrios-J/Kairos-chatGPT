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
        .conteiner-output {
          background-color: #343541;
          padding: 20px;
          margin: 0px;
        }
        section {
          margin: 6px 5px;
          padding: 10px;
          display: flex;
          flex-direction: row;
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
      <div class="conteiner-output">
        <div class="colum">
          ${this.data.choices.map(({ message }) => {
            return html`
              <section class="row">
                ${message.role === "assistant"
                  ? html`<div class="photo col-md-1">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        width="60"
                      />
                    </div>`
                  : null}
                <div class="message col-md-10">
                  <p>${message.content}</p>
                </div>
                ${message.role === "user"
                  ? html`<div class="photo col-md-1">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        width="60"
                      />
                    </div>`
                  : null}
              </section>
            `;
          })}
        </div>
      </div>
    `;
  }
}

export default customElements.define("output-module", OutputModule);
