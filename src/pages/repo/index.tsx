import React, { useState } from 'react';
import RepoCard from './components/RepoCard';
import { List, Button } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import CreateRepoModal from './components/CreateRepoModal';
import { GET_REPOS } from './graphql';
import { GetRepos } from './interface';

const Repo: React.FC = () => {
  const { 
    data, 
    loading, 
    error
  } = useQuery<GetRepos>(GET_REPOS);

  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div style={{ textAlign: 'right', marginBottom: 15 }}>
        <Button onClick={() => setVisible(true)}>添加</Button>
      </div>
      <List
        loading={loading}
        grid={{ gutter: 16, column: 3 }}
        dataSource={data && data.repos || []}
        renderItem={repo => (
          <List.Item>
            <RepoCard repo={repo}/>
          </List.Item>
        )}
      />
      <CreateRepoModal visible={visible} onCancel={() => setVisible(false)}/>
    </div>
  )
}

export default Repo;
