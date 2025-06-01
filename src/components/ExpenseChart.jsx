import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export default function ExpenseChart({ expenses, chartType }) {
  const data = {
    labels: expenses.map((exp) => exp.name),
    datasets: [
      {
        label: 'Amount',
        data: expenses.map((exp) => exp.amount),
        backgroundColor: [
        '#4db6ac', // teal
        '#42a5f5', // blue
        '#ffca28', // yellow
        '#66bb6a', // green
        '#ab47bc', // purple
        '#ef5350', // red
        '#ffa726', // orange
        '#26c6da', // cyan
        '#8d6e63', // brown
        '#78909c'  // gray
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  return (
    <div style={{ width: '100%' }}>
      {chartType === 'bar' ? (
        <Bar data={data} options={options} />
      ) : (
        <Pie data={data} options={options} />
      )}
    </div>
  );
}
