import { Router } from '@lit-labs/router';
import { LitElement, html } from 'lit';

import './welcome-page.js';

export default class MyApp extends LitElement {
  constructor() {
    super();
    this.router = new Router(this, [
      { path: '/', render: () => html`<welcome-page></welcome-page>` },
      { path: '/*', render: () => html`<welcome-page></welcome-page>` },
    ]);
  }

  render() {
    return this.router.outlet();
  }
}

customElements.define('my-app', MyApp);
