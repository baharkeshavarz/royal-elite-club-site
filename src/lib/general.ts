import { ReadonlyURLSearchParams } from 'next/navigation';

// Fix the problem of cashing searchParams in useQuery
export const convertSearchParamsToArray = (
  searchParams: ReadonlyURLSearchParams,
) => {
  // Construct an object to hold the parameters
  const paramsObject: { [key: string]: string | string[] } = {};
  // Populate the object with parameters
  for (const [param, value] of searchParams.entries()) {
    if (paramsObject[param]) {
      // If the parameter already exists in the object, append the new value to its array
      paramsObject[param] = Array.isArray(paramsObject[param])
        ? [...paramsObject[param], value]
        : [paramsObject[param] as string, value];
    } else {
      // If the parameter doesn't exist yet, set its value as either a string or an array
      paramsObject[param] = value;
    }
  }

  return paramsObject;
};
