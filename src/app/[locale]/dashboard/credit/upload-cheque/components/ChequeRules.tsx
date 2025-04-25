'use client';

import React, { useState } from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';

type RuleGroup = {
  title?: string;
  rules: string[];
};

const rules: RuleGroup[] = [
  {
    title: 'شرايط ثبت چك',
    rules: [
      'چك در وجه بانك x ثبت شده باشد به كد شناسه x',
      'قبل از بارگذاری تصویر، چک صادر شده را در سامانه صیادی (پیچک) ثبت نمایید.',
      'تاریخ چک صیادی باید تاریخ همان روز ثبت در سامانه صیادی باشد.',
      'تاریخ چک را به عدد و حروف روی برگ چک در جای مناسب خود بنویسید.',
    ],
  },
  {
    title: 'مبلغ چك',
    rules: ['مبلغ چك صحيح و مطابق جدول ذيل باشد:'],
  },
  {
    title: 'شرايط فيزيكي چك',
    rules: [
      'چك صيادي جديد بنفش',
      'به نام و متعلق به متقاضي باشد',
      'چسب خوردگي نداشته باشد',
      'هايلايت نداشته باشد',
      'از لاك غلط گير استفاده نشود',
      'برگه چك پارگي نداشته باشد',
      'عناصر چاپي برگه چك مخدوش نباشد',
      'عناصر چاپي برگه چك كمرنگ نباشد',
      '* عناصر چاپي شامل: شناسه صيادي، شماره چك، كدملي صاحب چك، نام صاحب چك و...',
    ],
  },
  {
    title: 'آدرس و کد پستی',
    rules: [
      'چک ضمانت صادر شده خود را در پاکت مناسب به آدرس تهران تحویل نمایید. روی پاکت عبارت رویال الیت نوشته شود. /کدپستی: 1234567890',
    ],
  },
];

const GroupedRulesAccordion = () => {
  const [expanded, setExpanded] = useState<number | false>(0); // default open first

  const handleChange =
    (panelIndex: number) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panelIndex : false);
    };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography mb={2} variant="subtitle1">
        لطفاً به نکات زیر توجه کنید:
      </Typography>
      {rules.map((group, index) => (
        <Accordion
          key={index}
          expanded={expanded === index}
          onChange={handleChange(index)}
          disableGutters
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#f5f5f5',
              px: 2,
              py: 1,
            }}
          >
            <Typography fontWeight="bold" variant="subtitle1">
              {group.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, py: 2 }}>
            {group.rules.map((rule, i) => (
              <Typography
                key={i}
                variant="body2"
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1,
                  mb: 1.2,
                  color: 'text.secondary',
                }}
              >
                <CheckIcon color="success" fontSize="small" sx={{ mt: 0.3 }} />
                {rule}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default GroupedRulesAccordion;
