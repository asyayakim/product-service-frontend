type TableProps = {
    columns: string[];
    data: { [key: string]: any }[];
    tableName?: string;
};

export default function Table({ columns, data, tableName}: TableProps) {
    return (
        <div>
         <h2 className="mb-2 text-xl font-semibold">{tableName}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} className="px-4 py-2 text-left">{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-2">{row.displayName === "Unknown" ? "Nutrient" : row.displayName}</td>
                      <td className="px-4 py-2">{row.amount} {row.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
    );
}