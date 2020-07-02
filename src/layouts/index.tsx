import React from 'react';

const BasicLayout: React.FC = ({ children }) => {
  return (
    <div style={{ padding: 20 }}>
      {children}
    </div>
  )
}

export default BasicLayout;