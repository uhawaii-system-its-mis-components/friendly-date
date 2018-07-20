'use strict';

import {LitElement, html} from '@polymer/lit-element';
import moment from 'moment'

class FriendlyDate extends LitElement {

  // Public property API that triggers re-render (synced with attributes)
  static get properties() {
    return {
      date: Date,
      hideYear: Boolean,
      showTime: Boolean
    }
  }

  constructor() {
    super();
    this.date = new Date();
    this.showTime = false;
  }

  _shouldRender(props, changedProps, old) {
    return true;
  }

  _render() {
    return html`
      ${this.formattedDate}
    `;
  }

  get dateInCurrentYear() {
    let momentDate = moment(this.date);
    return momentDate.isSame(moment().startOf('day'), 'year');
  }

  get yearHidden() {
    return this.hideYear || this.dateInCurrentYear;
  }

  get formattedDate() {
    let dateMoment = moment(this.date);

    let format = {
      lastDay : '[Yesterday]',
      sameDay : '[Today]',
      nextDay : '[Tomorrow]',
      lastWeek : 'MMM D[,] YYYY',
      nextWeek : 'dddd',
      sameElse : 'MMM D[,] YYYY'
    };

    if(this.showTime) {
      format = {
        lastDay : '[Yesterday, ] LT',
        sameDay : '[Today, ] LT',
        nextDay : '[Tomorrow, ] LT',
        lastWeek : 'MMM D[,] YYYY, LT',
        nextWeek : 'dddd, LT',
        //Too far in the past, still don't show time
        sameElse : 'MMM D[,] YYYY'
      };
    }

    if(this.yearHidden) {
      format.lastWeek = 'MMM D';
      format.sameElse = 'MMM D';
      if(this.showTime) {
        format.lastWeek += "[, ] LT";
      }
    }

    if(this.showTime) {
      return moment(this.date).calendar(moment(), format);
    }
    else {
      return moment(this.date).startOf('day').calendar(moment().startOf('day'), format);
    }
  }

}
customElements.define('friendly-date', FriendlyDate);
