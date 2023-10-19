import React from 'react';
import './App.css';
import Table from './components/Table';
import NameFilter from './components/NameFilter';
import NumberFilter from './components/NumberFilter';

function App() {
  return (
    <>
      <header>
        <NameFilter />
        <NumberFilter />
      </header>
      <main>
        <Table />
      </main>
    </>
  );
}

export default App;
