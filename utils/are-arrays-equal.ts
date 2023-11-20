export const areArraysEqual = <T>(arr1: T[], arr2: T[]) => {
  if (arr1.length !== arr2.length) {
    return false
  }

  const sortedArrStr1 = [...arr1].sort().toString()
  const sortedArrStr2 = [...arr2].sort().toString()

  return sortedArrStr1 === sortedArrStr2
}
