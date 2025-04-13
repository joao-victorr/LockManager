type TableCell = {
  content: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  className?: string;
};

type TableProps = {
  headers: TableCell[];
  rows: TableCell[][];
  className?: string;
};

export const Table = ({ headers, rows, className = "" }: TableProps) => {
  return (
    <table className={`w-full table-auto border-collapse border border-gray-300 ${className}`}>
      
      {/* Define o thead com base no array enviado em headers */}
      <thead className="bg-amber-600 text-white">
        <tr>
          {headers.map((cell, idx) => (
            <th
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={idx}
              colSpan={cell.colSpan}
              rowSpan={cell.rowSpan}
              className={`p-2 border border-gray-300 text-center font-semibold ${cell.className ?? ""}`}
            >
              {cell.content}
            </th>
          ))}
        </tr>
      </thead>

      {/* Define o tbody com base no array enviado em rowas */}
      <tbody>
        {rows.length > 0 ? (
          rows.map((row, rowIndex) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<tr key={rowIndex} className="hover:bg-gray-100">
              {row.map((cell, cellIndex) => (
                <td
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={cellIndex}
                  colSpan={cell.colSpan}
                  rowSpan={cell.rowSpan}
                  className={`p-2 border border-gray-300 text-center ${cell.className ?? ""}`}
                >
                  {cell.content}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={headers.length} className="text-center text-white-200 p-4">
              Nenhum dado encontrado.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
