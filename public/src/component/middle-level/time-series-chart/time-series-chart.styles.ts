import * as React from 'react';
import { makeStyles, StyleRules, Theme } from '@material-ui/core/styles';
import { ChipClassKey } from '@material-ui/core';

const useBreadcrumbStyles = makeStyles(
  ({ palette }: Theme) =>
    ({
      root: (props: { isSelected: boolean }) => ({
        minWidth: 80,
        ...(props.isSelected && { backgroundColor: palette.primary.light, color: 'white' })
      })
    } as StyleRules<ChipClassKey>)
);

const useMarkedTextStyles = makeStyles({
  sign: {
    '::before': (props: { n: number }): React.CSSProperties => {
      if (props.n > 0) {
        return { content: '+' };
      } else if (props.n < 0) {
        return { content: '-' };
      } else {
        return {};
      }
    }
  },
  hue: (props: { n: number }) => {
    if (props.n > 0) {
      return { color: 'green' };
    } else if (props.n < 0) {
      return { color: 'red' };
    } else {
      return {};
    }
  }
});

export default { useBreadcrumbStyles, useMarkedTextStyles };
