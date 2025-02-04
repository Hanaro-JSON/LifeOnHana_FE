export function formatCurrency(amount: number): string {
  const isNegative = amount < 0;
  const absoluteAmount = Math.abs(amount);

  let formattedString = '';

  if (absoluteAmount >= 100000000) {
    const hMill = Math.floor(absoluteAmount / 100000000);
    const remainder = absoluteAmount % 100000000;
    formattedString = remainder
      ? `${hMill}억 ${formatCurrency(remainder)}`
      : `${hMill}억원`;
  } else if (absoluteAmount >= 10000000) {
    const tMill = Math.floor(absoluteAmount / 10000000);
    const remainder = absoluteAmount % 10000000;
    formattedString = remainder
      ? `${tMill}천 ${formatCurrency(remainder)}`
      : `${tMill}천만원`;
  } else if (absoluteAmount >= 10000) {
    const mill = Math.floor(absoluteAmount / 10000);
    const remainder = absoluteAmount % 10000;
    formattedString = remainder
      ? `${mill}만 ${formatCurrency(remainder)}`
      : `${mill}만원`;
  } else {
    formattedString = `${absoluteAmount}원`;
  }

  return isNegative ? `- ${formattedString}` : formattedString;
}
