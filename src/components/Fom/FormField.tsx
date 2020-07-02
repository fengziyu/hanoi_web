import React from 'react';
import { Form, Input, Select, DatePicker, Tree, Radio, Switch } from 'antd';
import { FormItemProps } from 'antd/lib/form';

const { Item } = Form;

export interface FormFieldProps extends FormItemProps {
  type: 'select' | 'input' | 'textarea' | 'date' | 'dateRange' | 'tree' | 'radio' | 'switch';
  initialValue?: string;
  options?: any[];
  props?: any;
}

const FormField: React.FC<FormFieldProps> = ({
  type,
  options,
  props = {},
  ...fieldProps
}) => {
  const Field = (() => {
    return {
      select: Select,
      input: Input,
      textarea: Input.TextArea,
      date: DatePicker,
      dateRange: DatePicker.RangePicker,
      tree: Tree,
      radio: Radio,
      switch: Switch,
    }[type]
  })()

  return (
    <Item {...fieldProps}>
      <Field {...props}/>
    </Item>
  )
}


export default FormField;