import React from "react";
import BookLibrary from "../../assets/book-library.csv";

export function BookLibraryCsv() {
  // Extract headers from the first row
  const headers = BookLibrary[0];

  // Remove headers from the rows
  const dataRows = BookLibrary.slice(1);

  return (
    <div className="book-library">
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
