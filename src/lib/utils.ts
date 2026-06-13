export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function rwf(amount: number): string {
  return `RWF ${amount.toLocaleString('en-US')}`
}
