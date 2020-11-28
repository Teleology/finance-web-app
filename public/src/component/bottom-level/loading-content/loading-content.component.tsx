import * as React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import { branch, renderComponent } from 'recompose';
import { get } from 'lodash/fp';
import styles from './loading-content.styles';

type Props = {
  isLoading: boolean;
};

const LoadingContent = (): React.ReactElement => (
  <Grid container={true} justify="center" classes={styles.useGridStyles()}>
    <CircularProgress size={60} />
  </Grid>
);

const LoadingContentFC = <T, U extends T>(props: { isLoading: boolean; data: T; children: (data: U) => React.ReactElement }): React.ReactElement => {
  if (props.isLoading) {
    return <LoadingContent />;
  } else {
    return props.children(props.data as U);
  }
};
// const data: null | number = 1;
// const fn = (data: number): React.ReactElement => <div>{data}</div>;
// LoadingContentFC<number | null, number>({ isLoading: false, data, children: fn });
//
// const LoadingContentW = (props: React.PropsWithChildren<{ isLoading: boolean }>): React.ReactElement => {
//   if (props.isLoading) {
//     return <LoadingContent />;
//   } else {
//     return <>{props.children}</>;
//   }
// };
/*
 * https://twitter.com/dan_abramov/status/1024636630211211266
 * flow(render({}), render({}))(JSX.Element)
 * */
// const XXX = () => <div>123</div>;
// const YYY = () => <div>456</div>;
// const LoadingContentW = (props: React.PropsWithChildren<{ isLoading: boolean }>): React.ReactElement =>
//   React.Children.map(
//     props.children,
//     (element: React.ReactElement): React.ReactElement => {
//       if (props.isLoading) {
//         return React.cloneElement(XXX);
//       } else {
//         return React.cloneElement(YYY);
//       }
//     }
//   );
const LoadingContentWrapper: React.ComponentClass<React.PropsWithChildren<Props>> = branch(get('isLoading'), renderComponent(LoadingContent))(get('children'));

export { LoadingContent, LoadingContentWrapper, LoadingContentFC };
