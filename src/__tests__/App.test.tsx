import { screen, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";

const getInputElements = () => {
  const rangeInput = screen.getByRole("slider", {
    name: /password length range slider/i,
  });
  const uppercaseCheckboxInput = screen.getByLabelText(
    /include uppercase characters/i
  );
  const lowercaseCheckboxInput = screen.getByLabelText(
    /include lowercase characters/i
  );
  const specialCharCheckboxInput = screen.getByLabelText(
    /include special characters/i
  );
  const numCharCheckboxInput = screen.getByLabelText(/include numbers/i);
  return [
    rangeInput,
    uppercaseCheckboxInput,
    lowercaseCheckboxInput,
    specialCharCheckboxInput,
    numCharCheckboxInput,
  ];
};

describe("App", () => {
  it("presents different settings / options to allow the user to generate password of various lengths and of different complexities", () => {
    render(<App />);
    const [
      rangeInput,
      uppercaseCheckboxInput,
      lowercaseCheckboxInput,
      specialCharCheckboxInput,
      numCharCheckboxInput,
    ] = getInputElements();
    const generatedPassword = screen.getByLabelText(
      /generated password value/i
    );

    expect(rangeInput).toBeInTheDocument();
    expect(uppercaseCheckboxInput).toBeInTheDocument();
    expect(lowercaseCheckboxInput).toBeInTheDocument();
    expect(specialCharCheckboxInput).toBeInTheDocument();
    expect(numCharCheckboxInput).toBeInTheDocument();
    expect(generatedPassword).toBeInTheDocument();
    //
    expect(rangeInput.getAttribute("min")).toBe("5");
    expect(rangeInput.getAttribute("max")).toBe("20");
    expect(rangeInput).toHaveValue("5");
    //
    expect(lowercaseCheckboxInput).toBeChecked();
    expect(uppercaseCheckboxInput).not.toBeChecked();
    expect(specialCharCheckboxInput).not.toBeChecked();
    expect(numCharCheckboxInput).not.toBeChecked();
    //
    expect(generatedPassword.textContent).toHaveLength(5);
  });
  //
  it("adjusts generated password length based on current range input value", () => {
    render(<App />);
    const [rangeInput, _, lowercaseCheckboxInput] = getInputElements();
    const generatedPasswordElement = screen.getByLabelText(
      /generated password value/i
    );

    expect(lowercaseCheckboxInput).toBeChecked();
    expect(rangeInput).toHaveValue("5");
    expect(generatedPasswordElement.textContent).toHaveLength(5);
    fireEvent.change(rangeInput, { target: { value: 10 } });
    expect(rangeInput).toHaveValue("10");
    expect(generatedPasswordElement.textContent).toHaveLength(10);
  });
  //
  it("generates a password that includes lowercase characters only when the lowercase checkbox is checked (default state)", () => {
    render(<App />);
    const [
      rangeInput,
      uppercaseCheckboxInput,
      lowercaseCheckboxInput,
      specialCharCheckboxInput,
      numCharCheckboxInput,
    ] = getInputElements();
    const generatedPasswordElement = screen.getByLabelText(
      /generated password value/i
    );

    expect(lowercaseCheckboxInput).toBeChecked();
    expect(uppercaseCheckboxInput).not.toBeChecked();
    expect(specialCharCheckboxInput).not.toBeChecked();
    expect(numCharCheckboxInput).not.toBeChecked();
    expect(rangeInput).toHaveValue("5");
    expect(/^[a-z]{5}$/.test(generatedPasswordElement.textContent!)).toBe(true);
    expect(/[A-Z]/.test(generatedPasswordElement.textContent!)).toBe(false);
    expect(/[0-9]/.test(generatedPasswordElement.textContent!)).toBe(false);
    expect(
      /[!"#\$%&'\(\)\*\+,\-\.\/:;<=>\?@\[\\\]\^_`\{\|\}\~]/.test(
        generatedPasswordElement.textContent!
      )
    ).toBe(false);
  });
  //
  it("generates a password that includes uppercase characters only when the uppercase checkbox is checked", async () => {
    const user = userEvent.setup();
    render(<App />);
    const [
      rangeInput,
      uppercaseCheckboxInput,
      lowercaseCheckboxInput,
      specialCharCheckboxInput,
      numCharCheckboxInput,
    ] = getInputElements();
    const generatedPasswordElement = screen.getByLabelText(
      /generated password value/i
    );
    expect(rangeInput).toHaveValue("5");

    await user.click(lowercaseCheckboxInput);
    expect(lowercaseCheckboxInput).not.toBeChecked();
    expect(generatedPasswordElement.textContent).toHaveLength(0);

    await user.click(uppercaseCheckboxInput);
    expect(uppercaseCheckboxInput).toBeChecked();
    expect(specialCharCheckboxInput).not.toBeChecked();
    expect(numCharCheckboxInput).not.toBeChecked();

    expect(/[a-z]/.test(generatedPasswordElement.textContent!)).toBe(false);
    expect(/^[A-Z]{5}$/.test(generatedPasswordElement.textContent!)).toBe(true);
    expect(/[0-9]/.test(generatedPasswordElement.textContent!)).toBe(false);
    expect(
      /[!"#\$%&'\(\)\*\+,\-\.\/:;<=>\?@\[\\\]\^_`\{\|\}\~]/.test(
        generatedPasswordElement.textContent!
      )
    ).toBe(false);
  });
  //
  it("generated a password that includes special characters only when the special characters checkbox is checked", async () => {
    const user = userEvent.setup();
    render(<App />);

    const [
      rangeInput,
      uppercaseCheckboxInput,
      lowercaseCheckboxInput,
      specialCharCheckboxInput,
      numCharCheckboxInput,
    ] = getInputElements();
    const generatedPasswordElement = screen.getByLabelText(
      /generated password value/i
    );
    expect(rangeInput).toHaveValue("5");
    await user.click(lowercaseCheckboxInput);
    expect(lowercaseCheckboxInput).not.toBeChecked();
    await user.click(specialCharCheckboxInput);
    expect(specialCharCheckboxInput).toBeChecked();
    expect(uppercaseCheckboxInput).not.toBeChecked();
    expect(numCharCheckboxInput).not.toBeChecked();
    //
    expect(/[a-z]/.test(generatedPasswordElement.textContent!)).toBe(false);
    expect(/[A-Z]/.test(generatedPasswordElement.textContent!)).toBe(false);
    expect(/[0-9]/.test(generatedPasswordElement.textContent!)).toBe(false);
    expect(
      /^[!"#\$%&'\(\)\*\+,\-\.\/:;<=>\?@\[\\\]\^_`\{\|\}\~]{5}$/.test(
        generatedPasswordElement.textContent!
      )
    ).toBe(true);
  });
  //
  it("generated a password that includes numeric characters only when the numbers checkbox is checked", async () => {
    const user = userEvent.setup();
    render(<App />);

    const [
      rangeInput,
      uppercaseCheckboxInput,
      lowercaseCheckboxInput,
      specialCharCheckboxInput,
      numCharCheckboxInput,
    ] = getInputElements();
    const generatedPasswordElement = screen.getByLabelText(
      /generated password value/i
    );
    expect(rangeInput).toHaveValue("5");
    await user.click(lowercaseCheckboxInput);
    expect(lowercaseCheckboxInput).not.toBeChecked();
    await user.click(numCharCheckboxInput);
    expect(numCharCheckboxInput).toBeChecked();
    expect(uppercaseCheckboxInput).not.toBeChecked();
    expect(specialCharCheckboxInput).not.toBeChecked();
    //
    expect(/[a-z]/.test(generatedPasswordElement.textContent!)).toBe(false);
    expect(/[A-Z]/.test(generatedPasswordElement.textContent!)).toBe(false);
    expect(/^[0-9]{5}$/.test(generatedPasswordElement.textContent!)).toBe(true);
    expect(
      /[!"#\$%&'\(\)\*\+,\-\.\/:;<=>\?@\[\\\]\^_`\{\|\}\~]/.test(
        generatedPasswordElement.textContent!
      )
    ).toBe(false);
  });
  //
  it("generates a password that includes at least one character type when all char-type checkboxes are checked", async () => {
    const user = userEvent.setup();
    render(<App />);
    const [
      rangeInput,
      uppercaseCheckboxInput,
      lowercaseCheckboxInput,
      specialCharCheckboxInput,
      numCharCheckboxInput,
    ] = getInputElements();
    const generatedPasswordElement = screen.getByLabelText(
      /generated password value/i
    );
    //
    fireEvent.change(rangeInput, { target: { value: 10 } });
    expect(rangeInput).toHaveValue("10");
    await user.click(uppercaseCheckboxInput);
    await user.click(specialCharCheckboxInput);
    await user.click(numCharCheckboxInput);
    expect(lowercaseCheckboxInput).toBeChecked();
    expect(numCharCheckboxInput).toBeChecked();
    expect(uppercaseCheckboxInput).toBeChecked();
    expect(specialCharCheckboxInput).toBeChecked();
    //
    expect(/[a-z]+/.test(generatedPasswordElement.textContent!)).toBe(true);
    expect(/[A-Z]+/.test(generatedPasswordElement.textContent!)).toBe(true);
    expect(/[0-9]+/.test(generatedPasswordElement.textContent!)).toBe(true);
    expect(
      /[!"#\$%&'\(\)\*\+,\-\.\/:;<=>\?@\[\\\]\^_`\{\|\}\~]+/.test(
        generatedPasswordElement.textContent!
      )
    ).toBe(true);
  });
  //
  it("generates an empty string when none of the checkboxes are checked", async () => {
    const user = userEvent.setup();
    render(<App />);
    const [rangeInput, _, lowercaseCheckboxInput] = getInputElements();
    const generatedPasswordElement = screen.getByLabelText(
      /generated password value/i
    );

    expect(rangeInput).toHaveValue("5");
    //
    await user.click(lowercaseCheckboxInput);
    expect(lowercaseCheckboxInput).not.toBeChecked();
    expect(generatedPasswordElement.textContent).toHaveLength(0);
    expect(generatedPasswordElement).toHaveTextContent("");
  });
});
