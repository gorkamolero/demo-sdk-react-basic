const Select2 = ({field, title, onChangeHandler, size}) => {
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