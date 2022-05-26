import * as React from 'react';
import { useStore } from '../../hooks/useStore';
import {
  Form,
  Field,
  FormElement,
  FieldRenderProps,
  FormRenderProps,
  FieldWrapper,
} from '@progress/kendo-react-form';
import { observer } from 'mobx-react-lite';
import { Error } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';
import { getter } from '@progress/kendo-react-common';
import { Checkbox } from '@progress/kendo-react-inputs';
import { FloatingLabel } from '@progress/kendo-react-labels';
import { FormProps } from '../../@types/global.types';
import FormValidator from '../../utils/FormValidator';
const userNameGetter = getter('userName');
const firstNameGetter = getter('firstName');
const lastNameGetter = getter('lastName');

const ValidatedInput = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <Input {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};
const FormCheckbox = (fieldRenderProps: {
  [x: string]: string | boolean;
  id: string;
  valid: boolean;
  disabled: boolean;
}) => {
  const { id, valid, disabled, ...others } = fieldRenderProps;

  return (
    <FieldWrapper>
      <Checkbox valid={valid} id={id} disabled={disabled} {...others} />
    </FieldWrapper>
  );
};
const NewUserForm = ({
  onSubmit,
  userName = '',
  lastName = '',
  firstName = '',
  enabled = false,
  isEdit = false,
}: FormProps) => {
  const { users } = useStore();

  return (
    <Form
      initialValues={{ userName, firstName, lastName, enabled }}
      validator={(values) =>
        FormValidator(
          values,
          users,
          isEdit,
          firstNameGetter,
          lastNameGetter,
          userNameGetter,
        )
      }
      onSubmit={onSubmit}
      render={(formRenderProps: FormRenderProps) => (
        <FormElement style={{ maxWidth: 650, width: '500px' }}>
          <fieldset className={'k-form-fieldset'}>
            <legend className={'k-form-legend'}>
              {formRenderProps.visited &&
                formRenderProps.errors &&
                formRenderProps.errors.VALIDATION_SUMMARY && (
                  <div className={'k-messagebox k-messagebox-error'}>
                    {formRenderProps.errors.VALIDATION_SUMMARY}
                  </div>
                )}
            </legend>
            <div className="mb-3">
              <Field
                disabled={isEdit}
                name={'userName'}
                component={ValidatedInput}
                label={'User name'}
              />
            </div>

            <div className="mb-3">
              <Field
                name={'firstName'}
                component={ValidatedInput}
                label={'First name'}
              />
            </div>

            <div className="mb-3">
              <Field
                name={'lastName'}
                component={ValidatedInput}
                label={'LastName'}
              />
            </div>
          </fieldset>
          <div>
            <FloatingLabel label={'Enabled'} />
            <Field
              style={{ margin: '16px' }}
              id={'terms'}
              name={'enabled'}
              component={FormCheckbox}
            />
          </div>
          <div className="k-form-buttons">
            <button
              type={'submit'}
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              disabled={!formRenderProps.allowSubmit}>
              {isEdit ? 'Save' : 'Add'}
            </button>
          </div>
        </FormElement>
      )}
    />
  );
};
export default observer(NewUserForm);
