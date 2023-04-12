import { LitElement, css, html } from "lit";
import { chat } from "../api";

export class MyInput extends LitElement {
  static get properties() {
    return {
      valueInput: { type: String },
    };
  }

  static get styles() {
    return css`
      .form {
        display: flex;
        background-color: rgba(64, 65, 79);
        padding: 0.75rem 1rem;
        border-radius: 0.375rem;
        width: 80%;
        height: 36px;
        margin: 0 auto;
        margin-top: 16px;

      }
      .form-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .loading {
        color: #d9d9e3;
        font-size: 24px;
        text-align: center;
      }

      .input--container {
        width: 100%;
        background-color: transparent;
        outline: none;
        border-width: 0;
        border-color: transparent;
        color: white;
      }

      .button--container {
        background-color: transparent;
        outline: none;
        border-width: 0;
        color: #d9d9e3;
        cursor: pointer;
      }
      .loader-container {
        display: flex;
        align-items: center;
        gap: 24px;
      }
      .loader {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: inline-block;
        border-top: 3px solid #FFF;
        border-right: 3px solid transparent;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
      }

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
    `;
  }

  constructor() {
    super();
    this.valueInput = "";
    this.loading = '';
  }

  async obtainValue(e) {
    e.preventDefault();
    this.loading = true;
    this.requestUpdate();
    const value = await chat.postMessage(this.valueInput);
    this.dispatchEvent(
      new CustomEvent("send-response", {
        detail: { message: { input: this.valueInput, gpt: value } },
      })
    );
    this.valueInput = '';
    this.loading = ''
  }

  updateValue(e) {
    this.valueInput = e.target.value;
  }

  render() {
    return html`
      <div class='form-container'>
        ${
          this.loading
          ? html`
          <div class='loader-container'>
            <span class='loading'>Generando respuesta...</span>
            <span class="loader"></span>
          </div>
          `
          : ''
        }
        <form class="form" @onSubmit=${this.obtainValue}>
          <link
          rel="stylesheet"
          href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
          />
          <input
            @input=${this.updateValue}
            type="text"
            class="input--container"
            id="myInput"
            .value=${this.valueInput}
          />
          <button @click=${this.obtainValue} class="button--container">
            <i class="uil uil-message"></i>
          </button>
        </form>
      </div>
    `;
  }
}

customElements.define("input-element", MyInput);
