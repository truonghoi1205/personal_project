import Select from "react-select";

function CustomSelect({ options, onChange, value, placeholder, error }) {
    return (
        <div className='col-6'>
            <Select
                options={options}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
            />
            {error && <div className="text-danger">{error}</div>}
        </div>
    );
}

export default CustomSelect;
