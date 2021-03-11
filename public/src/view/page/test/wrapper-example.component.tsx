import * as React from 'react';
import { Example2 } from './virtualized-page.component';

type State = {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  items: Array<{ name: string }>;
};

class WrapperExampleComponent extends React.PureComponent<{}> {
  public state: State;
  constructor(props: {}) {
    super(props);
    this.state = {
      hasNextPage: true,
      isNextPageLoading: false,
      items: []
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public loadNextPage = (startIndex: number, stopIndex: number) => {
    console.log('loadNextPage', startIndex, stopIndex);
    this.setState({ isNextPageLoading: true }, () => {
      setTimeout(() => {
        this.setState(() => ({
          hasNextPage: this.state.items.length < 100,
          isNextPageLoading: false,
          items: [...this.state.items].concat(new Array(10).fill(true).map(() => ({ name: Math.random() * 100 + '' })))
        }));
      }, 2500);
    });
  };

  public render(): React.ReactElement {
    const { hasNextPage, isNextPageLoading, items } = this.state;

    // @ts-ignore
    return <Example2 hasNextPage={hasNextPage} isNextPageLoading={isNextPageLoading} items={items} loadNextPage={this.loadNextPage} />;
  }
}

export { WrapperExampleComponent };
