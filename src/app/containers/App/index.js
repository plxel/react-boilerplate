import React from 'react';
import styles from './App.css';
import { Child } from './components/Child.js';
const App = () => (
  <div className={styles.app}>
    <h2>Hello world</h2>
    <Child />
  </div>
);

export default App;