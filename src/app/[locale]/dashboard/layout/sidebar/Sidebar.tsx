import { useMediaQuery, Box, Drawer, Typography } from '@mui/material';
import SidebarItems from './SidebarItems';
import { Upgrade } from './Updrade';
import { Sidebar } from 'react-mui-sidebar';
import Logo from '@/components/common/Logo';
import { Link } from '@/navigation';
import { DEFAULT_HOME_PAGE_PATH } from '@/constants/routes';
import { useTranslations } from 'next-intl';

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const MSidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: ItemType) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const sidebarWidth = '270px';
  const t = useTranslations();

  // Custom CSS for short scrollbar
  const scrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '7px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#eff2f7',
      borderRadius: '15px',
    },
  };

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              boxSizing: 'border-box',
              ...scrollbarStyles,
            },
          }}
        >
          <Box
            sx={{
              height: '100%',
            }}
          >
            <Sidebar
              width={'270px'}
              collapsewidth="80px"
              open={isSidebarOpen}
              themeColor="#5d87ff"
              themeSecondaryColor="#49beff"
              showProfile={false}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={3}
              >
                <Typography variant="subtitle1">
                  {t('siteInfo.title')}
                </Typography>
                <Link href={DEFAULT_HOME_PAGE_PATH}>
                  <Logo width="80" />
                </Link>
              </Box>
              <Box>
                <SidebarItems toggleMobileSidebar={onSidebarClose} />
                <Upgrade />
              </Box>
            </Sidebar>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          boxShadow: (theme) => theme.shadows[8],
          ...scrollbarStyles,
        },
      }}
    >
      <Box px={3}>
        <Sidebar
          width={'270px'}
          collapsewidth="80px"
          isCollapse={false}
          mode="light"
          direction="ltr"
          themeColor="#5d87ff"
          themeSecondaryColor="#49beff"
          showProfile={false}
        >
          <Link href={DEFAULT_HOME_PAGE_PATH}>
            <Logo />
          </Link>
          <SidebarItems toggleMobileSidebar={onSidebarClose} />
          <Upgrade />
        </Sidebar>
      </Box>
    </Drawer>
  );
};

export default MSidebar;
