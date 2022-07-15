import React from 'react';
import styled from 'styled-components';

export const ValidCheck = React.memo(styled.span`
  font-size: 12px;
  font-weight: bold;
  align-self: flex-end;
  font-size: 11px;
  color: red;
  margin-top: 10px;
`);

export const LoginValid = styled(ValidCheck)`
  align-self: flex-end;
  padding: 0.3em 0.5em 0 0;
`;

export const MyPageValid = styled(ValidCheck)`
  font-size: 12px;
  margin: 0;
`;