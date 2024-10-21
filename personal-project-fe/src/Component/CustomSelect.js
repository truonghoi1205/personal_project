import Select from "react-select";

function CustomSelect({
                          options,
                          onChange,
                          value,
                          placeholder = "Select...",
                          error,
                          isMulti = false,
                          className
                      }) {
    const handleChange = (selectedOption) => {
        if (isMulti) {
            onChange(selectedOption.map(option => option.value));
        } else {
            onChange(selectedOption ? selectedOption.value : null);
        }
    };

    return (
        <div className={`col-6 ${className}`}>
            <Select
                options={options}
                onChange={handleChange}
                value={isMulti
                    ? options.filter(option => value.includes(option.value))
                    : options.find(option => option.value === value) || null}
                placeholder={placeholder}
                isMulti={isMulti}
                classNamePrefix="react-select"
            />
            {error && <div className="text-danger mt-1">{error}</div>}
        </div>
    );
}

export default CustomSelect;
