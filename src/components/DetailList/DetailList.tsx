import { List } from '@mui/material';
import { FC } from 'react';
import DetailItem, { DetailListItem } from './components/DetailItem';
import Skeleton from './components/Skeleton';

export interface DetailListProps {
  items: DetailListItem[];
  isLoading?: boolean;
}

const DetailList: FC<DetailListProps> = ({ items, isLoading }) => {
  return (
    <>
      <List
        sx={{
          p: 0,
        }}
      >
        {isLoading ? (
          <Skeleton />
        ) : (
          items.map((item, index: number) => {
            return <DetailItem key={item.key} index={index} item={item} />;
          })
        )}
      </List>
    </>
  );
};

export default DetailList;
