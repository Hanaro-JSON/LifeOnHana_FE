//2024-01-13T12:30:00 -> 12:30
export const extractTimeWithRegex = (dateTime: string): string | null => {
  const match = dateTime.match(/T(\d{2}:\d{2})/);
  return match ? match[1] : null;
};
