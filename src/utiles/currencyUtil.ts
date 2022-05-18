const formatUtil = (num: number | string | undefined) => {
  if (!num) {
    return 0;
  }
  const _num = num.toString().split(".");
  const integer = _num[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  return _num.length > 1 ? `${integer}.${_num[1]}` : integer;
};

const floatToFxiedUtil = (value: string | number, fixed: number) => {
  if (!value || !fixed) return;

  if (value?.toString()?.split(".")[1]) {
    return parseFloat(value.toString()).toFixed(fixed);
  }
  return parseFloat(value.toString()) || 0;
};

export { formatUtil, floatToFxiedUtil };
