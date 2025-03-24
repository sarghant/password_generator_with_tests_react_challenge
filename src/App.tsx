import { useMemo, useState } from "react";
import { shuffle } from "lodash";

function getCharsOfTypes(
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

export default function App() {
  const [rangeInputValue, setRangeInputValue] = useState(5);
  const [uppercaseCheckboxValue, setUppercaseCheckboxValue] = useState(false);
  const [lowercaseCheckboxValue, setLowercaseCheckboxValue] = useState(true);
  const [specialCharCheckboxValue, setSpecialCharCheckboxValue] =
    useState(false);
  const [numCharCheckboxValue, setNumCharCheckboxValue] = useState(false);
  // Generated password
  const generatedPassword = useMemo<string>(() => {
    let pwStrArr = [];
    /******************/
    let charArr = getCharsOfTypes(
      uppercaseCheckboxValue,
      lowercaseCheckboxValue,
      numCharCheckboxValue,
      specialCharCheckboxValue
    );
    pwStrArr.push(...charArr);
    /****************/
    let loopLen = rangeInputValue - pwStrArr.length;
    for (let i = 0; i < loopLen; i++) {
      charArr = getCharsOfTypes(
        uppercaseCheckboxValue,
        lowercaseCheckboxValue,
        numCharCheckboxValue,
        specialCharCheckboxValue
      );
      let j = i - charArr.length * Math.floor(i / charArr.length);
      pwStrArr.push(charArr[j]);
    }
    return shuffle(pwStrArr).join("");
  }, [
    rangeInputValue,
    uppercaseCheckboxValue,
    lowercaseCheckboxValue,
    specialCharCheckboxValue,
    numCharCheckboxValue,
  ]);
  return (
    <div className="container mx-auto mt-[200px]">
      <div className="w-[858px] h-[600px] bg-neutral-100 text-neutral-800 font-sans rounded-3xl shadow py-16 px-12 mx-auto">
        <h2 className="text-4xl font-bold mb-16">Password Generator</h2>
        <form>
          {/* Range input to determine generated password's strength */}
          <div className="flex flex-col gap-4 w-max">
            <div className="flex flex-col gap-2 w-max">
              <label>Password length: {rangeInputValue}</label>
              <input
                type="range"
                role="slider"
                aria-label="Password Length Range Slider"
                min={5}
                max={20}
                value={rangeInputValue}
                onChange={(e) => setRangeInputValue(+e.target.value)}
              />
            </div>
            {/* Varius toggles to determine password complexity */}
            <div className="flex gap-10">
              {/* Uppercase toggler */}
              <div className="flex gap-2">
                <label htmlFor="uppercaseCheckbox">
                  Include uppercase characters
                </label>
                <input
                  type="checkbox"
                  id="uppercaseCheckbox"
                  checked={uppercaseCheckboxValue}
                  onChange={() =>
                    setUppercaseCheckboxValue(!uppercaseCheckboxValue)
                  }
                />
              </div>
              {/* Lowercase toggler */}
              <div className="flex gap-2">
                <label htmlFor="lowercaseCheckbox">
                  Include lowercase characters
                </label>
                <input
                  type="checkbox"
                  id="lowercaseCheckbox"
                  checked={lowercaseCheckboxValue}
                  onChange={() =>
                    setLowercaseCheckboxValue(!lowercaseCheckboxValue)
                  }
                />
              </div>
            </div>
            <div className="flex gap-10">
              {/* Special char toggler */}
              <div className="flex gap-2">
                <label htmlFor="specialCharCheckbox">
                  Include special characters
                </label>
                <input
                  type="checkbox"
                  id="specialCharCheckbox"
                  checked={specialCharCheckboxValue}
                  onChange={() =>
                    setSpecialCharCheckboxValue(!specialCharCheckboxValue)
                  }
                />
              </div>
              {/* Num char toggler */}
              <div className="flex gap-2">
                <label htmlFor="numCharCheckbox">Include numbers</label>
                <input
                  type="checkbox"
                  id="numCharCheckbox"
                  checked={numCharCheckboxValue}
                  onChange={() =>
                    setNumCharCheckboxValue(!numCharCheckboxValue)
                  }
                />
              </div>
            </div>
            {/* Generated password */}
            <div>
              <span className="font-bold">Generated password:</span>{" "}
              <span aria-label="Generated Password Value">
                {generatedPassword}
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
