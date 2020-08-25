import * as React from 'react';
import { get } from 'lodash';
import styled, { DefaultTheme } from 'styled-components';

const Button: React.FC<{}> = styled.button`
  padding: 8px 16px;
  background-color: ${(props: { theme: DefaultTheme }): string => get<DefaultTheme, 'palette', 'primary'>(props.theme, ['palette', 'primary'])};
  color: snow;
  border: 0;
  border-radius: 0.2rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover,
  &:active {
    background-color: crimson;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 2px white, 0 0 0 4px salmon;
  }
`;

export { Button };
