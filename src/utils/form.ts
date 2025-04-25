import { SubmitErrorHandler } from 'react-hook-form';

export const isAllNumbers = (input: string) => {
  if (!input) {
    return true;
  }

  // Regular expression to match any character that is not an English, Persian, or Arabic number
  const regex = /^[0-9\u06F0-\u06F9\u0660-\u0669]+$/;

  return regex.test(input);
};

export function getBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result as string);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  });
}

export const onInvalidSubmit: (
  scrollIntoFirstError?: boolean,
) => SubmitErrorHandler<any> = (scrollIntoFirstError = false) => {
  return (errors) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('🚀 ~ Fields Errors', errors);
    }

    if (scrollIntoFirstError) {
      const errorKeys = Object.keys(errors);
      if (errorKeys.length > 0) {
        const firstErrorKey = errorKeys[0];
        const firstErrorField = document.querySelector(
          `[name='${firstErrorKey}']`,
        );
        if (firstErrorField) {
          firstErrorField.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }
    }
  };
};
