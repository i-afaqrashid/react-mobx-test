import React from 'react';
import { Link } from 'react-router-dom';
const LinkDataGridCell = (id: number, attribute?: string) => {
  return (
    <td>
      <Link to={`/user/${id}`}>{attribute || id}</Link>
    </td>
  );
};
export default LinkDataGridCell;
