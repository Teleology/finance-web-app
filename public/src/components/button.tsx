import * as React from 'react';
import _ from 'lodash/fp';
import styled, { StyledProps } from 'styled-components';
import { theme } from '../theme';

const Button: React.FC<{}> = styled.button`
  padding: 8px 16px;
  background-color: ${};
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

function get<
  T,
  P1 extends keyof NonNullable<T>
  >(obj: T, prop1: P1): NonNullable<T>[P1] | undefined;

function get<
  T,
  P1 extends keyof NonNullable<T>,
  P2 extends keyof NonNullable<NonNullable<T>[P1]>
  >(obj: T, prop1: P1, prop2: P2): NonNullable<NonNullable<T>[P1]>[P2] | undefined;

function get<
  T,
  P1 extends keyof NonNullable<T>,
  P2 extends keyof NonNullable<NonNullable<T>[P1]>,
  P3 extends keyof NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>
  >(obj: T, prop1: P1, prop2: P2, prop3: P3): NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>[P3] | undefined;

// ...and so on...

function get(obj: any, ...props: string[]): any {
  return obj && props.reduce(
    (result, prop) => result == null ? undefined : result[prop],
    obj
  );
}

const primary = get(theme, 'palette', 'primary');


export { Button };
