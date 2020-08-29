import styled, { StyledProps } from 'styled-components';
import { theme } from '../theme';
type Prop = {
  variant?: 'primary' | 'secondary';
};

const variantMapping: Record<Required<Prop>['variant'], string> = {
  primary: theme.palette.primary,
  secondary: theme.palette.secondary
};
const Button = styled.button<Prop>`
  box-sizing: border-box;
  text-align: center;
  padding: ${theme.spacing.m}px ${theme.spacing.s}px;
  color: white;
  background-color: ${(props: StyledProps<Prop>): string => variantMapping[props.variant!]};
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
  
`;

Button.defaultProps = {
  variant: 'secondary'
};

export { Button };
