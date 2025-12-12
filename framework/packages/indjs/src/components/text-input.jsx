
import React, { forwardRef } from 'react';

const TextInput = forwardRef(({
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
}, ref) => {
    const handleChange = (e) => {
        if (onChangeText) onChangeText(e.target.value);
    };

    const commonStyle = {
        appearance: 'none',
        backgroundColor: 'transparent',
        borderColor: 'black',
        borderWidth: 0,
        borderRadius: 0,
        padding: 0,
        borderStyle: 'solid',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
        fontSize: 14,
        outline: 'none',
        ...style
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
                style={{ ...commonStyle, resize: 'none' }}
                className={className}
                {...rest}
            />
        );
    }

    return (
        <input
            ref={ref}
            type={secureTextEntry ? 'password' : 'text'}
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
});

TextInput.displayName = 'TextInput';
export default TextInput;
