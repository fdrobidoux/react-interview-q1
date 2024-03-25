import "./TableData.css";

export default function TableData({ data }) {

  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 && data.map((x, i) => (
          <tr key={i}>
            <td>{x.name}</td>
            <td>{x.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}