export const formatCurrency = (value: number) => `$${value.toFixed(2)}`
export const clampText = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max).trim()}...` : text
