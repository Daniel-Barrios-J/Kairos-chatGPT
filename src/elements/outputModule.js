import { LitElement, html,css } from 'lit-element';

console.log('Create');
export class OutputModule extends LitElement {
  /*data:
  Contain Array 
  with Cuestion to ChatGPT ('String')
  and 
  Response by ChatGPT ('Object')
  */
    static get properties() {
        return {
            data:{type:Object},
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
            .conteiner-output{
              background-color: #343541;
              padding: 20px;
              margin:0px
            }
            section{
                margin:6px 5px;
                padding:10px;
                display:flex;
                flex-direction:row;
            }
            .message{
              background-color: rgba(255, 255, 255, 0.1);
              padding: 10px;
              border-radius: 15px;
              color: white;
              font-family: sans-serif;
              font-size: 14px
            }
            `,
          ];}
    
    constructor() {
        super();
        this.data = {}
      }

  render() {
    return html`
      <div class="conteiner-output">
        <div class="colum">
            <section class="row">
                <div class="message col-md-10">${this.data.choices[0].message.filter((message)=>(message.role==="user")).map((message)=>{return html`<p>${message.content.trim()}</p>`})}</div> 

                <div class="photo col-md-1">
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" width=60>
                </div>
            </section>
            <section class="row">
                <div class="photo col-md-1">
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" width=60>
                </div>
                <div class="message col-md-10">${this.data.choices[0].message.filter((message)=>(message.role==="assistant")).map((message)=>{return html`<p>${message.content.trim()}</p>`})}</div>
            </section>
        </div>
      </div>
    `;
  }
}


export default customElements.define('output-module',OutputModule);
