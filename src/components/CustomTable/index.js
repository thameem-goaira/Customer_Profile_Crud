import React, { useEffect, useState } from "react";
import { Table, Dropdown, ButtonGroup, Form } from "react-bootstrap";
import "./CustomTable.css";
import { useDispatch } from "react-redux";

export const CustomTable = ({ column, data }) => {

  return (
    <div className="custom-table-container">
      <Table bordered hover className="custom-table">
        <thead>
          <tr>
            {column.map((val, key) => (
              <th key={key}>{val.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((val, key) => (
              <tr key={key}>
                {column.map((value, keys) => (
                  <React.Fragment key={keys}>
                    {value.value && <td>{value.value(val)}</td>}
                    {value.render && <td>{value.render(val)}</td>}
                  </React.Fragment>
                ))}
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomTable;
