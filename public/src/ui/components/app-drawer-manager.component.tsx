import * as React from 'react';

type Props = {
  children: (isOpen: boolean, close: () => void, open: () => void) => React.ReactElement;
};
export const AppDrawerManager = React.memo(
  (props: Props): React.ReactElement => {
    const { children } = props;
    const [isOpen, setIsOpen] = React.useState(false);
    const close = React.useCallback(() => {
      setIsOpen(false);
    }, []);
    const open = React.useCallback(() => {
      setIsOpen(true);
    }, []);
    return children(isOpen, close, open);
  }
);

AppDrawerManager.displayName = 'AppDrawerManager';
