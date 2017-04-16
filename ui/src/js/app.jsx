/**
 * UI - built using React and material-ui
 */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Subheader from 'material-ui/Subheader';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {grey400, darkBlack} from 'material-ui/styles/colors';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import AppBar from 'material-ui/AppBar';
// needed for touch / tap / clickevents for material-ui
// see http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const URL = '/api/messages';
let SelectableList = makeSelectable(List);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      selectedItemId: '',
      open: false,
      dialogText: 'no text'
    };
  }


  /**
   * componentDidMount - (React life cycle) invoked immediately after a component is mounted
   */
  componentDidMount() {
    axios.get(URL)
    .then(res => {
      this.setState({messages: res.data});
    })
    .catch(function (err) {
      console.log(err);
    });
  }


  /**
   * handleRequestChange - handler when the selection on the list changes
   *
   * @param  {object} event
   * @param  {number} id - the id of the message
   */
  handleRequestChange(event, id) {
      this.setState({selectedItemId: id});
  }

  /**
   * handleDialogOpen - handler when the dialog opens
   */
  handleDialogOpen() {
      this.setState({open: true});
  }

  /**
   * handleDialogClose - handler when the dialog closes
   */
  handleDialogClose() {
      this.setState({open: false});
  }

  /**
   * showLoader - displays the loading image
   */
  showLoader() {
    document.getElementById('progress').style.display = 'inline-block';
  }

  /**
   * hideLoader - hides the loading image
   */
  hideLoader() {
    document.getElementById('progress').style.display = 'none';
  }

  /**
   * showError - logs error and shows dialog with error text
   *
   * @param  {object} event
   * @param  {number} id - the id of the message
   */
  showError(err, text) {
    console.log(err);
    this.hideLoader();
    this.setState({open: true, dialogText: err.message || 'Something went wrong, please try again later.'});
  }

  /**
   * onSend - handler to post a new message
   * *
   * @param  {object} event
   * @param  {string} text - the text to post
   */
  onSend(ev, text) {
    let textField = document.getElementById('textf');
    if (textField.value.trim() == '') {
      this.setState({open: true, dialogText: 'Cannot post an empty message.'});
      return;
    }

    this.showLoader();

    axios.post(URL, {
      text: textField.value
    })
    .then(res => {
      this.hideLoader();
      textField.value = '';
      this.setState({messages: this.state.messages.concat([res.data])});
    })
    .catch(function(err) {
      this.showError(err, 'Something went wrong, please try again later.');
    }.bind(this));
  }

  /**
   * onRefresh - handler to request a refresh of messages from the backend
   */
  onRefresh() {
    this.showLoader();

    axios.get(URL)
    .then(res => {
      this.hideLoader();
      this.setState({messages: res.data});
    })
    .catch(function (err) {
      this.showError(err, 'Something went wrong, please try again later.');
    }.bind(this));
  }


  /**
   * onPalindrome - handler to check if messge is a palindrome
   */
  onPalindrome() {
    if (this.state.selectedItemId == '') {
      this.setState({open: true, dialogText: 'Select an item first.'});
      return;
    }

    this.showLoader();

    axios.get(URL + '/' + this.state.selectedItemId + '/palindrome')
    .then(res => {
      this.hideLoader();

      let text;
      if (res.data.palindrome || res.data.palindrome == 'true') {
        text = 'You have yourself a palindrome.'
      } else {
        text = 'Bad news... it\'s not a palindrome.'
      }

      this.onRefresh();
      this.setState({open: true, dialogText: text});
    })
    .catch(function (err) {
      this.showError(err, 'Something went wrong, please try again later.');
    }.bind(this));
  }

  render() {
    const actions = [
      <RaisedButton
        label="Close"
        primary={true}
        onTouchTap={this.handleDialogClose.bind(this)}
      />,
    ];
    const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
    const palindromeIcon = <FontIcon className="material-icons">spellcheck</FontIcon>;

    return (
      <MuiThemeProvider>
        <div id='container'>
          <AppBar title="messapp" showMenuIconButton={false} />
          <SelectableList value={this.state.selectedItemId} onChange={this.handleRequestChange.bind(this)}>
            <Subheader>Recent Messages</Subheader>
            {this.state.messages.map(message =>
              <ListItem
                id={message._id}
                value={message._id}
                primaryText={message.text}
                secondaryText={<p style='font-size:12px'><span style={{color: grey400}}>{message.date}</span></p>}
                secondaryTextLines={2}
                style={{padding: '16px 16px 0px 16px'}}
                nestedItems={[
                  <ListItem
                    disabled={true}
                    primaryText={
                      message.isPalindrome.toString() == '' ? "Not yet determined if this is a palindrome, select the item and press the \'Palindrome\" button" :
                      message.isPalindrome == true ? "Yep, this is a palindrome" : "Nope, this is not a palindrome"
                    }
                    secondaryText={<div style={{color: 'white', fontSize: '12px'}}>This message has {message.length} characters</div>}
                    style={{fontSize: '12px', padding: '0px 16px 0px 16px', background: 'black', color: 'white'}}
                  />
                ]}
              />
            )}
            </SelectableList>
            <TextField id="textf" floatingLabelText="post a new message" fullWidth={true} />
            <RaisedButton label="SEND" primary={true} fullWidth={true} onTouchTap={this.onSend.bind(this)} />
            <Paper zDepth={1}>
              <BottomNavigation>
                <BottomNavigationItem label="Refresh" icon={recentsIcon} onTouchTap={this.onRefresh.bind(this)} />
                <BottomNavigationItem label="Palindrome" icon={palindromeIcon} onTouchTap={this.onPalindrome.bind(this)} />
              </BottomNavigation>
            </Paper>
            <Dialog
              title={this.state.dialogText}
              actions={actions}
              open={this.state.open}
              onRequestClose={this.handleDialogClose.bind(this)}
            >
            </Dialog>
            <CircularProgress
              id='progress'
              style={{
                position: 'absolute',
                height: '100px',
                width: '100px',
                top: '50%',
                left: '50%',
                marginLeft: '-50px',
                marginRight: '-50px',
                display: 'none'
              }}
              size={80}
              thickness={5}
            />
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
