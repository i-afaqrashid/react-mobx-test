import { useStore } from '../hooks/useStore';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { users as usersData } from '../mocks/users';
import {
  Grid,
  GridColumn,
  GridSortChangeEvent,
} from '@Progress/kendo-react-grid';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { User } from '../@types/global.types';
const UsersList = () => {
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
        sortable={{
          mode: 'single',
        }}
        sort={sort}
        onSortChange={sortChange}
        data={users}>
        <GridColumn field="id" title="ID" />
        <GridColumn field="userName" title="UserName" />
        <GridColumn field="fullName" title="FullName" />
        <GridColumn field="lastLogin" title="LastLogin" />
        <GridColumn field="enabled" title="Enabled" />
      </Grid>
    </div>
  );
};

export default observer(UsersList);
