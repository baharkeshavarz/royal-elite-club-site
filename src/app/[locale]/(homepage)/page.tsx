'use client';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Navbar } from '@/components/Navbar';
import { BACKGROUND_PATTERN_IMAGE } from '@/constants/general';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { HomeAdvertisement } from './components/advertisement';
import HomeInstructions from './components/Instructions';
import Introduction from './components/Introduction';
import HomeMerchants from './components/merchant/HomeMerchants';

const Home = () => {
  const Layout = styled(Box)(({ theme }) => ({}));
  return (
    <Layout style={{ backgroundImage: `url(${BACKGROUND_PATTERN_IMAGE})` }}>
      <Navbar />
      {/* <MerchantSupportedItems /> */}
      <Container maxWidth="lg">
        <Header />
      </Container>
      <Container maxWidth="lg" sx={{ p: { sm: 1, md: 5 } }}>
        <HomeMerchants />
      </Container>

      <Container maxWidth="lg">
        <Introduction />
      </Container>

      <Container maxWidth="lg">
        <HomeInstructions />
        <HomeAdvertisement />
      </Container>
      <Footer />
    </Layout>
  );
};

export default Home;
