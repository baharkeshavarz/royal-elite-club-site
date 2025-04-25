import React, { FC, useMemo } from 'react';
import moment from 'jalali-moment';
import { CustomCellRendererProps } from 'ag-grid-react';

const DateTimeRenderer: FC<CustomCellRendererProps> = props => {
  const jalali = useMemo(() => {
    let dateTime: string = props.value;
    if (!dateTime) {
      return 'N/A';
    }
    dateTime = dateTime.replace(' +03:30', '').replace(' ', 'T');

    if (!dateTime.endsWith('Z')) {
      dateTime += 'Z';
    }

    const jalali = moment(dateTime).locale('fa').format('YYYY/MM/DD HH:mm');

    return jalali;
  }, [props.value]);

  return <div dir="ltr">{jalali}</div>;
};

export default DateTimeRenderer;
