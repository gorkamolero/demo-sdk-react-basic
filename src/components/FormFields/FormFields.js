import React, { useState } from 'react';
import './FormFields.css'
import CustomHTML from "../CustomHTML/CustomHTML";
import Utils from '../../utils/Utils'

function FormFields({fields, showErrors}) {
    const getFieldValues = () => {
        return fields.map( field => field.getValue() );
    };

    const [fieldValues, setFieldValues] = useState(getFieldValues());

    const onChangeHandler = (event, field) => {
        if (field.getType()==='checkbox') {
            field.setValue(event.target.checked);
        } else {
            field.setValue(event.target.value);
        }

        setFieldValues(getFieldValues());
    };

    const getFieldErrorClass = (field) => {
        return showErrors && !field.isValid()?'invalid':'';
    };

    const fieldsComp = fields.map( (field,i) => {
        const type = field.getType();
        console.log(field)

        const title = <CustomHTML className="title" html={field.getTitle()} />

        let el;
        if (type==='checkbox') {
            el = (
                <label>
                    {title}
                    <input type="checkbox" checked={fieldValues[i]} onChange={ (event) => onChangeHandler(event, field) }  />
                </label>
            );
        } else if (type === 'select') {
            const options = Utils.getMultiOptions(field.data.options)
            el = (
                <>
                    {title}
                    <select onChange={(event) => onChangeHandler(event, field)} name={field.getTitle()} id={field.getId()}>
                        {options.map(({ id, value }) => (
                            <option value={id}>{value}</option>
                        ))}
                    </select>
                </>
            )
        } else if (type === 'radio-group') {
            const options = Utils.getMultiOptions(field.data.options)
            el = (
                <>
                    {title}
                    <div name={field.getTitle()} id={field.getId()}>
                        {options.map(({ id, value }) => (
                            <label>
                                <input
                                    type="radio"
                                    name={id}
                                    value={value}
                                    checked={fieldValues[i]}
                                    className="form-check-input"
                                    onChange={(event) => onChangeHandler(event, field)} 
                                />
                                {value}
                            </label>
                        ))}
                    </div>
                </>
            )
        } else {
            el = (
                <>
                    <label>
                        {title}
                    </label>
                    <input type="text" value={fieldValues[i]} onChange={ (event) => onChangeHandler(event, field) }  />
                </>
            )
        }

        return (
            <li key={i} className={`${field.getType()} ${getFieldErrorClass(field)}`}>
                {el}
            </li>);
    });

    return (
        <ul className="form-fields">
            {fieldsComp}
        </ul>
    );
}

export default FormFields;