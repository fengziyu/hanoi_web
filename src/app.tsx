import React from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';

/** apollo */
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

// console.log(gql);
moment.locale('zh-cn');


const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:3000/graphql'
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
});

const Provider: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <ConfigProvider locale={zhCN}>
        {children}
      </ConfigProvider>
    </ApolloProvider>
  )
}

export function rootContainer(container: any) {
  return React.createElement(Provider, null, container);
}