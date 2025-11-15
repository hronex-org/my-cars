export const formatDate = (isoDate: string): string => {
  if (!isoDate) return 'N/A';
  const [year, month, day] = isoDate.split('-');
  return `${day}. ${month}. ${year}`;
};
