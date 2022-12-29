class HourNumber {
  constructor(className, hour) {
    this.hour = document.createElement('div');
    this.hour.className = className;
    this.hour.innerText = hour;
  }

  get HourNumber() {
    return this.hour;
  }
}

class Hand {
  constructor() {
    this.hand = document.createElement('div');
    this.hand.className = 'hand';

    // Makes the class abstract
    if (this.constructor === Hand) {
      throw new Error(
        'FYI: Instance of Abstract class cannot be instantiated'
      );
    }
  }

  calculateDegDeg(value) {
    return value;
  }
  get Hand() {
    return this.hand;
  }
}

class HoursHand extends Hand {
  constructor() {
    super();
    this.hand.classList += ' hour';
  }

  // polymorphism
  calculateDeg(hour, mins) {
    return hour * 30 + (mins / 60) * 6 - 90;
  }
}

class MinutesHand extends Hand {
  constructor() {
    super();
    this.hand.classList += ' minute';
  }

  // polymorphism

  calculateDeg(value) {
    return value * 6 - 90;
  }
}

class SecondsHand extends Hand {
  constructor() {
    super();
    this.hand.classList += ' second';
  }

  // polymorphism
  calculateDeg(value) {
    return value * 6 - 90;
  }
}

class Page {
  constructor() {
    let body = document.body;

    let clockDiv = document.createElement('div');
    clockDiv.className = 'clock';
    body.appendChild(clockDiv);

    clockDiv.appendChild(new HourNumber('twelve', 12).HourNumber);
    clockDiv.appendChild(new HourNumber('three', 3).HourNumber);
    clockDiv.appendChild(new HourNumber('six', 6).HourNumber);
    clockDiv.appendChild(new HourNumber('nine', 9).HourNumber);

    let hoursHand = new HoursHand();
    let minutesHand = new MinutesHand();
    let secondsHand = new SecondsHand();

    clockDiv.appendChild(hoursHand.Hand);
    clockDiv.appendChild(secondsHand.Hand);
    clockDiv.appendChild(minutesHand.Hand);

    let center = document.createElement('div');
    center.className = 'center';
    clockDiv.appendChild(center);

    let root = document.documentElement;
    setInterval(() => {
      let date = new Date();

      console.log(date.getSeconds());
      let hourDeg = hoursHand.calculateDeg(
        date.getHours(),
        date.getMinutes()
      );
      root.style.setProperty('--hDeg', `${hourDeg}deg`);

      let minDeg = minutesHand.calculateDeg(date.getMinutes());
      root.style.setProperty('--mDeg', `${minDeg}deg`);

      let secDeg = secondsHand.calculateDeg(date.getSeconds());
      root.style.setProperty('--sDeg', `${secDeg}deg`);
    }, 1000);
  }
}

let page = new Page();
