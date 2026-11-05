/**
 * Unidad de impacto de Fikir: días de comida y atención médica para un niño.
 *
 * Datos de partida (facilitados por Fikir):
 * - 8 € cubren la alimentación y la asistencia sanitaria de un niño durante un mes.
 * - ~30% del precio sin IVA es beneficio neto, que se reinvierte al 100%.
 * - El café lleva un IVA del 10%.
 *
 * Con una bolsa de 14,99 €: 14,99 / 1,10 × 0,30 ≈ 4,09 € → ≈ 15 días.
 */
export const MONTHLY_COST_PER_CHILD = 8;
export const NET_PROFIT_SHARE = 0.3;
export const VAT_RATE = 0.1;
export const DAYS_PER_MONTH = 30;

export const DAILY_COST_PER_CHILD = MONTHLY_COST_PER_CHILD / DAYS_PER_MONTH;

/** Días de comida y atención médica que financia un importe pagado (IVA incluido). */
export function impactDaysFor(amountWithVat: number): number {
  if (!Number.isFinite(amountWithVat) || amountWithVat <= 0) return 0;
  const netProfit = (amountWithVat / (1 + VAT_RATE)) * NET_PROFIT_SHARE;
  return Math.floor(netProfit / DAILY_COST_PER_CHILD);
}

/** Días que financia una bolsa estándar de 250 g a 14,99 €. */
export const DAYS_PER_BAG = impactDaysFor(14.99);

export function formatImpactDays(days: number): string {
  return days === 1 ? "1 día" : `${days} días`;
}
