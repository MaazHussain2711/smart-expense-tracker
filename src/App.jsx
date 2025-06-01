import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('expenses'));
    return saved || [];
  });

  const [filterDate, setFilterDate] = useState('');
  const [chartType, setChartType] = useState('bar');

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([expense, ...expenses]);
  };

  const deleteExpense = (id) => {
    const updated = expenses.filter((exp) => exp.id !== id);
    setExpenses(updated);
    if (updated.length === 0) {
      localStorage.removeItem('expenses');
    }
  };

  const clearAll = () => {
    setExpenses([]);
    localStorage.removeItem('expenses');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(expenses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'expenses.xlsx');
  };

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const filteredExpenses = filterDate
    ? expenses.filter((exp) => exp.date === filterDate)
    : expenses;

  return (
    <div className="container">
      <header className="app-header">
        <h1>Smart Expense Tracker</h1>
        <div>
          <button onClick={exportToExcel}>Download Excel</button>
          <button onClick={clearAll}>Clear All</button>
        </div>
      </header>

      <ExpenseForm onAddExpense={addExpense} />

      <label style={{ display: 'block', marginBottom: '0.5rem' }}>
        Filter by Date:
      </label>
      <input
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        style={{
          marginBottom: '1rem',
          padding: '0.5rem',
          backgroundColor: '#1e1e1e',
          color: '#ffffff',
          border: 'none',
          borderRadius: '0.3rem',
          cursor: 'pointer',
        }}
      />

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ width: '50%' }}>
          <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} />
        </div>
        <div style={{ width: '50%' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Select Chart Type:
          </label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            style={{
              marginBottom: '1rem',
              padding: '0.5rem',
              backgroundColor: '#1e1e1e',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0.3rem',
              cursor: 'pointer',
            }}
          >
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
          <ExpenseChart expenses={filteredExpenses} chartType={chartType} />
        </div>
      </div>

      <h3>Total: ₹ {totalAmount}</h3>
    </div>
  );
}

export default App;
