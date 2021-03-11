import * as React from 'react';
import { ListChildComponentProps, ListOnItemsRenderedProps, FixedSizeList as List } from 'react-window';
// @ts-ignore
import InfiniteLoader from 'react-window-infinite-loader';

type OnItemsRendered = (props: ListOnItemsRenderedProps) => any;
const rowSizes = new Array(10000).fill(true).map(() => 25 + Math.round(Math.random() * 50));

const getItemSize = (): number => 25;

const Row = ({ style, data, index }: ListChildComponentProps): React.ReactElement => (
  <div style={style}>
    Row {index}, {data[index]}
  </div>
);

const Example = (): React.ReactElement => {
  const [data, setData] = React.useState(rowSizes);
  React.useEffect(() => {
    setTimeout(() => {
      console.log('setData');
      setData(data.slice(9990));
    }, 10000);
    // eslint-disable-next-line
  }, []);
  return (
    <List style={{ border: '1px solid red' }} height={800} itemCount={data.length} itemData={data} itemSize={getItemSize} width={300}>
      {Row}
    </List>
  );
};

type Props = {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  // eslint-disable-next-line
  items: Array<{ name: string}>;
  // eslint-disable-next-line
  loadNextPage: (startIndex: number, stopIndex: number) => Promise<any> | null;
};

const Example2 = ({
  // Are there more items to load?
  // (This information comes from the most recent API request.)
  hasNextPage,

  // Are we currently loading a page of items?
  // (This may be an in-flight flag in your Redux store for example.)
  isNextPageLoading,

  // Array of items loaded so far.
  items,

  // Callback function responsible for loading the next page of items.
  loadNextPage
}: Props): React.ReactElement => {
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? items.length + 1 : items.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const loadMoreItems = isNextPageLoading ? () => null : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number): boolean => !hasNextPage || index < items.length;

  // Render an item or a loading indicator.
  const Item = ({ index, style }: ListChildComponentProps): React.ReactElement => {
    let content;
    if (!isItemLoaded(index)) {
      content = 'Loading...';
    } else {
      content = items[index].name;
    }

    return <div style={style}>{content}</div>;
  };
  // return <div>12</div>;

  return (
    // eslint-disable-next-line react/jsx-no-bind
    <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
      {({ onItemsRendered, ref }: { onItemsRendered: OnItemsRendered; ref: React.Ref<{}> }): React.ReactNode => (
        // @ts-ignore, eslint-disable-next-line
        // eslint-disable-next-line react/jsx-no-bind
        <List height={850} itemCount={itemCount} itemSize={30} onItemsRendered={onItemsRendered} ref={ref} width={300}>
          {Item}
        </List>
      )}
    </InfiniteLoader>
  );
};

export { Example, Example2 };
