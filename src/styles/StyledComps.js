import styled from 'styled-components';
import CustomHTML from "../components/CustomHTML/CustomHTML";
import { textstyles, colors } from "../visly";
import Curve from '../assets/images/curve-separator.svg'
import CurveLight from '../assets/images/curve-separator-white.svg'
import { HbEndFooter, HbStickyBar } from '../visly/Compounds'

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
  ...(props.size && props.size === 'tablet' && {
    ...textstyles.superHeadingTablet,
    textAlign: 'left',
  }),
  ...(props.size && props.size === 'mobile' && {
    ...textstyles.superHeadingMobile,
    textAlign: 'left',
  }),
  color: colors.hbBrown,
  '&:first-letter': { textTransform: 'uppercase' }
}))

export const HbSubtitle = styled(CustomHTML)(props => ({
  ...(props.size !== 'mobile' ? textstyles.bodySmall : textstyles.bodySmallMobile),
  color: colors.hbBrown,
  opacity: '80%',
}))

export const Wave = styled.div`
  height: 45px; 
  width: 100%;
  background: white url(${Curve}) center center no-repeat;
  ${props => props.light && `
    background: transparent url(${CurveLight}) center center no-repeat;
  `}
  ${props => props.invert && `
    transform: rotate(180deg);
    &:first-of-type { margin-bottom: 40px !important; }
    &:last-of-type { margin-top: 40px !important; }
  `}
  background-size: 100%;

`

export const WaveContainer = styled.section`
  width: 100vw;
  padding: 0;
  background: ${props => props.light ? colors.hbGray120: colors.hbGray150};
  ${props => props.invert && `transform: rotate(180deg);`}
  & > * {
    padding: 0 !important;
    margin: 0 auto;
  }
`

export const Footer = styled(HbEndFooter)`
  position: fixed;
  left: 0;
  bottom: 0;
`


export const FooterBar = styled(HbStickyBar)`
  position: fixed;
  left: 0;
  bottom: 0;
`

export const Tip = styled.div(props => ({
  backgroundColor: colors.hbYellow,
  color: colors.hbBrown,
  padding: 10, borderRadius: 4
}))