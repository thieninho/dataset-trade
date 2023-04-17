import { useState } from "react";
import "./formInput.css";
const FormInputRegis = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label className="label__input">{label}</label>
      <input className="input__input123"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span className="error__mess">{errorMessage}</span>
    </div>
  );
};

export default FormInputRegis;