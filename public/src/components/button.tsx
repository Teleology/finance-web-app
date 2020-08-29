import styled, { StyledProps } from 'styled-components';
import { get } from 'lodash/fp';
import { theme } from '../theme';

const Button = styled.button`
  box-sizing: border-box;
  text-align: center;
  padding: ${theme.spacing.m}px ${theme.spacing.s}px;
  color: white;
  background-color: rebeccapurple;
  border: 1px solid;
  border-color: rebeccapurple;
  border-radius: 20px;
  font-family: sans-serif;
  font-size: 16px;
  text-decoration: none;
  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus {
    outline: 0;
    color: white;
    border-color: salmon;
    background-color: salmon;
    cursor: pointer;
  }
  &:disabled {
    opacity: 0.6;
    filter: saturate(60%);
  }
`;

export { Button };
