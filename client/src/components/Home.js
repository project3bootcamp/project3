import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Home extends Component {
    handleClick = () => {
        console.log('this is:', this);
      }
    
      render() {
        return (
          <button onClick={this.handleClick}>
            <Link to='/ActorSearch'>ActorSearch</Link>
          </button>
        );
      }
    }