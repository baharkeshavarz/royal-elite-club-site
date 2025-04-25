import {
  DEFAULT_DASHBOARD_CARD_PATH,
  DEFAULT_DASHBOARD_COUPON_PATH,
  DEFAULT_DASHBOARD_MY_COUPON_PATH,
  DEFAULT_DASHBOARD_MY_TICKET,
  DEFAULT_DASHBOARD_PATH,
  DEFAULT_DASHBOARD_PROFILE_PATH,
  DEFAULT_DASHBOARD_TRANSACTION_PATH,
} from '@/constants/routes';
import {
  IconCash,
  IconDiscount,
  IconLayoutDashboard,
  IconSettings,
  IconTicket,
  IconTransactionDollar,
} from '@tabler/icons-react';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'منوهای کاربر',
  },

  {
    id: 1,
    title: 'داشبورد',
    icon: IconLayoutDashboard,
    href: DEFAULT_DASHBOARD_PATH,
  },

  {
    navlabel: true,
    subheader: 'حساب کاربری',
  },
  {
    id: 2,
    title: 'پروفایل من',
    icon: IconSettings,
    href: DEFAULT_DASHBOARD_PROFILE_PATH,
  },
  {
    navlabel: true,
    subheader: 'مدیریت حساب',
  },
  {
    id: 4,
    title: 'تراکنش های من ',
    icon: IconTransactionDollar,
    href: DEFAULT_DASHBOARD_TRANSACTION_PATH,
  },
  {
    id: 5,
    title: 'کارت های بانکی من',
    icon: IconCash,
    href: DEFAULT_DASHBOARD_CARD_PATH,
  },
  {
    id: 6,
    title: ' دریافت کد تخفیف',
    icon: IconDiscount,
    href: DEFAULT_DASHBOARD_COUPON_PATH,
  },
  {
    id: 7,
    title: 'لیست کدهای تخفیف  من',
    icon: IconDiscount,
    href: DEFAULT_DASHBOARD_MY_COUPON_PATH,
  },
  {
    id: 8,
    title: 'درخواست پشتیبانی',
    icon: IconTicket,
    href: DEFAULT_DASHBOARD_MY_TICKET,
  },
  // {
  //   id: 9,
  //   title: 'درخواست اعتبار ',
  //   icon: IconTicket,
  //   href: DEFAULT_DASHBOARD_GET_CREDIT,
  // },
];

export default Menuitems;
