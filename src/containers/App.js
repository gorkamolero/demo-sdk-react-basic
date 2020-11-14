import React from 'react';
import './App.scss';
import '../assets/styles/Styling.scss';
import SlideContextProvider from '../context/SlideContext'
import Slide from '../slides/Slide'
import { ModalProvider } from "react-modal-hook";

const cfg = window.pickzen||{};

if (!cfg.server) cfg.server='https://app.pickzen.com';
if (!cfg.preview) cfg.preview=0;

const App = () => (
  <SlideContextProvider>
    <ModalProvider>
      <Slide />
    </ModalProvider>
  </SlideContextProvider>
);

export {cfg}
export default App;
