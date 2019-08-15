import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { AppRouter } from './Router';

export class App extends Component {
  render() {
    return (
        <AppRouter />
    );
  }
}
