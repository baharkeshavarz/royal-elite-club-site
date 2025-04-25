import CheckroomIcon from '@mui/icons-material/Checkroom';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import ChairIcon from '@mui/icons-material/Chair';
import CountertopsIcon from '@mui/icons-material/Countertops';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import EvStationIcon from '@mui/icons-material/EvStation';
import CategoryIcon from '@mui/icons-material/Category';
import { SvgIconComponent } from '@mui/icons-material';

const useCategoriesMapper = () => {
  const mapper: {
    title: string;
    icon: SvgIconComponent;
    category: string;
  }[] = [
    {
      title: 'لوازم خانگی',
      icon: MapsHomeWorkIcon,
      category: '1801',
    },
    {
      title: 'موبایل و لوازم دیججیتال',
      icon: PhonelinkIcon,
      category: '1802',
    },
    {
      title: 'پوشاک',
      icon: CheckroomIcon,
      category: '1803',
    },
    {
      title: 'سلامت، درمان و زیبایی',
      icon: MedicationLiquidIcon,
      category: '1804',
    },
    {
      title: ' فروشگاه های زنجیره ای و سوپرمارکت ',
      icon: StorefrontIcon,
      category: '1805',
    },
    {
      title: ' دکوراسیون منزل و مبلمان',
      icon: ChairIcon,
      category: '1806',
    },
    {
      title: 'گردشگری و سفر',
      icon: ConnectingAirportsIcon,
      category: '1807',
    },
    {
      title: 'خانه و آشپرخانه ',
      icon: CountertopsIcon,
      category: '1808',
    },
    {
      title: 'لپ تاپ و کامپیوتر',
      icon: ImportantDevicesIcon,
      category: '1809',
    },
    {
      title: 'لوازم جانبی لپ تاپ و کامپیوتر',
      icon: EvStationIcon,
      category: '1810',
    },
    {
      title: 'سایر ',
      icon: CategoryIcon,
      category: '1811',
    },
  ];

  return mapper;
};

export default useCategoriesMapper;
