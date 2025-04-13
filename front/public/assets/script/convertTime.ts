
// Converte de "HH:mm" para timestamp
export const convertToTimestamp = (input: string): number => {
  const [hours, minutes] = input.split(':').map(Number);
  return hours * 3600 + minutes * 60 + 59;
};

// Converte de timestamp para "HH:mm"
export const convertToTimeString = (input: number): string => {
  const hours = Math.floor(input / 3600);
  const minutes = Math.floor((input % 3600) / 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};
