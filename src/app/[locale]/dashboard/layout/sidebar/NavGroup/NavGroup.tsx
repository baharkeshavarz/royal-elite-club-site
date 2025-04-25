import { DEFAULt_LINE_HEIGHT } from '@/constants/general';
import { ListSubheader, styled, Theme } from '@mui/material';

type NavGroup = {
  navlabel?: boolean;
  subheader?: string;
};

interface ItemType {
  item: NavGroup;
}

const NavGroup = ({ item }: ItemType) => {
  const ListSubheaderStyle = styled((props: Theme | any) => (
    <ListSubheader disableSticky {...props} />
  ))(({ theme }) => ({
    ...theme.typography.overline,
    fontWeight: '600',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
    fontSize: '0.9rem',
    lineHeight: DEFAULt_LINE_HEIGHT,
    display: 'flex',
    justifyContent: 'end',
  }));
  return <ListSubheaderStyle>{item.subheader}</ListSubheaderStyle>;
};

export default NavGroup;
