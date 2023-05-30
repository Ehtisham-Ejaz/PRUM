import React from "react";
import { useTable } from "react-table";

const UbaTable = ({ userData }) => {
  //console.log("Data in component: ", userData);
  //console.log("Datatype is: ", typeof userData);

  const columns = React.useMemo(
    () => [
      { Header: "Timestamp", accessor: "timestamp" },
      { Header: "Source", accessor: "source" },
      { Header: "Event ID", accessor: "eventId" },
      { Header: "Level", accessor: "level" },
      { Header: "Task Category", accessor: "taskCategory" },
      { Header: "Message", accessor: "message" },
    ],
    []
  );

  const logData = [
    {
      timestamp: "2023-05-21 10:30:00",
      source: "Source A",
      eventId: "123",
      level: "Info",
      taskCategory: "Category A",
    },
    {
      timestamp: "2023-05-21 10:30:00",
      source: "Source A",
      eventId: "123",
      level: "Info",
      taskCategory: "Category A",
    },
    {
      timestamp: "2023-05-21 10:30:00",
      source: "Source A",
      eventId: "123",
      level: "Info",
      taskCategory: "Category A",
    },
    {
      timestamp: "2023-05-21 10:30:00",
      source: "Source A",
      eventId: "123",
      level: "Info",
      taskCategory: "Category A",
    },
    // Add more data objects as needed
  ];

  // Convert the userData object to an array using Object.values()
  // const logData = Object.values(userData);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: userData,
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

export default UbaTable;
