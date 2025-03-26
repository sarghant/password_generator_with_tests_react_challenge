export function getCharsOfTypes(
  isUppercase: boolean,
  isLowercase: boolean,
  isNumeric: boolean,
  isSpecial: boolean
) {
  const uppercaseChar = isUppercase
    ? String.fromCharCode(65 + Math.ceil(Math.random() * 25))
    : "";
  const lowercaseChar = isLowercase
    ? String.fromCharCode(97 + Math.ceil(Math.random() * 25))
    : "";
  const numChar = isNumeric
    ? String.fromCharCode(48 + Math.ceil(Math.random() * 9))
    : "";
  const specialCharArr = [
    String.fromCharCode(32 + Math.ceil(Math.random() * 15)),
    String.fromCharCode(58 + Math.ceil(Math.random() * 6)),
    String.fromCharCode(91 + Math.ceil(Math.random() * 5)),
    String.fromCharCode(123 + Math.ceil(Math.random() * 3)),
  ];
  const specialChar = isSpecial
    ? specialCharArr[Math.floor(Math.random() * specialCharArr.length)]
    : "";
  return Array.from(
    uppercaseChar + lowercaseChar + numChar + specialChar
  ).filter(Boolean);
}
