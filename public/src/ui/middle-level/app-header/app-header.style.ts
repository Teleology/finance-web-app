import { makeStyles } from '@material-ui/core/styles';
const useTitleStyles = makeStyles({
  h1: {
    flexGrow: 1
  }
});

const usePlainStyles = makeStyles({
  iconContainer: {
    position: 'absolute'
  }
});
export default {
  useTitleStyles,
  usePlainStyles
};
