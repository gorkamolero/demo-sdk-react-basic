import React, { useState, useContext, useMemo, useEffect, useRef } from "react";
import Utils from '../../utils/Utils'
import './FormFields.css';
import { CSSTransition } from "react-transition-group";
import CustomHTML from "../CustomHTML/CustomHTML";
import { HbContent, HbInput, HbRadio, useBreakpoint, icons, colors, HbCheckboxGroup, HbCheckbox, HbTag, HbIconButton } from "../../visly";
import { FlexBox, FlexItem } from "react-styled-flex";
import { SlideContext } from "../../context/SlideContext";
import ReactSelect from 'react-select'
import SelectStyles from './SelectStyles'
import { HbHelperTxt ,FlexLabel ,HbBreakLine , HbSpace} from '../../styles/StyledComps'
// import ConditionalWrap from 'conditional-wrap'
const year = new Date().getFullYear()
const HbFormElement = ({children,  doNotScroll, isFirstSlide, ...rest}) => {
  const fieldRef = React.useRef(null);
  // Scroll To Item
  useEffect(() => {
      if (fieldRef.current && !doNotScroll && !isFirstSlide) {
        console.log('FORM SCROLL');
        fieldRef.current.scrollIntoView({ behavior: "smooth" });
      }

      if (isFirstSlide && window) {
        console.log('FIRST')
        window.scrollTo(0, 0)
      }
  }, [doNotScroll, isFirstSlide]);

  return (
    <FlexBox ref={fieldRef} {...rest} alignItems="baseline">
      {children}
    </FlexBox>
  )
}

const Icon = ({ innerRef, innerProps }) => (
  <img alt="Dropdown" style={{ width: 18 }} src={icons.hbChevronDown} aria-label="Dropdown" ref={innerRef} {...innerProps} />
);

const Select = ({field, title, onChangeHandler, size, notValid}) => {
  const selectRef = useRef(null);
  const [options, setOptions] = useState(() => field.getOptions().map((op) => ({ value: op.id, label: op.title })))
  const meta = field.getMeta()
  const [selected, setSelected] = React.useState(() => {
    if (field.getValue()) {
      return options.find(op => op.value === field.getValue())
    } else if (meta.defaultValue) {
        return options[0]
    }
  });
  const [placeholder, setPlaceholder] = useState(() => meta && meta.default ? meta.default : 'Select...')
  const notSearchable = meta.notSearchable || false
  useEffect(() => {
    if (meta.hungryYearSelect) {
      let years = []
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
  useEffect(() => {
    if (selected) {
      onChangeHandler(selected.value, field)
      selectRef.current.select.setValue(selected)
    }
    // if (field.getValue())
  }, [selected, field])
  /* eslint-enable */

  
  useEffect(() => {
    if (!selected && field.getValue()) {
      setSelected(options.find(op => op.value === field.getValue()))
    }
  }, [options, field, selected])

  return (
    <FlexBox gap={10} column alignItems="center" justifyContent="flex-start" className={`selectContainer ${meta.notSearchable ? 'notSearchable' : ''} ${field.id ? `field-${field.id}` : ''}`}>
      {title}

      <ReactSelect
        onChange={setSelected}
        defaultValue={selected}
        isSearchable={!notSearchable}
        placeholder={placeholder}
        options={options}
        styles={SelectStyles}
        components={{ DropdownIndicator: Icon }} 
        min={meta.minSelect || false}
        onFocus={() => notSearchable || setPlaceholder('Start typing...')}
        ref={selectRef}
        // maxWidth={meta.maxWidth}
        // superMaxWidth={meta.superMaxWidth}
      />
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
    if (typeof val === 'string') val = val.split(',')
    return val
  });

  const toggleSelected = value => {
    if (selected.includes(value) || selected === 'value') {
      setSelected(selected.filter(val => val !== value))
      field.setValue(value)
    } else {
      setSelected([...selected, value])
      field.removeValue(value)
    }
    onChangeHandler(value, field)
  }
  // const label = options.find(op => op.value == 0) ? options.find(op => op.value == 0).label : '' // eslint-disable-line eqeqeq

  return (
    <FlexBox gap={20} column alignItems="center" justifyContent="flex-start">
      {title}

      {
        selected.length > 0 && (
          <FlexBox center wrap>
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
                  size={size}
                  tagText={op && op.label? op.label : op}
                  HbOnlyIconButton={
                    <HbTag.HbOnlyIconButton
                      onPress={() => toggleSelected(o)}
                      style={{ marginTop: 10 }}
                    />}
                  style={{ margin: 5 }}
                />
              </CSSTransition>
            )
            })}
          </FlexBox>
        )
      }

      {
        (selected.includes('none') || selected === 'none') || (
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
        )
      }

      {meta && meta.helperTxt && <HbHelperTxt>{meta.helperTxt}</HbHelperTxt>}
    </FlexBox>
  );
};

const Input = ({field, title, onChangeHandler, size, notValid}) => {
  const [value, setValue] = useState(() => field.getValue());
  const meta = field.getMeta();
  const type = field.getType();

  const notSoValid = () => {
    if (meta.max && value > meta.max) return true
    if (meta.maxlength && value.length > meta.maxlength) return true
    return false
  }
  const invalid = notSoValid()

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
        style={{ width: 'auto', margin: '0 10px', position: 'relative' }}
        inputProps={{
          type,
          ...(meta.max && { max: meta.max }),
          ...(meta.maxlength && { maxLength: meta.maxlength })
        }}
        className={`HbInput ${meta.helperText ? 'hasHelperText' : ''}`}
        notValid={invalid} 
      >
        { meta.units && <span>{meta.units}</span> }
        { ((meta.helperText && !meta.onlyShowHelperIfWrong)
          || (meta.helperText && meta.onlyShowHelperIfWrong && invalid)) &&  (
          <FlexBox center className="helperText">
            <FlexItem className="helperTextItem">
              <small style={{ color: invalid ? colors.red400 : 'inherit' }} className="newLineSmall">{ meta.helperText }</small>
            </FlexItem>
          </FlexBox>
        )}
      </HbInput>
    </>
  );
};

