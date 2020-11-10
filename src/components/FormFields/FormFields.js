import React, { useState, useContext, useMemo, useEffect } from "react";
// import {useSpring, animated} from 'react-spring';
import styled from 'styled-components';
import Utils from '../../utils/Utils'
import './FormFields.css';
import { CSSTransition } from "react-transition-group";
import CustomHTML from "../CustomHTML/CustomHTML";
import { HbContent, HbInput, HbRadio, useBreakpoint, icons, HbCheckboxGroup, HbCheckbox, HbTag, HbIconButton } from "../../visly";
import { FlexBox } from "react-styled-flex";
import { SlideContext } from "../../context/SlideContext";
import ReactSelect from 'react-select'
import SelectStyles from './SelectStyles'

const HbFormElement = ({children, ...rest}) => {
  const fieldRef = React.useRef(null);
  // Scroll To Item
  useEffect(() => {
      if (fieldRef.current) {
        fieldRef.current.scrollIntoView({ behavior: "smooth" });
      }
  }, []);

  return (
    <FlexBox ref={fieldRef} {...rest} alignItems="baseline">
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

const Icon = ({ innerRef, innerProps }) => (
  <img alt="Dropdown" style={{ width: 18 }} src={icons.hbChevronDown} aria-label="Dropdown" ref={innerRef} {...innerProps} />
);

const Select = ({field, title, onChangeHandler, size}) => {
  const [options, setOptions] = useState(() => field.getOptions().map((op) => ({ value: op.id, label: op.title })))
  const meta = field.getMeta()
  const [selected, setSelected] = React.useState(() => {
    if (field.getValue()) {
        return options.find(op => op.value === field.getValue())
    } else if (meta.defaultValue) {
        return options[0]
    }
  });

  useEffect(() => {
    if (meta.hungryYearSelect) {
      let years = []
      const year = new Date().getFullYear()
      for (let i = year; i >= year - meta.minValue; i--) {
        years.push({
          value: i.toString(),
          label: i
        })
      }
      setOptions(years)
    }
  }, [meta])

  /* eslint-disable*/
  React.useEffect(() => {
    if (selected) {
      onChangeHandler(selected.value, field)
    }
  }, [selected, field])
  /* eslint-enable */

  return (
    <FlexBox column alignItems="center" justifyContent="flex-start">
      {title}

      <ReactSelect onChange={setSelected} defaultValue={selected} isSearchable={true} placeholder={meta.default || 'Select...'} options={options} styles={SelectStyles} components={{ DropdownIndicator: Icon }}  min={meta.minSelect || false} />
    </FlexBox>
  )
}

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

  const [selected, setSelected] = React.useState(() => {
    let val = field.getValue()
    if (!val) return []
    if (typeof val === 'string') val = [val]
    return val
  });

  const toggleSelected = value => {
    if (selected.includes(value)) {
      setSelected(selected.filter(val => val !== value))
      field.removeValue(value)
      onChangeHandler(value, field)
    } else {
      setSelected([...selected, value])
      field.setValue(value)
      onChangeHandler(value, field)
    }
  }

  // const label = options.find(op => op.value == 0) ? options.find(op => op.value == 0).label : '' // eslint-disable-line eqeqeq

  return (
    <FlexBox gap={20} column alignItems="center" justifyContent="flex-start">
      {title}

      {
        selected.length > 0 && (
          <FlexBox gap={10}>
            {selected.map((o, i) => {
              const op = options.find(op => op.value === o)
              return (
              <CSSTransition
                in={true}
                timeout={200}
                classNames="collapse-after"
                unmountOnExit
                mountOnEnter
                key={o + i}
              >
                <HbTag
                  tagText={op && op.label? op.label : op}
                  HbOnlyIconButton={
                    <HbTag.HbOnlyIconButton
                      onPress={() => setSelected(selected.filter(o2 => o2 !== o))}
                    />}
                />
              </CSSTransition>
            )
            })}
          </FlexBox>
        )
      }

      <ReactSelect
        onChange={(option) => {
          toggleSelected(option.value)
        }}
        // defaultValue={selected}
        value={''}
        isSearchable={true}
        placeholder={selected.length > 0 ? 'Add more...' : 'Add...'}
        options={options}
        styles={SelectStyles}
        components={{ DropdownIndicator: Icon }} 
        min={meta.minSelect || false} />

      {meta && meta.helperTxt && <HbHelperTxt>{meta.helperTxt}</HbHelperTxt>}
    </FlexBox>
  );
};

const Input = ({field, title, onChangeHandler, size}) => {
  const [value, setValue] = useState(() => field.getValue());
  const meta = field.getMeta();
  const type = field.getType();

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
        inputProps={type ? {type} : {type: 'number'}}
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

  /* eslint-disable */
  useEffect(() => onChangeHandler(selected, field), [selected])
  /* eslint-enable */

  return (
    <>
      {meta.showTitle && <label style={{ marginBottom: 20, textAlign: 'center' }}>{title}</label>}
      <HbRadio
        selected={selected}
        onSelect={(id) => setSelected(id)}
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
  const [values, setValues] = useState(() => {
    let vals = field.getValue()
    // console.log('HERE', vals)

    if (vals.includes('none')) return ['none']

    return !vals ? [] : Array.isArray(vals) ? vals : vals.split(',')
  })

  const toggleValue = value => {

    values.includes(value)
    ? setValues(values.filter(val => val !== value))
    : setValues([...values.filter(val => val !== 'none'), value])
  }

  const meta = field.getMeta();
  const options = field.getOptions()

  /* eslint-disable */
  useEffect(() => {
    let valsForPickzen = values
    if (Array.isArray(values)) {
      valsForPickzen = [...new Set(valsForPickzen)]
      valsForPickzen = values.includes('none') ? 'none' : valsForPickzen.join(',')
    }

    // console.log(typeof valsForPickzen)
    onChangeHandler(valsForPickzen, field)
  }, [values])
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
                <HbIconButton
                  onPress={() => {
                    toggleValue(id)
                  }}
                  text={title}
                  icon={icons[icon]}
                  noIcon={meta.noIcons}
                  HbIconButtonSelected={values.includes(id)}
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
          <FlexLabel style={{ marginTop: 20 }} onClick={() => setValues(['none'])}>
            <HbCheckbox style={{ marginRight: 10 }} checked={values.includes('none')} />
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
  const [isExpanded, setExpanded] = useState(field.isHidden() || false);
  const {slideModel, interpolate} = useContext(SlideContext)
  const [customAfterText, setCustomAfterText] = React.useState(null)

  // const anim = useSpring({opacity: 1, color: 'red'})

  const type = field.getType();
  const meta = field.getMeta();
  const multiple = (field.isMultiple && field.isMultiple()) || false;

  // TODO: bug interpolate
  const title = meta.showTitle && field.getTitle() ? <CustomHTML className="title" html={Utils.capitalize(field.getTitle())} /> : null
  
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
      }

      if (!meta.sequence && !meta.onlyShowIfFollowsAnswer) {
        if (!master.isValid() || !master.getValue()) {
          field.setHidden(true)
        }

        if (master.isValid() || master.getValue()) {
          field.setHidden(false)
        }

        if (master.getType() === 'radio-group' && master.getValue().length < 1) {
          field.setHidden(true)
        }
      }
    }

    setExpanded(!field.isHidden())

  }, [meta, fields, field, fieldValues, slideModel]);

  /* eslint-enable */

  /* eslint-disable eqeqeq*/
  useEffect(() => {
    if (meta.canSingular && field.getValue() == 1) {
      setCustomAfterText(interpolate(meta.afterTxt.replace('s', '')))
    } else {
      setCustomAfterText(meta.afterTxt)
    }
  }, [meta, setCustomAfterText, interpolate, field])

  const inputProps = useMemo(() => ({field, title, onChangeHandler, size}), [field, title, onChangeHandler, size])
  
  if (meta.hide || !isExpanded) return null
  return (
    <>
      {meta.newLine && <HbBreakLine className="newLine" />}
        <HbFormElement
          className={`${field.getType()} ${getFieldErrorClass(field)}`}
          style={{
            marginTop: size === 'small' ? 10 : 20,
            marginBottom: size === 'small' ? 10 : 20,
            ...(meta.newLine && { marginTop: 20, marginBottom: 20 }),
            // ...(meta.column && { flex: 1 })
            ...(meta.column && { alignItems: "center" }),
            ...(size === "small" && { flexWrap: "nowrap" }),
          }}
          column={meta.column}
          alignItems={meta.column && "center"}
          data-follows={meta.follows ? meta.follows : ''}
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

          { type === 'checkbox' && (<h1>Hey</h1>) }

          { type === 'select' && <Select {...inputProps} />}
          {/*
            <>
              {
                meta.multiple ? <SelectMulti {...inputProps} />
                : <Select2 {...inputProps} />
              }
            </>
          */}
          
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

      {meta.afterLine && (
        <>
          <HbBreakLine className="newLine" />
          <small style={{ marginBottom: 20 }}>
            {interpolate(meta.afterLine)}
          </small>
        </>
      )}
    </>
  );
}

function FormFields({ children, fields, showErrors }) {
      
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
            // console.log(field.getType(), value)
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

        { children }
      </HbContent>
    );
};

export default FormFields;