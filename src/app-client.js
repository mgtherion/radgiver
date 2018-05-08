import React from 'react';
import { render } from 'react-dom';
import SuggestPage from './components/SuggestPage';

const AppClient = () => (
  <SuggestPage />
);

window.onload = () => {
  render(<AppClient />, document.getElementById('main'));
};
