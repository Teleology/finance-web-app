import { makeStyles, StyleRules } from '@material-ui/core/styles';
import { CardClassKey } from '@material-ui/core';
import { commonStyles } from '../common-styles';

const useCardStyles = makeStyles({
  root: {
    ...commonStyles.cardStyles,
    height: '100%'
  }
} as StyleRules<CardClassKey>);

export default {
  useCardStyles
};
