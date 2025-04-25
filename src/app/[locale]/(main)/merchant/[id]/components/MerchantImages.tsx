'use client';

import { FC } from 'react';
import ImageGallery from 'react-image-gallery';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import 'react-image-gallery/styles/css/image-gallery.css';

interface CustomImageGalleryProps {
  images: string[];
}

const CustomImageGallery: FC<CustomImageGalleryProps> = ({ images }) => {
  const galleryImages = images.map((image: string) => ({
    original: image,
    thumbnail: image,
  }));

  const renderLeftNav = (
    onClick: React.MouseEventHandler<HTMLElement>,
    disabled: boolean,
  ) => (
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      disabled={disabled}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '10px',
        transform: 'translateY(-50%)',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
      }}
    >
      <ArrowForwardIosIcon fontSize="small" />
    </IconButton>
  );

  const renderRightNav = (
    onClick: React.MouseEventHandler<HTMLElement>,
    disabled: boolean,
  ) => (
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      disabled={disabled}
      sx={{
        position: 'absolute',
        top: '50%',
        right: '10px',
        transform: 'translateY(-50%)',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
      }}
    >
      <ArrowBackIosIcon fontSize="small" />
    </IconButton>
  );

  return (
    <ImageGallery
      items={galleryImages}
      renderLeftNav={renderLeftNav}
      renderRightNav={renderRightNav}
      showThumbnails={true}
      showFullscreenButton={true}
      showPlayButton={true}
    />
  );
};

export default CustomImageGallery;
