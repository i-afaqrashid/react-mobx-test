import React from 'react';
import { GridCell } from '../../@types/global.types';
const DataGridCellWithStyles = (props: GridCell) => {
  if (props.dataItem.enabled) {
    return <td>Yes</td>;
  }

  return <td style={{ color: 'red' }}>No</td>;
};
export default DataGridCellWithStyles;
