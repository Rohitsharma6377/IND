import React, { forwardRef } from "react";

const TextInput = forwardRef(
  (
    {
      value,
      defaultValue,
      onChangeText,
      onFocus,
      onBlur,
      placeholder,
      secureTextEntry = false,
      multiline = false,
      numberOfLines = 4,
      editable = true,
      style,
      className,
      ...rest
    },
    ref,
  ) => {
    const handleChange = (e) => {
      if (onChangeText) onChangeText(e.target.value);
    };

    const commonStyle = {
      appearance: "none",
      outline: "none",
      boxSizing: "border-box",
      ...StyleSheet.flatten(style),
    };

    if (multiline) {
      return (
        <textarea
          ref={ref}
          defaultValue={defaultValue}
          value={value}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          readOnly={!editable}
          rows={numberOfLines}
          style={{ ...commonStyle, resize: "none" }}
          className={className}
          {...rest}
        />
      );
    }

    return (
      <input
        ref={ref}
        type={secureTextEntry ? "password" : "text"}
        defaultValue={defaultValue}
        value={value}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        readOnly={!editable}
        style={commonStyle}
        className={className}
        {...rest}
      />
    );
  },
);

TextInput.displayName = "TextInput";
export default TextInput;
