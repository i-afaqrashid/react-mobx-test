import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../hooks/useStore';
import { useNavigate, useParams } from 'react-router-dom';
import NewUserForm from '../components/newUser/NewUserForm';
import { User, UserEdit, UserKeys } from '../@types/global.types';

const SingleUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedUser, setSelectedUser] = useState<(UserEdit & User) | null>(
    null,
  );
  const { users, updateUser } = useStore();
  const handleSubmit = (values: UserKeys) => {
    if (selectedUser?.userName) {
      const updatedUser = {
        id: selectedUser.id,
        lastLogin: selectedUser.lastLogin,
        userName: selectedUser.userName,
        fullName: values.firstName + ' ' + values.lastName,
        enabled: values.enabled,
      };

      setTimeout(() => {
        updateUser(updatedUser as User);
        navigate('/');
      }, 1000);
    }
  };
  useEffect(() => {
    if (id) {
      setTimeout(() => {
        const user = users.filter((u) => u.id === parseInt(id, 10));
        if (!user.length) return;
        setSelectedUser({
          ...user[0],
          firstName: user[0].fullName.split(' ')[0],
          lastName: user[0].fullName.split(' ')[1],
        });
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!selectedUser) return <p>Loading</p>;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '100%',
        minHeight: '100vh',
      }}>
      <NewUserForm onSubmit={handleSubmit} {...selectedUser} isEdit />
    </div>
  );
};

export default observer(SingleUser);
