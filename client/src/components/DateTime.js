import React from 'react';

class DateTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <span>
        {this.state.date.toDateString()}, {this.state.date.toLocaleTimeString()}
      </span>
    );
  }
}

export default DateTime;
