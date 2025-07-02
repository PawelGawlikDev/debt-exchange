import { columns } from "../constants/columns";
import "../style/placeholder.less";

const DesktopTablePlaceholder = ({
  columnsCount = columns.length,
}: {
  columnsCount?: number;
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {Array.from({ length: columnsCount }).map((_, i) => (
            <th key={i}>
              <div className="skeleton" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: columnsCount }).map((_, colIndex) => (
              <td key={colIndex}>
                <div className="skeleton" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DesktopTablePlaceholder;
