import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Subheader from 'material-ui/Subheader';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
// needed for touch / tap / clickevents for material-ui
// see http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const URL = '/api/messages';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const palindromeIcon = <FontIcon className="material-icons">spellcheck</FontIcon>;

let SelectableList = makeSelectable(List);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      selectedIndex: 0
    };
  }

  componentDidMount() {
    axios.get(URL)
    .then(res => {
      this.setState({messages: res.data});
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  handleRequestChange (event, index) {
      this.setState({
          selectedIndex: index
      })
  }

  onSend() {
    let textField = document.getElementById('textf');
    axios.post(URL, {
      text: textField.value
    })
    .then(res => {
      this.setState({messages: this.state.messages.concat([res.data])});
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  onRefresh() {
    axios.get(URL)
    .then(res => {
      this.setState({messages: res.data});
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  render() {
    return (
      <MuiThemeProvider>
          <div id='container'>
            <AppBar
              title="messapp"
              showMenuIconButton={false}
            />
            <SelectableList value={this.state.selectedIndex} onChange={this.handleRequestChange.bind(this)}>
              <Subheader>Recent Messages</Subheader>
              {this.state.messages.map(message =>
                <ListItem
                  id={message._id}
                  value={message.text}
                  primaryText={message.text}
                  secondaryText={
                    <p style='font-size:12px'>
                      <span style={{color: grey400}}>{message.date}</span>
                    </p>
                  }
                  secondaryTextLines={2}
                  style={{
                    padding: '16px 16px 0px 16px'
                  }}
                  nestedItems={[
                    <ListItem
                      disabled={true}
                      primaryText={
                        message.isPalindrome == "" ? "Not yet determined if this is a palindrome, select this item and press the \'Palindrome\" button" :
                        message.isPalindrome == true ? "Yep, this is a palindrome" : "Nope, this is not a palindrome"
                      }
                      secondaryText={
                        <div style={{color: 'white', fontSize: '12px'}}>{message.date}</div>
                      }
                      style={{
                        fontSize: '12px',
                        padding: '0px 16px 0px 16px',
                        background: 'black',
                        color: 'white'
                      }}
                    />
                  ]}
                />
              )}
            </SelectableList>
            <TextField
              id="textf"
              floatingLabelText="post a new message"
              fullWidth={true}
            />
            <RaisedButton
              label="SEND"
              primary={true}
              fullWidth={true}
              onTouchTap={this.onSend.bind(this)}
            />
            <Paper zDepth={1}>
              <BottomNavigation selectedIndex={this.state.selectedIndex}>
                <BottomNavigationItem
                  label="Refresh"
                  icon={recentsIcon}
                  onTouchTap={this.onRefresh.bind(this)}
                />
                <BottomNavigationItem
                  label="Palindrome"
                  icon={palindromeIcon}
                  onTouchTap={this.onRefresh.bind(this)}
                />
              </BottomNavigation>
            </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
