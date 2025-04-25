import { Box, ClickAwayListener, Paper, Popper } from '@mui/material';
import { FC, MouseEvent, useMemo, useState } from 'react';
import Image from '../Image';
import { CustomCellRendererProps } from 'ag-grid-react';

const ImageRenderer: FC<CustomCellRendererProps> = (props) => {
  const url = useMemo(() => {
    const image = props.value;

    let url = '';
    if (typeof image === 'object' && image?.[0]) {
      url = image[0];
    } else if (typeof image === 'string') {
      url = image;
    }
    return url;
  }, [props]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const open = !!anchorEl;
  const id = open ? 'product-image-popper' : undefined;

  const handleClear = (e: any) => {
    if (e.target.nodeName !== 'IMG' || !e.target?.src.includes(url)) {
      setAnchorEl(null);
    }
  };

  return (
    <>
      <Box height="100%" display={'flex'} alignItems={'center'}>
        <Image
          style={{
            cursor: 'pointer',
          }}
          aria-describedby={id}
          width={36}
          height={36}
          src={url}
          onClick={handleClick}
        />
      </Box>
      <ClickAwayListener onClickAway={handleClear}>
        <Popper
          style={{
            zIndex: 150,
          }}
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement="left-end"
        >
          <Paper>
            <Box padding={2}>
              <Image
                style={{
                  maxWidth: 220,
                }}
                alt=""
                src={url}
              />
            </Box>
          </Paper>
        </Popper>
      </ClickAwayListener>
    </>
  );
};

export default ImageRenderer;
