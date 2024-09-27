import React from "react";
import BookLibrary from "../../assets/book-library.xml";

export function BookLibraryXML() {
  const headers = Object.keys(BookLibrary.library.book[0]);
  const dataRows = BookLibrary.library.book.map((book) => {
    return Object.values(book);
  });

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
