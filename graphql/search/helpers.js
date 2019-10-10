export const pickFields = (obj, fields) => {
  return fields.reduce((acc, {key, use}) => {
    const value = obj[use || key];
    if (!value) {
      return acc;
    }
    return {
      ...acc,
      [key]: value,
    };
  }, {});
};
