// import './wdyr'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { setBreakpoints } from './visly';


setBreakpoints('min-width', ['768px', '1024px', '1280px'])

ReactDOM.render(<App />, document.getElementById(window.pickzen.holder || 'pickzen'));

