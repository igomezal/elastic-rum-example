import { LitElement, html } from 'lit';

class StepB extends LitElement {
  gotoNextStep() {
    this.dispatchEvent(new CustomEvent('next-step', {
      composed: true,
      bubbles: true,
    }));
  }

  markTransaction() {
    this.dispatchEvent(new CustomEvent('mark-transaction', {
      composed: true,
      bubbles: true,
    }));
  }

  captureError() {
    this.dispatchEvent(new CustomEvent('capture-error', {
      composed: true,
      bubbles: true,
    }));
  }

  render() {
    return html`
      <p>This is step B</p>
      <sl-button @click=${this.markTransaction} type="button">Mark transaction</sl-button>
      <sl-button @click=${this.captureError} type="button">Capture error</sl-button>
      <sl-button @click=${this.gotoNextStep} type="button" variant="primary">Go to next step</sl-button>
    `;
  }
}

customElements.define('step-b', StepB);