import React from 'react';
import { Modal, Form as AntdForm } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import Form, { FormProps } from '../Fom';
import { FormInstance } from 'antd/lib/form';

interface FormModalProps extends ModalProps {
  onOk: (value: any) => void;
  formProps: FormProps;
  form?: FormInstance;
}

const FormModal: React.FC<FormModalProps> = ({
  formProps,
  onOk,
  onCancel,
  form,
  ...modalProps
}) => {
  if (!form) {
    [form] = AntdForm.useForm();
  }

  const handleOk = () => {
    form?.validateFields().then(() => {
      const value = form?.getFieldsValue();
      onOk && onOk(value);
    })
  }

  const handleCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    form?.resetFields();
    onCancel && onCancel(e);
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <Modal
      onOk={handleOk}
      onCancel={handleCancel}
      {...modalProps}
    >
      <Form form={form} {...formItemLayout}  {...formProps}/>
    </Modal>
  )
}

export default FormModal;