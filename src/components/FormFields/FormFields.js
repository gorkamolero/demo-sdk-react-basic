import React, { useState, useContext, useMemo, useEffect } from "react";
// import {useSpring, animated} from 'react-spring';
import styled from 'styled-components';
import Utils from '../../utils/Utils'
import './FormFields.css';
import { CSSTransition } from "react-transition-group";
import CustomHTML from "../CustomHTML/CustomHTML";
import { HbContent, HbInput, HbSelect, HbRadio, useBreakpoint, icons, HbCheckboxGroup, HbCheckbox, HbTag } from "../../visly";
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

const FlexLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

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




const Select = ({field, title, onChangeHandler, size}) => {
  const [options] = useState(() => field.getOptions().map((op) => ({ value: op.id, label: op.title })))

  const meta = field.getMeta()

  const [selected, setSelected] = React.useState(() => {
    if (meta.default) return { value: "0", label: meta.default }
    else return options[0]
  });
  
  /* eslint-disable*/
  React.useEffect(() => {
    onChangeHandler(selected.value, field)
  }, [selected, field], onChangeHandler)
  /* eslint-enable */

  return (
    <FlexBox column alignItems="center" justifyContent="flex-start">
      {title}

      <HbSelect
        onSelect={(option) => {
          const selected = options.find((op) => op.value === option);
          setSelected(selected);
          onChangeHandler(selected.value, field);
        }}
        HbUnselected={selected.value === "0"} // eslint-disable-line eqeqeq
        selected={selected.value}
        label={selected.label}
        size={size}
      >
        {
          meta.default && (
            <HbSelect.Option selected value="0" label={meta.default} />
          )
        }
        {options.map((o) => {
          return (
            <HbSelect.Option disabled={o.value === "0"} key={o.value + o.label} value={o.value} label={o.label} /> // eslint-disable-line eqeqeq
          );
        })}
      </HbSelect>

      {meta && meta.helperTxt && <HbHelperTxt>{meta.helperTxt}</HbHelperTxt>}
    </FlexBox>
  );
};

const SelectMulti = ({field, title, onChangeHandler, size}) => {
  const meta = field.getMeta()

  const [options] = useState(() => {
    let opts = field.getOptions()
    if (typeof field.getOptions === 'string') opts = opts.split(',')
    opts = opts.map(
      (op) => ({ value: op.id, label: op.title })
    )
    // if (meta.default) opts.unshift({ value: 0, label: meta.default })
    return opts
  })

  const [selected, setSelected] = React.useState(() => field.getValue() ? field.getValue() : []);

  const toggleSelected = value => selected.includes(value)
    ? setSelected(selected.filter(val => val !== value))
    : setSelected([...selected, value])

  /* eslint-disable */
  useEffect(() => onChangeHandler(selected, field), [selected])
  /* eslint-enable */

  // const label = options.find(op => op.value == 0) ? options.find(op => op.value == 0).label : '' // eslint-disable-line eqeqeq

  console.log('YOLO', selected)
  return (
    <FlexBox gap={20} column alignItems="center" justifyContent="flex-start">
      {title}

      {
        selected.length > 0 && (
          <FlexBox gap={10}>
            {selected.map((o, i) => (
              <CSSTransition
                in={true}
                timeout={200}
                classNames="collapse-after"
                unmountOnExit
                mountOnEnter
                key={o + i}
              >
                <HbTag
                  tagText={options.find(op => op.value === o).label}
                  HbOnlyIconButton={
                    <HbTag.HbOnlyIconButton
                      onPress={() => setSelected(selected.filter(o2 => o2 !== o))}
                    />}
                />
              </CSSTransition>
            ))}
          </FlexBox>
        )
      }

      <HbSelect
        onSelect={(option) => toggleSelected(option)}
        HbUnselected={true}
        // selected={selected.value}
        label={meta.default && meta.default}
        size={size}
      >
        {options.map((o, i) => {
          return (
            <HbSelect.Option disabled={o.value === "0"} key={o.value + i} value={o.value} label={o.label} />
          );
        })}
      </HbSelect>

      {meta && meta.helperTxt && <HbHelperTxt>{meta.helperTxt}</HbHelperTxt>}
    </FlexBox>
  );
};

