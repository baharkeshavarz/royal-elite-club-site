'use client';

import TabPanel from '@/components/common/TabPanel';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC, SyntheticEvent, useState } from 'react';
import { Z_INDEX_VALUES } from '@/config/responsive';
import MerchantContactInfo from './MerchantContactInfo';
import { IMerchant } from '@/services/merchant/types';
import BranchList from './BranchList';
import { DEFAULt_SMALL_LINE_HEIGHT } from '@/constants/general';

export interface MerchantTabsProps {
  merchant: IMerchant;
}

const MerchantTabs: FC<MerchantTabsProps> = ({ merchant }) => {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (event: SyntheticEvent, value: number) => {
    setActiveTab(value);
  };

  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'grey.100',
          zIndex: Z_INDEX_VALUES.progressBar,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleChangeTab}
          textColor="inherit"
          indicatorColor="primary"
          aria-label="merchant tabs"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            color: 'black',
            '.MuiTab-root': {
              minWidth: { xs: 'auto', sm: 100 },
              padding: { xs: 1, sm: 2 },
              fontSize: { xs: '0.8rem', sm: '1rem' },
            },
          }}
        >
          <Tab value={0} label={t('pages.merchant.details.tabs.contactInfo')} />
          <Tab value={1} label={t('pages.merchant.details.tabs.branches')} />
          <Tab value={2} label={t('pages.merchant.details.tabs.description')} />
        </Tabs>
      </Box>

      <TabPanel value={activeTab} index={0}>
        <MerchantContactInfo merchant={merchant} />
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        {merchant?.branches && (
          <BranchList
            branches={merchant?.branches}
            merchantName={merchant?.name}
          />
        )}
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <Typography
          component="div"
          sx={{
            lineHeight: DEFAULt_SMALL_LINE_HEIGHT,
          }}
          dangerouslySetInnerHTML={{ __html: merchant?.description }}
        />
      </TabPanel>
    </>
  );
};

export default MerchantTabs;
