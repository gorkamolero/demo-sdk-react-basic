import React, { useState } from 'react';
import './FormFields.css'
import CustomHTML from "../CustomHTML/CustomHTML";
import { HbContent, HbInput, HbSelect, HbRadio, useBreakpoint } from "visly";
import { FlexBox } from "react-styled-flex";

const HbFormElement = ({children}) => {
    return (
        <FlexBox alignItems="baseline">
            {children}
        </FlexBox>
    )
}

function FormFields({fields, showErrors, validate}) {
    const size = useBreakpoint("small", ["large", "large", "super"]);

    const getFieldValues = React.useCallback(() => fields.map(field => field.getValue()), [fields])

    const [fieldValues, setFieldValues] = React.useState(() => getFieldValues())

    const onChangeHandler = (event, field) => {
        const type = field.getType()

        if (type === 'checkbox') {
            field.setValue(event.target.checked);
        } else if (["select", "text", "radio-group", "number"].includes(type)) {
            const value = event;
            field.setValue(value);
        } else {
            field.setValue(event.target.value);
        }

        setFieldValues(getFieldValues());
        
        if (field.getValue()) validate();
    };

    const getFieldErrorClass = (field) => {
        return showErrors && !field.isValid()?'invalid':'';
    };

    const fieldsComp = fields.map( (field,i) => {
        const type = field.getType();
        const meta = field.getMeta();
        
        const title = !meta.hideTitle && field.getTitle() ? <CustomHTML className="title" html={field.getTitle()} /> : null

        let el;
        if (type==='checkbox') {
            el = (
              <label>
                {title}
                <input
                  type="checkbox"
                  checked={fieldValues[i]}
                  onChange={(event) => onChangeHandler(event, field)}
                />
              </label>
            );
        } else if (type === 'select') {
            el = Select(field, title, onChangeHandler, size)
        } else if (type === 'radio-group') {
            el = RadioWithImages(field, title, onChangeHandler, size)
        } else {
            el = Input(field, title, onChangeHandler, size)
        }

        if (meta.follows) {
        //   console.log(fields.find((f) => f.id === meta.follows));
          console.log(fields.find((f) => f.id === meta.follows).isValid());
        }

        // If this fields follows another which is not valid:
        if (meta.follows && !fields.find(f => f.id === meta.follows).isValid()) return null

        // Else
        return (
          <HbFormElement
            key={i}
            className={`${field.getType()} ${getFieldErrorClass(field)}`}
            break={meta.newLine}
          >
            {meta.beforeTxt && meta.beforeTxt}
            {typeof el === "function" ? el() : el}
            {meta.afterTxt && meta.afterTxt}
          </HbFormElement>
        );
    });

    return (
        <HbContent>
            {fieldsComp}
        </HbContent>
    );
}


const Select = (field, title, onChangeHandler, size) => {
  const options = React.useMemo(() => {
    return field.getOptions().map((op) => ({ value: op.id, label: op.title }));
  }, [field]);

  const [selected, setSelected] = React.useState(options[0]);

  React.useEffect(() => onChangeHandler(selected.value, field), []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {title}

      <HbSelect
        onSelect={(option) => {
          const selected = options.find((op) => op.value === option);
          setSelected(selected);
          onChangeHandler(selected.value, field);
        }}
        selected={selected.value}
        label={selected.label}
        size={size}
      >
        {options.map((o) => {
          return <HbSelect.Option key={o.value} value={o.value} label={o.label} />;
        })}
      </HbSelect>
    </>
  );
};

const Input = (field, title, onChangeHandler, size) => {
    const [value, setValue] = useState(field.getValue());
    const meta = field.getMeta()
    
    return (
      <div>
        {title}
        <HbInput
          value={value}
          onChange={(value) => {
            setValue(value);
            onChangeHandler(value, field);
          }}
          placeholder={meta.placeholder || ""}
          size={size}
        />
      </div>
    );
};

const RadioWithImages = (field, title, onChangeHandler, size) => {
    const [selected, setSelected] = useState(field.getValue());
    const options = field.getOptions();
    const meta = field.getMeta();

    return (
      <>
        {title}
        <HbRadio
          selected={selected}
          onSelect={(id) => {
            onChangeHandler(id, field);
            setSelected(id);
          }}
          HbRadioColumn={!meta.row}
          size={size}
        >
          {options.map(({ id, title, image: icon }) => (
            <HbRadio.Button
              key={id}
              fullWidth={!meta.row}
              value={id}
              title={title}
              icon={icon}
              size={size}
            />
          ))}
        </HbRadio>
      </>
    );
};

export default FormFields;