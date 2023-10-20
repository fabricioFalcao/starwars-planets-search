import React from 'react';
import './App.css';
import Table from './components/Table';
import NameFilter from './components/NameFilter';
import NumberFilter from './components/NumberFilter';
import SortColumns from './components/SortColumns';

function App() {
  return (
    <>
      <header>
        <NameFilter />
        <NumberFilter />
        <SortColumns />
      </header>
      <main>
        <Table />
      </main>
    </>
  );
}

export default App;
