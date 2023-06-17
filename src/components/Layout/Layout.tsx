import React from 'react';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  height: 100px;
  background-color: #d47d1a;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 40px;
`;

const Logo = styled.div`
  font-size: 24px;
`;

const Main = styled.main`
  flex-grow: 1;
  padding: 20px 40px 140px 40px;
`;

const Layout = ({ children }) => {
    return (
        <LayoutWrapper>
            <Header>
                <Logo>Trello calendar copy</Logo>
            </Header>
            <Main>{children}</Main>
        </LayoutWrapper>
    );
};

export default Layout;
