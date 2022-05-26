export type User = {
  id: number;
  userName: string;
  fullName: string;
  lastLogin: Date;
  enabled: boolean;
};

export interface GridCell {
  dataItem: User;
}

export interface ModalProps {
  visible: boolean;
  toggleModal: () => void;
}
export type UserEdit = {
  userName: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
};

export interface FormProps {
  onSubmit: (
    values: {
      [name: string]: string;
    },
    event?: React.SyntheticEvent<any, Event> | undefined,
  ) => void;
  userName?: string;
  lastName?: string;
  firstName?: string;
  enabled?: boolean;
  isEdit?: boolean;
}

export type UserKeys = { [key in string]: string | boolean | number | Date };
