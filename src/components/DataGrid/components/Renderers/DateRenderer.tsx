import { CustomCellRendererProps } from 'ag-grid-react';
import moment from 'jalali-moment';
import { FC, useMemo } from 'react';

const DateRenderer: FC<CustomCellRendererProps> = props => {
  const jalali = useMemo(() => {
    let dateTime: string = props.value;
    if (!dateTime) {
      return 'N/A';
    }
    dateTime = dateTime.replace(' +03:30', '').replace(' ', 'T');

    if (!dateTime.endsWith('Z')) {
      dateTime += 'Z';
    }

    const jalali = moment(dateTime).locale('fa').format('YYYY/MM/DD');

    return jalali;
  }, [props.value]);

  return <div dir="ltr">{jalali}</div>;
};

export default DateRenderer;
