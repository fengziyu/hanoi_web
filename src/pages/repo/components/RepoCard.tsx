import React from 'react';
import { Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import { Repo, GetRepos } from '../interface';
import { useMutation } from '@apollo/react-hooks';
import { REMOVE_REPO, GET_REPOS } from '../graphql';

const { Meta } = Card;

interface RepoCardProps {
  repo: Repo;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  const [removeRepo, { loading }] = useMutation(
    REMOVE_REPO,
    {
      update(store) {
        // 从我们的缓存中读取此查询的数据。
        const data: GetRepos | null = store.readQuery({ query: GET_REPOS });
        const repos = data?.repos ? data.repos.filter((item: any) => item._id !== repo._id) : [];
        store.writeQuery({ query: GET_REPOS, data: { repos } })
      }
    }
  )

  return (
    <Card
      hoverable={true}
      actions={[
        <DeleteOutlined key="ellipsis" onClick={() => removeRepo({ variables: { id: repo._id } })}/>,
      ]}
    >
      <Meta
        title={repo.name}
        description={`${repo.repo}/${repo.owner}`}
      />
    </Card>
  )
}

export default RepoCard;