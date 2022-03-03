import ReactDOM from 'react-dom';
import { App } from 'app/layout/App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ColorModeScript } from '@chakra-ui/react';

ReactDOM.render(
  <>
    <ColorModeScript initialColorMode={'dark'} />
    <App />
  </>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
