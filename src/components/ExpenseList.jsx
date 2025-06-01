export default function ExpenseList({ expenses, onDelete }) {
  return (
    <ul>
      {expenses.map((exp) => (
        <li key={exp.id}>
          <div>
            <strong>{exp.name}</strong> — ₹ {exp.amount} <br />
            <small>{exp.date}</small>
          </div>
          <button onClick={() => onDelete(exp.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
