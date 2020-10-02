import React, { useState, useContext } from "react";
import styled from 'styled-components';
import './FormFields.css';
import { CSSTransition } from "react-transition-group";
import CustomHTML from "../CustomHTML/CustomHTML";
import { HbContent, HbInput, HbSelect, HbRadio, useBreakpoint } from "visly";
import { FlexBox } from "react-styled-flex";
import { SlideContext } from "../../context/SlideContext";


const HbFormElement = ({children, ...rest}) => {
    return (
        <FlexBox {...rest} alignItems="baseline">
            {children}
        </FlexBox>
    )
}

const HbHelperTxt = styled.small`
  font-size: 16px;
  font-style: italic;
  color: var(--hbTextColor);
  opacity: 80%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const HbBreakLine = styled.div`
  flex-basis: 100%;
  height: 0;
`;
const HbSpace = styled.div`
  &:before {
    content: " ";
    white-space: pre;
  }
`;




const Select = (field, title, onChangeHandler, size) => {
  const options = React.useMemo(() => {
    return field.getOptions().map((op) => ({ value: op.id, label: op.title }));
  }, [field]);

  const meta = field.getMeta()

  const [selected, setSelected] = React.useState(options[0]);

  React.useEffect(() => onChangeHandler(selected.value, field), []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FlexBox column alignItems="center" justifyContent="flex-start">
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

      {meta && meta.helperTxt && <HbHelperTxt>{meta.helperTxt}</HbHelperTxt>}
    </FlexBox>
  );
};

const Input = (field, title, onChangeHandler, size) => {
  const [value, setValue] = useState(field.getValue());
  const meta = field.getMeta();

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
      {meta.showTitle && <label style={{ marginBottom: 20 }}>{field.getTitle()}</label>}

      <HbRadio
        selected={selected}
        onSelect={(id) => {
          onChangeHandler(id, field);
          setSelected(id);
        }}
        HbRadioColumn={!meta.radioRow}
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

const FormField = ({field, i, onChangeHandler, size, fieldValues, fields, getFieldErrorClass, show = true}) => {
  const [isExpanded, setExpanded] = useState(show);
  const { Engine } = useContext(SlideContext)
  
  const type = field.getType();
  const meta = field.getMeta();

  const title = meta.showTitle && field.getTitle() ? <CustomHTML className="title" html={field.getTitle()} /> : null

  const interpolate = (txt) => txt.includes('%') ? Engine.interpolate(txt) : txt

  React.useEffect(() => {
    // If this fields follows another which is not valid:
    if (meta.follows) {
      const master = fields.find((f) => f.id === meta.follows);
      // eslint-disable-next-line eqeqeq
      if (!master.isValid() || master.getValue() == 0) {
        setExpanded(false);
      } else {
        setExpanded(true)
      }
    }

    // return () => setShowMe(false)
  }, [meta, fields]);

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

  // Else
  return (
    <>
      {meta.newLine && <HbBreakLine className="newLine" />}
      <CSSTransition
        in={isExpanded}
        timeout={200}
        classNames="collapse"
        unmountOnExit
        mountOnEnter
      >
        <HbFormElement
          key={i}
          className={`${field.getType()} ${getFieldErrorClass(field)}`}
          // break={meta.newLine}
          style={{
            marginTop: 20,
            marginBottom: 20,
            ...(meta.newLine && { marginTop: 20, marginBottom: 20 }),
            // ...(meta.column && { flex: 1 })
            ...(meta.column && { alignItems: "center" }),
            ...(size === "small" && { flexWrap: "nowrap" }),
          }}
          column={meta.column}
          alignItems={meta.column && "center"}
        >
          {!meta.newLine && <HbSpace />}

          {meta.beforeTxt && (
            <>
              {interpolate(meta.beforeTxt)}
              <HbSpace />
            </>
          )}

          {typeof el === "function" ? el() : el}

          {meta.afterTxt && (
            <>
              <HbSpace />
              {interpolate(meta.afterTxt)}
            </>
          )}
        </HbFormElement>
      </CSSTransition>
    </>
  );
}

function FormFields({fields, showErrors, validate}) {
    const { slideModel, interpolate } = useContext(SlideContext);
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

            // TODO: implementar método para desvalidar 
        } else {
            field.setValue(event.target.value);
        }

        setFieldValues(getFieldValues());
        
        if (field.getValue()) {
          slideModel.validate();
          console.log("Evaluating", slideModel);
        }
    };

    const getFieldErrorClass = (field) => {
        return showErrors && !field.isValid()?'invalid':'';
    };

    return (
      <HbContent style={size !== 'super' && { paddingTop: 80 }}>
        <HbFormElement wrap justifyContent="center" flex>
          {fields.map((field, i) => (
            <FormField
              fieldValues={fieldValues}
              fields={fields}
              getFieldErrorClass={getFieldErrorClass}
              onChangeHandler={onChangeHandler}
              size={size}
              field={field}
              i={i}
              interpolate={interpolate}
            />
          ))}
        </HbFormElement>
      </HbContent>
    );
};

export default FormFields;