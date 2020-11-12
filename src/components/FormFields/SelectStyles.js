import { colors } from "../../visly";

export default {
  control: (provided, state) => ({
    ...provided,
    boxShadow: 'none',
    borderColor: 'none',
    borderRadius: 0,
    border: 0,
    borderBottom: `2px solid ${colors.hbLight}`,
    paddingLeft: 20,
    '&:hover': {
      borderColor: colors.hbGreen
    }
  }),
  menu: (provided, state) => ({
    ...provided,
    margin: 0,
    minWidth: '100%',
    width: 'auto',
    borderRadius: 0,
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  menuList: (provided) => ({
    ...provided,
    padding: 0
  }),
  valueContainer: provided => ({
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
    color: colors.hbText,
    transform: 'none',
    top: 'auto',
    position: 'static'
  }),
  container: (provided, state) => ({
    ...provided,
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