import React from "react";
import { useTable } from "react-table";

const RealtimeTable = ({ userData }) => {
  //console.log("Data in component: ", userData);
  //console.log("Datatype is: ", typeof userData);

  const columns = React.useMemo(
    () => [
      { Header: "Timestamp", accessor: "timestamp" },
      { Header: "Message", accessor: "message" },
    ],
    []
  );

  const logData = [
    {
      timestamp: "",
      message: "",
    },

    // Add more data objects as needed
  ];

  // Convert the userData object to an array using Object.values()
  // const logData = Object.values(userData);
  console.log('in uba table',userData)

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: userData || logData,
    });

  return (
    <div style={{ width: "100%", maxWidth: "100%", margin: 10, padding: 15 }}>
      <table
        {...getTableProps()}
        style={{
          borderCollapse: "collapse",
          fontFamily: "Arial, sans-serif",
          width: "98%",
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    padding: "5px",
                    borderBottom: "1px solid #ddd",
                    background: "#B9D9EB",
                    color: "#333",
                    textAlign: "left",
                    fontWeight: "bold",
                  
                    width: column.width || "auto",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "4px",
                      borderBottom: "1px solid #ddd",
                      color: "#999",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RealtimeTable;
