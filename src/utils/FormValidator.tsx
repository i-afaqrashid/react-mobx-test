import { User, UserEdit } from '../@types/global.types';

const FormValidator = (
  values: UserEdit,
  users: User[],
  isEdit: boolean,
  firstNameGetter: (values: UserEdit) => string,
  lastNameGetter: (values: UserEdit) => string,
  userNameGetter: (values: UserEdit) => string,
) => {
  if (
    !/^(?=.{3})[a-z][a-z\d]*_?[a-z\d]+$/i.test(values?.userName) ||
    (values?.userName?.length > 15 && !isEdit)
  ) {
    return {
      VALIDATION_SUMMARY: 'invalid name',
      ['userName']:
        'user name only contain alphanumeric characters , min 3 and max 15 characters',
      ['firstName']: '',
      ['lastName']: '',
    };
  } else if (
    !firstNameGetter(values) ||
    !lastNameGetter(values) ||
    !userNameGetter(values)
  ) {
    return {
      VALIDATION_SUMMARY: 'Please fill all the fields.',
      ['userName']: 'Please fill all the fields.',
      ['firstName']: 'Please fill all the fields.',
      ['lastName']: 'Please fill all the fields.',
    };
  } else if (
    values?.firstName?.length > 25 ||
    values?.lastName?.length > 25 ||
    values?.userName?.length > 15
  ) {
    return {
      VALIDATION_SUMMARY: 'Required',
      ['userName']: 'Maximun 15 Characters are allow',
      ['firstName']: 'Maximun 25 Characters are allow',
      ['lastName']: 'Maximun 25 Characters are allow.',
    };
  } else if (values?.firstName?.length + values?.lastName?.length > 40) {
    return {
      VALIDATION_SUMMARY:
        'Maximum Length of first and last name should not greater then 40',
      ['userName']: '',
      ['firstName']:
        'Maximum Length of first and last name should not greater then 40',
      ['lastName']:
        'Maximum Length of first and last name should not greater then 40',
    };
  }
  const checkUserName = users.filter((user: User) => {
    return user?.userName?.toLowerCase() === values?.userName?.toLowerCase();
  });
  if (checkUserName.length && !isEdit) {
    return {
      VALIDATION_SUMMARY: 'User already exist please change the name ',
      ['userName']: 'User already exist please change the name ',
      ['firstName']: '',
      ['lastName']: '',
    };
  }
};

export default FormValidator;
