import React from 'react';
import { Dialog } from '@progress/kendo-react-dialogs';
import { ModalProps, User, UserKeys } from '../../@types/global.types';
import NewUserForm from './NewUserForm';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';
const NewUserModal = (props: ModalProps) => {
  const { users, setUsers } = useStore();
  if (!props.visible) {
    return null;
  }
  const handleSubmit = (values: UserKeys) => {
    let lastIndexID = Math.max(...users.map((value) => value.id));
    lastIndexID++;
    values.id = lastIndexID;
    if (!values?.enabled) {
      values.enabled = false;
    }
    const fullName = values.firstName + ' ' + values.lastName;
    values.fullName = fullName;
    values.lastLogin = new Date();

    setTimeout(() => {
      const temp = users;
      temp.push(values as User);
      setUsers(temp);
      props.toggleModal();
    }, 1000);
  };
  return (
    <Dialog title={'Add New User'} onClose={props.toggleModal}>
      <NewUserForm onSubmit={handleSubmit} />
    </Dialog>
  );
};

export default observer(NewUserModal);
