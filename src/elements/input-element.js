import { LitElement, css, html } from 'lit';
import { chat } from "../api";

export class MyInput extends LitElement {
    static get properties() {
        return {
            valueInput: { type: String },
        };
    }

    static get styles() {
        return css`
            .container {
                display: flex;
                background-color: rgba(64,65,79);
                padding: .75rem 1rem;
                border-radius: .375rem;
                border-width: 1px;
                width: 48rem;
                height:24px;
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
            }
        `
    }

    constructor() {
        super();
        this.valueInput = '';
    }

    async obtainValue() {
        console.log(this.valueInput);
        const value = await chat.postMessage(this.valueInput);
        this.dispatchEvent(new CustomEvent('send-response', value));
    }

    updateValue(e) {
        this.valueInput = e.target.value;
    }

    render() {
        return html`
        <div class='container'>
            <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"/>
            <input  @input=${this.updateValue} type="text" class="input--container" id="myInput" >
            <button @click=${this.obtainValue} class="button--container">
                <i class="uil uil-message"></i>
            </button>
        </div>
            `;
    }


}

customElements.define('input-element', MyInput)
