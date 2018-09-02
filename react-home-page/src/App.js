import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const API = '/api/';

// Search Input
class SearchInput extends Component {

  constructor () {
    super();
    this.state = {
      query: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange (evt) {
    // check it out: we get the evt.target.name (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    
    fetch(API + 'search?query='+this.state.query)
    .then(response=>response.json())
    .then(data=>{
      if(data.result !== false) {
        console.log(data.result);
        this.props.parentMethod(data.result);
      }
    })
    
    //console.log(this.state.query);
    //this.props.parentMethod(this.state.query);
  }

  
  render () {
    return (
      <div className="loginmodal-container">
      <form onSubmit={this.handleSubmit}>
      <div className="input-div">
      <label className="form-label">Input :</label>
      <input type="text" name="query" onChange={this.handleChange}/>
      </div>

      <div className="submit-button-div">
      <input type="submit" value="Submit" />
      </div>

      </form>
      </div>
      );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
    };
    this.ShowResult = this.ShowResult.bind(this);

  }
  ShowResult(data) {
    var tempState = this.state;
    tempState.data = data;
    console.log(tempState);
    this.setState(tempState);

  }
  renderSearchInput() {
    return <SearchInput parentMethod={this.ShowResult}/>;
  }
  render() {
    return (
      <div className="App">
      {this.renderSearchInput()}
      </div>
      );
  }
}

export default App;
