import moment from 'jalali-moment';

export const dateConvertorRenderer = (
  dateInput: string,
  format = 'YYYY/MM/DD',
) => {
  let dateTime: string = dateInput;
  if (!dateTime) {
    return 'N/A';
  }
  dateTime = dateTime.replace(' +03:30', '').replace(' ', 'T');

  if (!dateTime.endsWith('Z')) {
    dateTime += 'Z';
  }

  const jalali = moment(dateTime).locale('fa').format(format);

  return jalali;
};

export const numberConverterRenderer = (val: number) => {
  const value = +val || 0;
  return value.toLocaleString();
};
