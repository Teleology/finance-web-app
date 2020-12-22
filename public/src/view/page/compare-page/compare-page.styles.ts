import { makeStyles } from '@material-ui/core/styles';
import { fullFlexStyles } from '../../common-styles';

const useCardStyles = makeStyles({
  root: {
    ...fullFlexStyles,
    display: 'flex',
    flexDirection: 'column'
  }
});

export default { useCardStyles };
