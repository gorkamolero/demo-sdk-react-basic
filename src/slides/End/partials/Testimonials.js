import React, { useContext, useState } from 'react';
import { SlideContext } from "../../../context/SlideContext";
import { FlexBox } from "react-styled-flex";
import { HbSection } from '../../../visly/Pages'
import { HbWave, colors, useBreakpoint, HbSliderArrow } from '../../../visly'
import { HbTestimonial } from '../../../visly/Compounds'
import Carousel from 'nuka-carousel'

/* const Section = styled(HbSection)`
  *:focus { outline: none; }
` */

const Testimonials = () => {
  const { getDatasheet } = useContext(SlideContext)

  const [ testimonials, setTestimonials ] = useState([])

  React.useEffect(() => {
    const id = '1XaJ9jNcSLz'
    const getTestimonials = async () => {
      try {
        let testimonials = await getDatasheet([{id}])
        // console.log(testimonials)
        testimonials = testimonials.result[id]
        setTestimonials(testimonials)
      } catch(err) {
        console.error(err)
      }
    }

    getTestimonials()
  }, [getDatasheet])

  
  const size = useBreakpoint("small", ["medium", "large", "large"]);
  const settings = {
    slidesToShow: size === 'large' ? 3 : size === 'medium' ? 2 : 1,
    renderCenterLeftControls: ({ previousSlide }) => <HbSliderArrow reverse onClick={ previousSlide }/>,
    renderCenterRightControls: ({nextSlide}) => <HbSliderArrow onClick={ nextSlide } />,
    framePadding: '20px 0 80px',
    cellSpacing: 10,
    frameOverflow: 'visible',
    defaultControlsConfig: {
      pagingDotsStyle: {
        fill: colors.hbBrown,
      },
      pagingDotsClassName: "pagingDots"
    }
  };
  
  return (
    <HbSection
      noMaxWidth
      waveslot1={<HbWave style={{ transform: 'scaleX(-1)' }} dark />}
      column
      alignItems="center"
      className="wave"
      title="What Dog Owners Like You Are Saying"
      style={{ backgroundColor: colors.hbYellow, paddingBottom: 20, overflow: 'hidden' }}
    >
      <Carousel {...settings}>
        {
          testimonials.map(testimonial => (
              <HbTestimonial
                key={testimonial.client}
                style={{ outline: 'none', border: 'none' }}
                title={testimonial.title}
                client={testimonial.client}
                text={testimonial.text}
                stars={<FlexBox gap={5}>
                  {Array(testimonial.rating).fill().map((i) => <span key={i} aria-label="rating-star" role="img">⭐️</span>)}
                </FlexBox>}
              />
          ))
        }
      </Carousel>
    </HbSection>
  );
}
 
export default Testimonials;