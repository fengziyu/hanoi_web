import React from 'react';
import { Form as AntdForm, Input } from 'antd';
import { FormProps as AntdFormProps } from 'antd/lib/form';
import FormField, { FormFieldProps } from './FormField';


export interface FormProps extends AntdFormProps {
  formFields?: FormFieldProps[]
}

const Form: React.FC<FormProps> = ({
  formFields,
  form,
  ...formProps
}) => {
  if (!form) {
    [form] = AntdForm.useForm();
  }
  return (
    <AntdForm form={form} { ...formProps }>
      {formFields?.map(field => <FormField key={`${field.name}`} {...field}/>)}
    </AntdForm>
  )
}

export default Form;