import React, { Component } from 'react';

// keycode values
const ENTER = 13;
const UPARROW = 38;
const DOWNARROW = 40;

class Autocomplete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userSearchString: '',
      apiSuggestions: [],
      showSuggestions: false,
      activeSuggestion: 0
    }

    // set up autofocus of text input
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);


    // setup local functions for JSX calls
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSuggestionClick = this.onSuggestionClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

  }

  // Explicitly focus the text input using the raw DOM API
   // Note: we're accessing "current" to get the DOM node
  focusTextInput() {
    this.textInput.current.focus();
  }

  // callWordApi
  callSuggestionsApi = async (searchString) => {

      const apiString = '/api/words/lookup/string/' + searchString;
      const response = await fetch(apiString);
      const body = await response.json();

      if (response.status !== 200) {
        console.log('Error', response);
      }
      return body;
  }

  // User has typed something -> call suggestions API
  handleInputChange(event) {
    // console.log('Search prompt is: ' + event.target.value);
    const newSearchInput = event.target.value;
    if (newSearchInput !== '') {
      this.callSuggestionsApi(newSearchInput).then(res => {
        // console.log('handleInputChange: ', res.payload);
        this.setState({
            apiSuggestions: res.payload,
            userSearchString: newSearchInput,
            showSuggestions: true,
            activeSuggestion: 0
        });
      })
      .catch(err => console.log('Error', err));  
    } else {
        this.setState({
            apiSuggestions: [],
            userSearchString: ''
        });
    }
  }

  // user has clicked on a suggestion
  onSuggestionClick(event) {
    console.log('Clicked suggestion: ' + event.currentTarget.innerText)
    this.setState({
      userSearchString:  event.currentTarget.innerText,
      showSuggestions: false,
      apiSuggestions: [],
      activeSuggestion: null
    });
    this.focusTextInput();
  }

  // user has clicked on a suggestion
  onKeyDown(event) {

    switch (event.keyCode) {

      case DOWNARROW:
        console.log('onKeyDown: DOWNARROW: ' + event.keyCode +
                    '(' + String.fromCharCode(event.keyCode) + ')');
        if (this.state.activeSuggestion + 1 === this.state.apiSuggestions.length) {
          return;
        }
        this.setState({
          activeSuggestion: this.state.activeSuggestion + 1
        });
        break;

      case UPARROW:
        console.log('onKeyDown: UPARROW: ' + event.keyCode +
                    '(' + String.fromCharCode(event.keyCode) + ')');
        if (this.state.activeSuggestion === 0) {
          return;
        }
        this.setState({
          activeSuggestion: this.state.activeSuggestion - 1
        });
        break;

      case ENTER:
        console.log('onKeyDown: ENTER: ' + event.keyCode +
                    '(' + String.fromCharCode(event.keyCode) + ')');
        this.setState({
          activeSuggestion: null,
          showSuggestions: false,
          userSearchString: this.state.apiSuggestions[this.state.activeSuggestion].word
        });
        break;

      default:
        console.log('onKeyDown: nothing to do with: ' + event.keyCode +
                    '(' + String.fromCharCode(event.keyCode) + ')');
        break;
    }  

  }

  render() {

    // generate suggestions
    let inputResults = [];
    if (this.state.showSuggestions) {
      if (this.state.apiSuggestions && this.state.apiSuggestions !== []) {

        inputResults = this.state.apiSuggestions.map((word, index) => {
          let liClassName;
          if (index === this.state.activeSuggestion) {
            liClassName = "suggestion-active";
          } else {
            liClassName = "suggestion-notactive";
          }
          return(
            <li 
              value={ word.word }
              key={ word.word }
              className={ liClassName }
              onClick={ this.onSuggestionClick }>
                { word.word }
            </li>
          );
        });
      }
    }

    // const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    // const options = alphabet.split('').map(letter => {
    //   return(
    //     <option key={ letter } value={ letter }>{ letter } </option>
    //   );
    // })

    return (
      <div className="Autocomplete">
        <div className="searchPrompt">
          <label
            htmlFor="searchString">
            Do a lookup:
          </label>
          <input
            id="searchString"
            type="text"
            value={ this.state.userSearchString }
            onChange={ this.handleInputChange }
            onKeyDown={ this.onKeyDown }
            ref={ this.textInput }
          />
        </div>
        <div>
            <ul className="autocomplete-matches">
              { inputResults }
            </ul>
        </div>
      </div>
    );
  }
}

export default Autocomplete;
