'use strict';

import {LitElement, html} from '@polymer/lit-element';
import './friendly-date.js';

class FriendlyDateRange extends LitElement {

  static get properties() {
    return {
      firstDate: Date,
      secondDate: Date
    }
  }

  constructor() {
    super();
    this.firstDate = new Date();
    this.secondDate = new Date();
  }

  _render() {
    return html`
      <friendly-date id="firstFriendlyDate"
        date=${this.firstDate}>
      </friendly-date>
      -
      <friendly-date id="secondFriendlyDate"
        date=${this.secondDate}>
      </friendly-date>

    `;
  }

  //Check to see whether we need to adjust whether the year shows or not
  _didRender(props, changedProps, prevProps) {
    let firstFriendlyDateElement = this.shadowRoot.querySelector("#firstFriendlyDate");
    let secondFriendlyDateElement = this.shadowRoot.querySelector("#secondFriendlyDate");

    if(firstFriendlyDateElement.dateInCurrentYear && !secondFriendlyDateElement.dateInCurrentYear) {
      firstFriendlyDateElement.hideYear = false;
    }
    else if(!firstFriendlyDateElement.dateInCurrentYear && secondFriendlyDateElement.dateInCurrentYear) {
      secondFriendlyDateElement.hideYear = false;
    }
  }

}
customElements.define('friendly-date-range', FriendlyDateRange);
