import { Link as RouteLink } from 'react-router-dom';
import { styled } from '@material-ui/core';
const AppRouteLink = styled(RouteLink)({
  textDecoration: 'none',
  color: 'inherit'
});

const AppLinkBlock = styled('a')({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block'
});

export { AppRouteLink, AppLinkBlock };
