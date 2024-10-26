const getOptionLabel = (value, options) => {
  return options.find((opt) => opt.value === value).label;
};

export { getOptionLabel };
