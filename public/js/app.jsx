import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    axios.get('/api/messages')
    .then(res => {
      this.setState({
        messages: res.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <h1>messapp</h1>
        <ul>
          {this.state.messages.map(message =>
            <li key={message._id}>{message.text}</li>
          )}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
