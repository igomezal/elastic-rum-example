import { Routes } from '@lit-labs/router';
import { LitElement, html } from 'lit';
import apm from './apm-instance.js';

import './step-a.js';
import './step-b.js';
import './step-c.js';

class WelcomPage extends LitElement {
  constructor() {
    super();

    this.transaction = apm.startTransaction('welcome-page', 'microfe');
    this.transaction.addLabels({
      valuable: ['even', 'odd'][Math.round(Math.random())]
    });
    this.currentSpan = this.transaction.startSpan('initial');

    this.transaction.mark('constructor');

    this.currentStep = '';

    this.routes = new Routes(this, [
      { path: '', render: () => html`` },
      { path: 'step-a', render: () => html`<step-a></step-a>` },
      { path: 'step-b', render: () => html`<step-b></step-b>` },
      { path: 'step-c', render: () => html`<step-c></step-c>` },
    ]);
  }

  connectedCallback() {
    super.connectedCallback();

    this.transaction.mark('connected');

    this.addEventListener('next-step', this.gotoNextStep);
    this.addEventListener('mark-transaction', this.markTransaction);
    this.addEventListener('capture-error', this.captureError);
    this.addEventListener('finish', this.finish);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.transaction.end();

    this.transaction.mark('disconnected');

    this.removeEventListener('next-step', this.gotoNextStep);
    this.removeEventListener('mark-transaction', this.markTransaction);
    this.removeEventListener('capture-error', this.captureError);
    this.removeEventListener('finish', this.finish);
  }

  markTransaction() {
    this.transaction.mark('marked');
  }

  captureError() {
    apm.captureError(new Error('Captured error from user'), {
      labels: {
        'request-id': '19083057-4270-472f-889c-575e4050f48f',
      },
    });
  }

  gotoNextStep() {
    this.transaction.mark('next-step');

    if (!this.currentStep) {
      this.currentSpan.end();
      this.currentSpan = this.transaction.startSpan('step-b');

      this.currentStep = 'step-b';
      this.routes.goto('step-b')
    } else if (this.currentStep === 'step-b') {
      this.currentSpan.end();
      this.currentSpan = this.transaction.startSpan('step-c');

      this.currentStep = 'step-c';
      this.routes.goto('step-c');
    }
  }

  finish() {
    this.transaction.mark('finish');

    this.currentSpan.end();
    this.transaction.end();

    setTimeout(() => window.location.reload(), 1000);
  }

  userSubmitted(event) {
    event.preventDefault();

    const username = this.shadowRoot.querySelector('#username').value;

    if (username) {
      apm.setUserContext({
        username,
      });

      this.routes.goto('step-a');
      this.shadowRoot.querySelector('#enter').disabled = true;

      this.currentSpan.end();
      this.currentSpan = this.transaction.startSpan('step-a');
    }
  }

  render() {
    return html`
      <h1>Welcome to APM RUM example application!</h1>
      <form class="input-validation-pattern" @submit=${this.userSubmitted}>
        <sl-input id="username" label="What is your user name?" required></sl-input>
        <br />
        <sl-button type="submit" id="enter" variant="primary">Enter</sl-button>
        <sl-button type="reset" variant="default">Reset</sl-button>
      </form>

      <br />

      ${this.routes.outlet()}
    `;
  }
}

customElements.define('welcome-page', WelcomPage);