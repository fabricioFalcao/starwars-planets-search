import React from 'react';
import './App.css';
import Table from './components/Table';
import NameFilter from './components/NameFilter';

function App() {
  return (
    <>
      <header>
        <NameFilter />
      </header>
      <main>
        <Table />
      </main>
    </>
  );
}

export default App;
