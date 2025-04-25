import { CircularProgress, Stack } from '@mui/material';

const Loading = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      height="100%"
      sx={{
        pl: 4,
      }}
    >
      <CircularProgress size={16} />
    </Stack>
  );
};

export default Loading;
