import * as React from 'react';

const branch = <L, P extends L>(test: (props: P) => boolean, LeftComponent: React.FC<L>) => (BaseComponent: React.FC<P>) => (props: P): React.ReactElement => {
  if (test(props)) {
    return <LeftComponent {...props} />;
  } else {
    return <BaseComponent {...props} />;
  }
};

export { branch };
