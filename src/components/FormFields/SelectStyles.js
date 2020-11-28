import { colors } from "../../visly";

export default {
  control: (provided, state) => {
    return ({
      ...provided,
      boxShadow: 'none',
      borderColor: 'none',
      borderRadius: 0,
      border: 0,
      borderBottom: `2px solid ${colors.hbLight}`,
      paddingLeft: 0,
      fontWeight: 'normal',
      '&:hover': {
        borderColor: colors.hbGreen
      },
    })
  },
  menu: (provided, state) => ({
    ...provided,
    margin: 0,
    minWidth: '100%',
    width: 'auto',
    borderRadius: 0,
    zIndex: 20,
    left: '50%',
    transform: 'translate(-50%)'
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
    backgroundColor: 'white'
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 !important',
    flexWrap: 'nowrap'
  }),
  singleValue: (provided, state) => ({
    ...provided,
    transform: 'none',
    top: 'auto',
    position: 'static',
    overflow: 'visible',
    fontWeight: 'bold',
    color: colors.hbGreen
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: state.isFocused ? colors.hbDark : colors.hbText,
    transform: 'none',
    top: 'auto',
    position: 'static'
  }),
  input: (provided, state) => ({
    fontFamily: 'inherit',
    fontSize: 'inherit'
  }),
  container: (provided, state) => ({
    ...provided,
    ...(state.selectProps.maxWidth &&  {maxWidth: !state.hasValue ? state.selectProps.maxWidth : '210px'}),
    ...(state.selectProps.superMaxWidth && state.hasValue &&  {maxWidth: state.selectProps.superMaxWidth}),
    minWidth: state.selectProps.min ? 60 : 150
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: isFocused ? 'white' : colors.hbText,
      backgroundColor: isFocused ? colors.hbGreen : 'white',
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  }
}