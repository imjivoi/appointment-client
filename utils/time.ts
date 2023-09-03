export const getDayFromIsoString = (isoString: string) => {
  return isoString.split('T')[0]
}
