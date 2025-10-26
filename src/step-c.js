import { LitElement, html } from 'lit';

class StepC extends LitElement {
  finishSteps() {
    this.dispatchEvent(new CustomEvent('finish', {
      composed: true,
      bubbles: true,
    }));
  }

  render() {
    return html`
      <p>This is step C</p>
      <sl-button @click=${this.finishSteps} type="button" variant="primary">Finish!</sl-button>
    `;
  }
}

customElements.define('step-c', StepC);