'use client';

import { useState } from 'react';
import { Box, Typography, Stack, Grid } from '@mui/material';
import FileUploader from '@/components/common/FileUploader';
import { ButtonWithLoading } from '@/components/ButtonWithLoading';
import { useRouter } from 'next/navigation';
import { DEFAULT_DASHBOARD_GET_CREDI_UPLOAD_CHEQUE } from '@/constants/routes';

const uploadFields = [
  {
    id: 1,
    title: 'تصویر صفحه اول شناسنامه',
    subtitle: 'فرمت‌های قابل قبول: JPG, PNG, PDF',
  },
  {
    id: 2,
    title: 'تصویر کارت ملی',
    subtitle: 'فرمت‌های قابل قبول: JPG, PNG, PDF',
  },
  {
    id: 3,
    title: 'تصویر کارت ملی',
    subtitle: 'فرمت‌های قابل قبول: JPG, PNG, PDF',
  },
  {
    id: 4,
    title: 'تصویر کارت ملی',
    subtitle: 'فرمت‌های قابل قبول: JPG, PNG, PDF',
  },
];

const UploadDocuments = () => {
  const router = useRouter();
  const [files, setFiles] = useState<{ [key: string]: any }>({});
  const handleFileChange = (id: number, file: any) => {
    setFiles((prev) => ({ ...prev, [id]: file }));
  };

  const onSubmit = () => {
    router.push(DEFAULT_DASHBOARD_GET_CREDI_UPLOAD_CHEQUE);
  };

  return (
    <Box my={2}>
      <Grid
        container
        spacing="2"
        display="flex"
        justifyContent="center"
        justifyItems="center"
      >
        <Grid item xs={12} sm={3}>
          <Stack spacing={2}>
            <img
              src="/assets/images/dashboard/credits/upload-docs.jpg"
              alt="آپلود مدارک شغلی"
              style={{
                maxWidth: '100%',
                objectFit: 'contain',
                borderRadius: '16px',
              }}
            />
            <Stack spacing={1} textAlign="center">
              <Typography variant="h5" fontWeight="bold">
                بارگذاری مدارک شناسایی
              </Typography>
              <Typography variant="caption" color="text.secondary">
                تصاویر ارسالی باید خوانا و واضح باشد.
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={9}>
          <Grid container>
            {uploadFields.map((field) => (
              <Grid item xs={12} sm={6} key={field.id}>
                <FileUploader
                  title={field.title}
                  subTitle={field.subtitle}
                  setFile={(file: any) => handleFileChange(field.id, file)}
                  sx={{ height: '100%' }}
                  description=""
                />
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center">
            <ButtonWithLoading
              variant="contained"
              sx={{ mt: 3, color: 'common.white' }}
              onClick={onSubmit}
            >
              ثبت و ادامه
            </ButtonWithLoading>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UploadDocuments;
