import { makeStyles, StyleRules } from '@material-ui/core/styles';
import { CardClassKey, CardContentClassKey } from '@material-ui/core';
import { commonStyles } from '../common-styles';

const useCardStyles = makeStyles({
  root: {
    ...commonStyles.cardStyles,
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
} as StyleRules<CardClassKey>);

const useCardContentStyles = makeStyles({
  root: {
    flexGrow: 1,
    minHeight: 0,
    overflow: 'auto'
  }
} as StyleRules<CardContentClassKey>);

export default {
  useCardStyles,
  useCardContentStyles
};