const Input = ({field, title, onChangeHandler, size}) => {
  const [value, setValue] = useState(() => field.getValue());
  const meta = field.getMeta();

  return (
    <>
      {title}
      <HbInput
        value={value}
        onChange={(value) => {
          setValue(value);
          onChangeHandler(value, field);
        }}
        placeholder={meta.placeholder || ""}
        size={size}
        style={{ width: 'auto', margin: '0 10px' }}
      >
        { meta.units && <span>{meta.units}</span> }
      </HbInput>
    </>
  );
};

const RadioWithImages = ({field, title, onChangeHandler, size}) => {
  const [selected, setSelected] = useState(() => field.getValue());
  const options =  field.getOptions()
  const meta = field.getMeta();

  return (
    <>
      {meta.showTitle && <label style={{ marginBottom: 20 }}>{title}</label>}
      <HbRadio
        selected={selected}
        onSelect={(id) => {
          onChangeHandler(id, field);
          setSelected(id);
        }}
        HbRadioColumn={!meta.radioRow}
        size={size}
        className="hbRadio"
      >
        {options.map(({ id, title, image: icon }) => (
          <HbRadio.Button
            key={id}
            fullWidth={!meta.row}
            value={id}
            title={title}
            icon={icons[icon]}
            size={size}
            column={meta.buttonColumn}
          />
        ))}
      </HbRadio>
    </>
  );
};

const CheckboxGroup = ({field, title, fieldValues, onChangeHandler, size}) => {
  const [values, setValues] = useState(() => field.getValue() ? field.getValue() : []);
  const toggleValue = value => values.includes(value)
    ? setValues(values.filter(val => val !== value))
    : setValues([...values, value])

  const meta = field.getMeta();
  const options = field.getOptions()

  /* eslint-disable */
  useEffect(() => onChangeHandler(values, field), [values])
  /* eslint-enable */
  
  return (
    <FlexBox column align="center">
      {meta.showTitle && <label style={{ marginBottom: 20 }}>{title}</label>}
      <FlexBox wrap justifyContent="center" gap="10px" style={{ maxWidth: '50ch' }}>
        {options.map(({ id, title, image: icon }) => {
          if (meta.customUncheckBox && id === 'none') return null
          return (
            <HbCheckboxGroup
              checked={values.includes(id)}
              key={id}
              value={id}
              HbIconButton={
                <HbCheckboxGroup.HbIconButton
                  onPress={() => {
                    toggleValue(id)
                  }}
                  text={title}
                  icon={icons[icon]}
                  noIcon={meta.noIcons}
                />
              }
              size={size}
              column={meta.buttonColumn}
            />
          )
        })}
      </FlexBox>
      {
        (meta.customUncheckBox) && (
          <FlexLabel style={{ marginTop: 20 }} onClick={() => setValues([])}>
            <HbCheckbox style={{ marginRight: 10 }} checked={values.length === 0} />
            {Utils.capitalize([...options].slice(-1).pop().title)}
          </FlexLabel>
        )
      }
    </FlexBox>
  );
};

/* // For later
const Checkbox = (type, ...props) => {
  if (type==='checkbox') {
      Element = (
        <label>
          {title}
          <input
            type="checkbox"
            checked={fieldValues[i]}
            onChange={(event) => onChangeHandler(event, field)}
          />
        </label>
      );
      return <h1>Hello</h1>
  } return null
}
 */
