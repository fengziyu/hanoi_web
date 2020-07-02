import gql from 'graphql-tag';

export const GET_REPOS = gql`
  query getRepos {
    repos {
      _id
      name
      repo
      owner
    }
  }
`;

/** 创建项目 */
export const CREATE_REPO = gql`
  mutation createRepo($createRepoInput: CreateRepoInput!) {
    createRepo(createRepoInput: $createRepoInput) {
      _id
      name
      repo
      owner
    }
  }
`

/** 删除项目 */
export const REMOVE_REPO = gql`
  mutation removeRepo($id: ObjectId!) {
    removeRepo(_id: $id)
  }
`
