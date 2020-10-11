import styled from 'styled-components';
import CustomHTML from "../components/CustomHTML/CustomHTML";
import { textstyles, colors } from "../visly";

export const HbContainer = styled.section`
  width: 100%;
  max-width: 60ch;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  align-content: flex-start;
  justify-content: flex-start;
  padding: 0 10px;
`

export const HbTitle = styled(CustomHTML)(props => ({
  ...(props.size && ['super', 'large'].includes(props.size) && textstyles.superHeading),
  ...(props.size && props.size === 'tablet' && textstyles.superHeadingTablet),
  ...(props.size && props.size === 'mobile' && textstyles.superHeadingMobile),
  color: colors.hbBrown
}))

export const HbSubtitle = styled(CustomHTML)(props => ({
  ...(props.size !== 'mobile' ? textstyles.bodySmall : textstyles.bodySmallMobile),
  color: colors.hbText,
  opacity: '80%'
}))