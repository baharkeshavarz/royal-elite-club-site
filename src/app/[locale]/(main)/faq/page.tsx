'use client';

import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack, useTheme } from '@mui/material';
import Breadcrumb from '@/components/common/breadcrumb/DynamicBreadcrumbs';
import { BreadcrumbTypes } from '@/services/types/setting';
import { useTranslations } from 'next-intl';

// TODO: make this data to be multi language
const faqData = [
  {
    question: 'باشگاه رویال الیت چیست و چگونه کار می‌کند؟',
    answer:
      ' باشگاه رویال الیت یک پلتفرم تخفیفی دیجیتال است که اعضای آن (دارندگان کارت‌های بانکی) را به پذیرندگان (فروشگاه‌ها و ارائه‌دهندگان خدمات) متصل می‌کند. اعضای باشگاه با خرید از پذیرندگان عضو، به صورت خودکار و آنلاین از تخفیف برخوردار می‌شوند.',
  },
  {
    question: 'چگونه می‌توانم عضو باشگاه رویال الیت شوم؟',
    answer:
      'برای عضویت در رویال الیت، کافی است به بخش عضویت در سایت مراجعه نموده و اطلاعات را تکمیل کنید و سپس کارت بانکی خود را برای دریافت تخفیف‌های ویژه ثبت کنید.',
  },
  {
    question:
      'آیا برای عضویت در باشگاه رویال الیت نیاز به پرداخت هزینه‌ای دارم؟',
    answer:
      'عضویت در باشگاه رایگان است و شما بدون هزینه می‌توانید از مزایای تخفیفی باشگاه بهره‌مند شوید.',
  },
  {
    question: 'چگونه می‌توانم تخفیف‌های موجود را مشاهده کنم؟',
    answer:
      'پس از عضویت، می‌توانید لیست پذیرندگان و تخفیف‌های موجود را در وب‌سایت رویال الیت مشاهده کنید. همچنین تخفیفات ویژه به صورت دوره‌ای و از طریق نوتیفیکیشن یا پیامک به اطلاع شما خواهد رسید.',
  },
  {
    question: 'چگونه می‌توانم از تخفیف‌ها در خرید استفاده کنم؟',
    answer:
      'پس از ثبت کارت بانکی خود، هر بار که از یکی از پذیرندگان عضو باشگاه خرید کنید، تخفیف به صورت خودکار و آنلاین اعمال می‌شود و مبلغ نهایی کاهش می‌یابد.',
  },
  {
    question: 'آیا می‌توانم از چندین تخفیف به طور همزمان استفاده کنم؟',
    answer:
      '  بله، در صورتی که پذیرنده اجازه استفاده از چند تخفیف را بدهد، می‌توانید از تخفیف‌های باشگاه رویال الیت به همراه سایر تخفیف‌های موجود استفاده کنید',
  },
  {
    question: 'آیا پذیرندگان باشگاه رویال الیت در تمامی شهرها حضور دارند؟',
    answer:
      'رویال الیت با پذیرندگان مختلف در سراسر کشور همکاری دارد. لیست پذیرندگان و شهرهای فعال به‌طور مداوم در وب سایت به‌روزرسانی می‌شود.',
  },
  {
    question: 'باشگاه رویال الیت چگونه از تراکنش‌های من کارمزد دریافت می‌کند؟',
    answer:
      ' باشگاه رویال الیت به ازای هر تراکنش موفق که شامل تخفیف می‌شود، کارمزدی از پذیرنده دریافت می‌کند. این کارمزد بدون هزینه اضافی برای اعضای باشگاه است.',
  },
  {
    question: 'آیا اطلاعات کارت بانکی من امن است؟',
    answer:
      ' بله، رویال الیت از استانداردهای امنیتی بالا برای محافظت از اطلاعات بانکی و شخصی اعضا استفاده می‌کند و تمامی اطلاعات در بسترهای امن ذخیره و پردازش می‌شوند.',
  },
  {
    question:
      'چگونه می‌توانم به عنوان پذیرنده (فروشگاه یا ارائه‌دهنده خدمات) جدیدی در باشگاه مطرح شوم؟',
    answer:
      'شما می‌توانید از طریق بخش ثبت نام پذیرنده، پیشنهادات خود را برای همکاری با رویال الیت ارسال کنید. تیم ما در اسرع وقت پیشنهاد شما را بررسی خواهد کرد.',
  },
  {
    question:
      'اگر در استفاده از تخفیف‌ها با مشکلی مواجه شوم، چه کاری انجام دهم؟',
    answer:
      ' در صورت بروز هرگونه مشکل، می‌توانید با تیم پشتیبانی آنلاین ما با شماره تماس 09107550870  تماس بگیرید. تیم ما در اسرع وقت مشکل شما را پیگیری خواهد کرد.',
  },
  {
    question: 'چگونه می‌توانم حساب کاربری خود را لغو کنم؟',
    answer:
      ' شما می‌توانید از طریق تنظیمات حساب کاربری خود، درخواست لغو عضویت را ثبت کنید. عضویت شما در صورت تأیید درخواست لغو خواهد شد.',
  },
];

const FaqList = () => {
  const theme = useTheme();
  const t = useTranslations();

  return (
    <>
      <Breadcrumb capitalizeLinks bradCrumbType={BreadcrumbTypes.Navigation} />
      <Stack spacing={1} py={2}>
        {faqData.map((faq, index) => (
          <Accordion
            key={index}
            elevation={0}
            sx={{
              mb: 2,
              p: '0.2',
              border: '1px solid',
              borderColor: 'divider',
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{
                flexDirection: 'row-reverse',
                background: `linear-gradient(to right top, ${theme.palette.common.white}, ${theme.palette.grey[200]})`,
              }}
            >
              <Typography variant="subtitle1" component="div">
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: 'white' }}>
              <Typography variant="body1">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </>
  );
};

export default FaqList;
