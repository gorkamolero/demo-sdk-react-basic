import React, { useState, useContext } from "react";
import './FormFields.css'
import CustomHTML from "../CustomHTML/CustomHTML";
import { HbContent, HbInput, HbSelect, HbRadio, useBreakpoint } from "visly";
import { FlexBox } from "react-styled-flex";
import { SlideContext } from "../../context/SlideContext";


const HbFormElement = ({children}) => {
    return (
        <FlexBox alignItems="baseline">
            {children}
        </FlexBox>
    )
}

function FormFields({fields, showErrors, validate}) {
    const { slideModel } = useContext(SlideContext);
    const size = useBreakpoint("small", ["large", "large", "super"]);

    const getFieldValues = React.useCallback(() => fields.map(field => field.getValue()), [fields])

    const [fieldValues, setFieldValues] = React.useState(() => getFieldValues())

    console.log('YOLO', fields)

    const onChangeHandler = (event, field) => {
        const type = field.getType()

        if (type === 'checkbox') {
            field.setValue(event.target.checked);
        } else if (["select", "text", "radio-group", "number"].includes(type)) {
            const value = event;
            field.setValue(value);

            // TODO: implementar método para desvalidar 
        } else {
            field.setValue(event.target.value);
        }

        setFieldValues(getFieldValues());
        
        if (field.getValue()) slideModel.validate();
    };

    const getFieldErrorClass = (field) => {
        return showErrors && !field.isValid()?'invalid':'';
    };

    const fieldsComp = fields.map( (field,i) => {
        const type = field.getType();
        const meta = field.getMeta();
        
        const title = meta.showTitle && field.getTitle() ? <CustomHTML className="title" html={field.getTitle()} /> : null

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

        // If this fields follows another which is not valid:
        if (meta.follows) {
          const master = fields.find((f) => f.id === meta.follows);
          // console.log(field.getTitle(), fields.find((f) => f.id === meta.follows));
          if (!master.isValid() || master.getValue() == 0) return null; // eslint-disable-line eqeqeq
        }

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
        HbUnselected={selected.value == 0} // eslint-disable-line eqeqeq
        selected={selected.value}
        label={selected.label}
        size={size}
      >
        {options.map((o) => {
          return (
            <HbSelect.Option key={o.value} value={o.value} label={o.label} />
          );
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