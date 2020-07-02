import React from 'react';
import { Form } from 'antd';
import FormModal from '@/components/FormModal';
import { FormProps } from '@/components/Fom';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { CREATE_REPO, GET_REPOS } from '../graphql';
import { Repo, GetRepos } from '../interface';
import { ApolloClient } from 'apollo-client';

interface CreateRepoModalProps {
  visible: boolean
  onCancel?: () => void
}

const CreateRepoModal: React.FC<CreateRepoModalProps> = ({
  visible,
  onCancel
}) => {
  const client: ApolloClient<any> = useApolloClient();
  const [createRepo, { loading }] = useMutation<{ createRepo: Repo }>(
    CREATE_REPO,
    {
      update(store, { data }) {
        // 从我们的缓存中读取此查询的数据。
        const reposData: GetRepos | null = store.readQuery({ query: GET_REPOS });
        store.writeQuery({ query: GET_REPOS, data: { repos: [...(reposData?.repos || []), data?.createRepo]} })
      }
    }
  )
  const [form] = Form.useForm();

  const handleOk = async (value: any) => {
    await createRepo({ variables: { createRepoInput: value } })
    handleCancel();
  }

  const handleCancel = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    form.resetFields();
    onCancel && onCancel();
  }

  const formProps: FormProps = {
    formFields: [
      { label: '项目名', type: 'input', name: 'name', rules: [{ required: true, message: '项目名不能为空' }] },
      { label: 'git owner', type: 'input', name: 'owner', rules: [{ required: true, message: 'git owner不能为空' }] },
      { label: 'git name', type: 'input', name: 'repo', rules: [{ required: true, message: 'git name不能为空' }] },
    ]
  }

  return (
    <FormModal
      confirmLoading={loading}
      title="创建项目"
      visible={visible}
      formProps={formProps}
      onOk={handleOk}
      onCancel={onCancel}
      form={form}
    />
  )
}

export default CreateRepoModal;
