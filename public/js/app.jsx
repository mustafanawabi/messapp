import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
// needed for touch / tap / clickevents for material-ui
// see http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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

  onSend() {
      alert("send button");
  }

  onRefresh() {
      alert("refresh pressed");
  }

  render() {
    return (
      <MuiThemeProvider>
          <div>
          <AppBar
              title="messapp"
              iconElementRight={<FlatButton label="REFRESH" onTouchTap={this.onRefresh.bind(this)} />}
            />
            {this.state.messages.map(message =>
              <Card>
                <CardHeader
                  title={message.text}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardText expandable={true}>
                  posted on <strong>{message.date}</strong><br/>
                  number of characters is <ins>{message.length}</ins><br/>
                  it <em>is {message.isPalindrome ? "" : "not"}</em> a palindrome
                </CardText>
              </Card>
            )}
            <TextField floatingLabelText="post a message" />
            <FlatButton
              label="SEND"
              primary={true}
              onTouchTap={this.onSend.bind(this)}
            />
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
