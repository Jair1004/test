import React, { Component } from 'react';
import ReactJson from 'react-json-view';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      error: false,
      message: "",
      posts: []
    };
  }
  async componentDidMount() {
    try {
      this.setState({message: "Please wait until fetch posts data..."})
      let result = await fetch('https://thewirecutter.com/wp-json/wp/v2/posts');


      let jsonData = await result.json();
      this.setState({posts: jsonData, loading: false, message: ""});
    } catch (e) {
      this.setState({message: "Data fetch failed", error: true})
      console.log(e)
    }
  }

  render() {
    const { message, posts } = this.state
    let maybeMessageOrPostview = null

    if (message) {
      maybeMessageOrPostview = <p className="App-intro"> {message} </p>
    } else {
      maybeMessageOrPostview = <ReactJson src={posts} />
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to TestApp</h1>
        </header>
        {maybeMessageOrPostview}
      </div>
    );
  }
}


export default App;
