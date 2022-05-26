import { useStore } from '../hooks/useStore';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { users as usersData } from '../mocks/users';
import {
  Grid,
  GridColumn,
  GridSortChangeEvent,
  GridFilterChangeEvent,
} from '@Progress/kendo-react-grid';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { User, GridCell } from '../@types/global.types';
import {
  filterBy,
  CompositeFilterDescriptor,
} from '@progress/kendo-data-query';
import { Button } from '@progress/kendo-react-buttons';
import DataGridCellWithStyles from '../components/UsersList/dataGridCellWithStyle';
import NewUserModal from '../components/newUser/NewUserModal';
import LinkDataGridCell from '../components/newUser/LinkDataGridCell';
const initialFilter: CompositeFilterDescriptor = {
  logic: 'and',
  filters: [{ field: 'userName', operator: 'contains', value: '' }],
};
const UsersList = () => {
  const [filter, setFilter] = useState(initialFilter);
  const { users, setUsers } = useStore();
  const [sort, setSort] = useState<Array<SortDescriptor>>([
    { field: 'id', dir: 'desc' },
    { field: 'fullName', dir: 'desc' },
    { field: 'userName', dir: 'desc' },
    { field: 'lastLogin', dir: 'desc' },
    { field: 'enabled', dir: 'desc' },
  ]);
  const [isAddNewUserModalvisible, setIsNewUserModalVisible] = useState(false);
  const sortChange = (event: GridSortChangeEvent) => {
    setUsers(getProducts(event.sort));
    setSort(event.sort);
  };
  const getProducts = (sort: SortDescriptor[]): User[] => {
    return orderBy(users, sort);
  };
  const toggleModal = () => {
    setIsNewUserModalVisible(!isAddNewUserModalvisible);
  };
  useEffect(() => {
    if (!users.length) {
      setTimeout(() => {
        setUsers(usersData);
      }, 1000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Grid
        style={{
          height: '400px',
        }}
        data={filterBy(users, filter)}
        filterable={true}
        filter={filter}
        onFilterChange={(e: GridFilterChangeEvent) => setFilter(e.filter)}
        sortable={{
          allowUnsort: false,
          mode: 'single',
        }}
        sort={sort}
        onSortChange={sortChange}>
        <GridColumn
          filterable={false}
          field="id"
          title="ID"
          cell={(props: GridCell) => LinkDataGridCell(props.dataItem.id)}
        />
        <GridColumn
          filterable={true}
          field="userName"
          title="UserName"
          cell={(props: GridCell) =>
            LinkDataGridCell(props.dataItem.id, props.dataItem.userName)
          }
        />
        <GridColumn
          filterable={false}
          field="fullName"
          title="FullName"
          cell={(props: GridCell) =>
            LinkDataGridCell(props.dataItem.id, props.dataItem.fullName)
          }
        />
        <GridColumn
          filterable={false}
          field="lastLogin"
          title="LastLogin"
          filter={'date'}
          format="{0: yyyy-MM-dd HH:mm:ss}"
        />
        <GridColumn
          cell={DataGridCellWithStyles}
          filterable={false}
          field="enabled"
          title="Enabled"
        />
      </Grid>
      <Button
        onClick={toggleModal}
        style={{ marginTop: '10px' }}
        themeColor={'primary'}
        disabled={false}>
        Add New
      </Button>
      <NewUserModal
        visible={isAddNewUserModalvisible}
        toggleModal={toggleModal}
      />
    </div>
  );
};

export default observer(UsersList);
