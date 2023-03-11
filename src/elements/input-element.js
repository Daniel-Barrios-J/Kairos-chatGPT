import { LitElement, css, html } from 'lit';

export class MyInput extends LitElement {
    static get properties() {
        return {
            value: { type: String },
            URL_API: {type: String},
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
                width: 80%;
                max-height:24px;
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
            }
        `
    }

    constructor() {
        super();
        this.value = '';
        this.URL_API= "https://api.openai.com/v1";
    }

    handleInput(event) {
        // this.value = event.target.value;
        console.log(this.value)
    }

    render() {
        return html`
        <div class='container'>
            <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"/>
            <input type="text" .value=${this.value} class="input--container">
            <button @click="${this.handleInput}" class="button--container">
            <i class="uil uil-message"></i>
            </button>
        </div>
            `
    }

    _sendMessage(value){
        fetch(this.URL_API, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: (value),
        })
    }
}

customElements.define('input-element', MyInput)