const RadioWithImages = ({field, title, onChangeHandler, size}) => {
  const [selected, setSelected] = useState(() => field.getValue());
  const options =  field.getOptions()
  const meta = field.getMeta();

  useEffect(() => {
    if (field.getValue()) {
      console.log(options)
      field.setValue(field.getValue())
    }
  })

  /* eslint-disable */
  useEffect(() => {
    if (selected) {
      console.log('selected', selected)
      onChangeHandler(selected, field)
    }
  }, [selected])
  /* eslint-enable */

  return (
    <>
      {meta.showTitle && <label style={{ marginBottom: 20, textAlign: 'center' }}>{title}</label>}
      <HbRadio
        selected={selected}
        onSelect={(id) => setSelected(id)}
        HbRadioColumn={!meta.radioRow || (size === 'small' && meta.buttonColumn)}
        size={size}
        className={`hbRadio RadioWithImages ${(size === 'small' && meta.buttonColumn) && 'buttonColumn'}`}
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
    <FlexBox column align="center" className="CheckboxGroup">
      {meta.showTitle && <label style={{ marginBottom: 20 }}>{title}</label>}
      <FlexBox wrap justifyContent="center" gap="10px" style={{ maxWidth: '50ch' }} className={`CheckboxButtonContainer ${meta.noIcons && 'tag-group'}`}>
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
const FormField = ({field, i, onChangeHandler, size, fieldValues, fields, getFieldErrorClass = null, notValid, isFirstSlide = false}) => {
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
          field.setHidden(true)

          if (
            master.getValue().includes(meta.onlyShowIfFollowsAnswer)
            || master.getValue() === meta.onlyShowIfFollowsAnswer
          ) {
            field.setHidden(false)
          } else { field.setHidden(true) }
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
          isFirstSlide={isFirstSlide}
          className={`HbFormElement HbFormElementChild ${field.getType()} ${getFieldErrorClass(field)} ${meta.mobileNewLine ? 'mobileNewLine' : ''}  ${meta.forceSameLine ? 'forceSameLine' : ''} ${meta.forceTogether ? 'forceTogether' : ''} ${meta.forceTogetherFirstElement ? 'forceTogetherFirstElement' : ''}`}
          style={{
            ...(meta.newLine && { marginTop: 20, marginBottom: 20 }),
            // ...(meta.column && { flex: 1 })
            ...(meta.column && { alignItems: "center" }),
            // ...(size === "small" && { flexWrap: "nowrap" }),
          }}
          column={meta.column}
          alignItems={meta.column && "center"}
          data-follows={meta.follows ? meta.follows : ''}
          wrap={!meta.forceTogether}
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

          { type === 'select' && <Select notValid={notValid} {...inputProps} />}
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
                        (meta.tags) && <SelectMulti notValid={notValid} class="SelectMulti" {...inputProps} />
                      }
                      {
                        (meta.images || meta.noIcons) && <CheckboxGroup notValid={notValid} className="CheckboxGroup" fieldValues={fieldValues} {...inputProps} />
                      }
                    </>
                  ) : <RadioWithImages notValid={notValid} className="RadioWithImages" {...inputProps} />
                }
              </>
            )
          }
          {
            !['checkbox', 'select', 'radio-group'].includes(type) && (
              <Input notValid={notValid} {...inputProps} />
            )
          }
          {/* (size === 'small' && !meta.hideMobileAfterText )  */}
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
          <small className="newLineSmall" style={{ marginBottom: 20 }}>
            {interpolate(meta.afterLine)}
          </small>
          <HbBreakLine className="newLine" />
        </>
      )}
    </>
  );
}

function FormFields({ children, fields, showErrors = true, doNotScroll, isFirstSlide = false }) {
      
    const { setTouched, touched } = useContext(SlideContext);
    const size = useBreakpoint("small", ["medium", "large", "super"]);
    const getFieldValues = () => fields.map(field => field.getValue())

    const [fieldValues, setFieldValues] = React.useState(() => getFieldValues())
    
    // console.log('Values', fieldValues)

    const onChangeHandler = (event, field) => {
        const type = field.getType()

        if (type === 'checkbox') {
            field.setValue(event.target.checked);
        } else if (["text", "select", "number"].includes(type)) {
            const value = event;
            field.setValue(value);
            // console.log(field.getType(), value)
        } else if (["radio-group"].includes(type)) {
            const value = event;
            if (field.getValue().includes(value) && field.isMultiple()) {
              field.removeValue(value)
            }
            else field.setValue(value);
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

    const notValid = (field) => !field.isValid()

    return (
      // style={size !== 'super' && { paddingTop: 80 }}
      <HbContent className="HbContent FormSlide" size={size}>
        <HbFormElement isFirstSlide={isFirstSlide} doNotScroll={false} className="HbFormElementParent" wrap justifyContent="center">
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
              notValid={notValid(field)}
              doNotScroll={doNotScroll}
              isFirstSlide={isFirstSlide}
            />
          ))}
        </HbFormElement>

        { children }
      </HbContent>
    );
};

export default FormFields;