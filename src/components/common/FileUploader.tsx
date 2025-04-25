import { FC, useRef, useState } from 'react';
import {
  Typography,
  CircularProgress,
  Box,
  useTheme,
  Grid,
  Button,
  Stack,
} from '@mui/material';
import { toast } from 'react-toastify';
import { ArrowCircleDown, Photo } from '@mui/icons-material';
import { useAppContext } from '@/hooks/useAppContext';
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface FileUploaderProps {
  title: string;
  subTitle: string;
  setFile: (file: string) => void;
  sx?: any;
  description?: string;
}

const MAX_FILE_SIZE_MB = 5;

const FileUploader: FC<FileUploaderProps> = ({
  title,
  subTitle,
  setFile,
  sx = {},
  description = '',
}) => {
  const { isMobile } = useAppContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(false);

    const file = e.target.files?.[0];
    if (!file) return;

    const fileSizeMB = file.size / 1024 / 1024;
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      toast.error(`حداکثر حجم مجاز فایل ${MAX_FILE_SIZE_MB} مگابایت است.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const fileType = file.type;
      const result = reader.result as string;

      setImageUrl(URL.createObjectURL(file));

      if (fileType.startsWith('image/')) {
        setFile(result.split(',')[1]); // base64 without prefix
        setPdfDataUrl(null);
      } else if (fileType === 'application/pdf') {
        setFile(result.split(',')[1]);
        setPdfDataUrl(result);
      } else {
        toast.error('فرمت فایل ارسالی اشتباه است');
      }
    };
  };

  const downloadPdfFile = async () => {
    if (!imageUrl) return;

    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'فایل_آپلود_شده.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  const handleFileUpload = () => {
    if (!loading && inputRef.current) {
      inputRef.current.click();
    } else {
      setLoading(true);
    }
  };

  const renderUploadedContent = () => {
    if (pdfDataUrl) {
      return isMobile ? (
        <Stack
          direction="row"
          justifyContent="center"
          py={2}
          onClick={(e) => {
            e.stopPropagation();
            downloadPdfFile();
          }}
        >
          <Button
            size="large"
            startIcon={<ArrowCircleDown />}
            variant="contained"
            sx={{ borderRadius: '8px' }}
          >
            دانلود فایل آپلود شده
          </Button>
        </Stack>
      ) : (
        <Grid container justifyContent="center" mb={2}>
          <iframe
            frameBorder="0"
            scrolling="no"
            width="70%"
            height="500"
            src={`${pdfDataUrl}#toolbar=0`}
          />
        </Grid>
      );
    }

    return imageUrl ? (
      <Box display="flex" justifyContent="center" alignItems="center">
        <img
          src={imageUrl}
          alt=""
          style={{
            maxWidth: '98%',
            height: '150px',
            objectFit: 'contain',
            borderRadius: '16px',
          }}
        />
      </Box>
    ) : null;
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        cursor: 'pointer',
        display: 'block',
        minHeight: 135,
        mt: 1,
        ...sx,
      }}
      onClick={handleFileUpload}
    >
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/jpeg,image/png,application/pdf"
        onChange={onImageChange}
      />

      {imageUrl && !loading ? (
        <>
          <Box display="flex" justifyContent="center" mb={1}>
            <Button
              color="error"
              variant="outlined"
              fullWidth={!!isMobile}
              startIcon={<Photo />}
              sx={{ borderRadius: 1, px: 2 }}
            >
              تغییر تصویر
            </Button>
          </Box>
          {renderUploadedContent()}
        </>
      ) : loading ? (
        <Box sx={{ py: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            m: 1,
            borderRadius: 1,
            border: `1px dashed ${theme.palette.divider}`,
            backgroundColor: 'common.white',
          }}
        >
          <Stack justifyContent="center" alignItems="center" p={2}>
            <Typography variant="h6" fontWeight="bold">
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {subTitle}
            </Typography>
            <Typography variant="caption" color="text.secondary" mt={1}>
              حداکثر حجم تا {MAX_FILE_SIZE_MB}
            </Typography>

            <Button
              variant="outlined"
              size="small"
              startIcon={<UploadFileIcon />}
              sx={{ mt: 2 }}
            >
              بارگذاری تصویر
            </Button>
          </Stack>
        </Box>
      )}

      {description && (
        <Box display="flex" justifyContent="center">
          <Typography variant="caption" color="info.main" p={2}>
            {description}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FileUploader;