const FormField = ({field, i, onChangeHandler, size, fieldValues, fields, getFieldErrorClass = null}) => {
  const [isExpanded, setExpanded] = useState(field.isHidden() || true);
  const {slideModel, interpolate} = useContext(SlideContext)
  const [customAfterText, setCustomAfterText] = React.useState(null)

  // const anim = useSpring({opacity: 1, color: 'red'})
  
  const type = field.getType();
  const meta = field.getMeta();
  const multiple = (field.isMultiple && field.isMultiple()) || false;

  const title = meta.showTitle && field.getTitle() ? <CustomHTML className="title" html={Utils.capitalize(interpolate(field.getTitle()))} /> : null
  
  /* eslint-disable eqeqeq*/
  useEffect(() => {
    if (meta.follows) {
      const master = fields.find((f) => f.id === meta.follows);
      if (meta.sequence) {
        field.setHidden(true)

        if (master.getValue() == 1) {
          if (meta.sequenceNumber == 1) {
            field.setHidden(false)
          }
        } else if ((master.getValue() > 1 && master.getValue() > meta.sequenceNumber) || meta.sequenceNumber == 'end') {
          field.setHidden(false)
        } 
      } else {
        field.setHidden(false)
      }

      if (meta.onlyShowIfFollowsAnswer) {
        // console.log('ERROR', master.getValue())
        field.setHidden(true)

        if (
          fieldValues[fields.indexOf(master)].includes(meta.onlyShowIfFollowsAnswer)
          || fieldValues[fields.indexOf(master)] === meta.onlyShowIfFollowsAnswer
        ) {
          field.setHidden(false)
        }
      }

      if (!master.isValid() || master.getValue() == 0) {
        // field.setHidden(true)
      }
    }

    setExpanded(!field.isHidden())

  }, [meta, fields, field, fieldValues, slideModel]);

  useEffect(() => {
    if (meta.canSingular && field.getValue() == 1) {
      setCustomAfterText(interpolate(meta.afterTxt.replace('s', '')))
    }
  }, [meta, field, interpolate])

  /* eslint-enable */

  const inputProps = useMemo(() => ({field, title, onChangeHandler, size}), [field, title, onChangeHandler, size])
  
  if (meta.hide) return null
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

          {
            meta.sequence && meta.sequenceText && fields[i - 1].getMeta().sequenceText
          }

          {meta.beforeTxt && (
            <>
              {interpolate(meta.beforeTxt)}
              <HbSpace />
            </>
          )}

          {
            type === 'checkbox' && (<h1>Hey</h1>)
          }

          {
            type === 'select' && (
              <>
                {
                  meta.multiple ? <SelectMulti {...inputProps} />
                  : <Select {...inputProps} />
                }
              </>
            )
          }
          {
            type === 'radio-group' && (
              <>
                {
                  multiple ? (
                    <>
                      {
                        (meta.tags) && <SelectMulti {...inputProps} />
                      }
                      {
                        (meta.images || meta.noIcons) && <CheckboxGroup fieldValues={fieldValues} {...inputProps} />
                      }
                    </>
                  ) : <RadioWithImages {...inputProps} />
                }
              </>
            )
          }
          {
            !['checkbox', 'select', 'radio-group'].includes(type) && (
              <Input {...inputProps} />
            )
          }

          {meta.afterTxt && (
            <>
              <HbSpace />
              {interpolate(customAfterText || meta.afterTxt)}
            </>
          )}
        </HbFormElement>
      </CSSTransition>

      {meta.afterLine && (
        <small>
          {interpolate(meta.afterLine)}
        </small>
      )}
    </>
  );
}

function FormFields({ fields, showErrors }) {
    const { setTouched, touched } = useContext(SlideContext);
    const size = useBreakpoint("small", ["large", "large", "super"]);

    const getFieldValues = () => fields.map(field => field.getValue())

    const [fieldValues, setFieldValues] = React.useState(() => getFieldValues())
    
    // console.log('Values', fieldValues)

    const onChangeHandler = (event, field) => {
        const type = field.getType()

        if (type === 'checkbox') {
            field.setValue(event.target.checked);
        } else if (["select", "text", "radio-group", "number"].includes(type)) {
            const value = event;
            field.setValue(value);
        } else {
          field.setValue(event);
        }

        setFieldValues(getFieldValues());
        
        setTouched(touched + 1);
    };

    const getFieldErrorClass = (field) => {
        return showErrors && !field.isValid()?'invalid':'';
    };

    return (
      <HbContent style={size !== 'super' && { paddingTop: 80 }}>
        <HbFormElement wrap justifyContent="center">
          {fields.map((field, i) => (
            <FormField
              key={i}
              fieldValues={fieldValues}
              fields={fields}
              getFieldErrorClass={getFieldErrorClass}
              onChangeHandler={onChangeHandler}
              size={size}
              field={field}
              i={i}
            />
          ))}
        </HbFormElement>
      </HbContent>
    );
};

export default FormFields;