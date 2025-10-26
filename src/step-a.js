import { LitElement, html } from 'lit';

class StepA extends LitElement {
  gotoNextStep() {
    this.dispatchEvent(new CustomEvent('next-step', {
      composed: true,
      bubbles: true,
    }));
  }

  render() {
    return html`
      <p>This is step A</p>
      <sl-button @click=${this.gotoNextStep} type="button" variant="primary">Go to next step</sl-button>
    `;
  }
}

customElements.define('step-a', StepA);