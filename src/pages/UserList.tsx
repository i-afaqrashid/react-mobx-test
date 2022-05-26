import { useStore } from '../hooks/useStore';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { users as usersData } from '../mocks/users';
import {
  Grid,
  GridColumn,
  GridSortChangeEvent,
  GridFilterChangeEvent,
} from '@Progress/kendo-react-grid';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { User } from '../@types/global.types';
import {
  filterBy,
  CompositeFilterDescriptor,
} from '@progress/kendo-data-query';
import DataGridCellWithStyles from '../components/UsersList/dataGridCellWithStyle';
const initialFilter: CompositeFilterDescriptor = {
  logic: 'and',
  filters: [{ field: 'userName', operator: 'contains', value: '' }],
};
const UsersList = () => {
  const [filter, setFilter] = React.useState(initialFilter);
  const { users, setUsers } = useStore();
  const [sort, setSort] = React.useState<Array<SortDescriptor>>([
    { field: 'id', dir: 'desc' },
    { field: 'fullName', dir: 'desc' },
    { field: 'userName', dir: 'desc' },
    { field: 'lastLogin', dir: 'desc' },
    { field: 'enabled', dir: 'desc' },
  ]);
  const sortChange = (event: GridSortChangeEvent) => {
    setUsers(getProducts(event.sort));
    setSort(event.sort);
  };
  const getProducts = (sort: SortDescriptor[]): User[] => {
    return orderBy(users, sort);
  };
  useEffect(() => {
    setTimeout(() => {
      setUsers(usersData);
    }, 1000);
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
        <GridColumn filterable={false} field="id" title="ID" />
        <GridColumn filterable={true} field="userName" title="UserName" />
        <GridColumn filterable={false} field="fullName" title="FullName" />
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
    </div>
  );
};

export default observer(UsersList);
