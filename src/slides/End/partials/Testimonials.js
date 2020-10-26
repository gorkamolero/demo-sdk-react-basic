import React, { useContext, useState } from 'react';
import { SlideContext } from "../../../context/SlideContext";
import { FlexBox } from "react-styled-flex";
import { HbSection } from '../../../visly/Pages'
import { HbWave, colors, useBreakpoint, HbSliderArrow } from '../../../visly'
import { HbTestimonial } from '../../../visly/Compounds'
import Carousel from 'nuka-carousel'
// import styled from 'styled-components';

const TESTIMONIALS = [
  {
    rating: 5,
    client: 'Mary Wilkerson',
    title: 'So far, so good!',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptat accusant doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
  },
  {
    rating: 5,
    client: 'Mary Wilkerson',
    title: 'So far, so good!',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptat accusant doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
  },
  {
    rating: 5,
    client: 'Mary Wilkerson',
    title: 'So far, so good!',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptat accusant doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
  },
  {
    rating: 5,
    client: 'Mary Wilkerson',
    title: 'So far, so good!',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptat accusant doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
  },
  {
    rating: 5,
    client: 'Mary Wilkerson',
    title: 'So far, so good!',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptat accusant doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
  },
  {
    rating: 5,
    client: 'Mary Wilkerson',
    title: 'So far, so good!',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptat accusant doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
  },
  {
    rating: 5,
    client: 'Mary Wilkerson',
    title: 'So far, so good!',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptat accusant doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
  },
  {
    rating: 5,
    client: 'Mary Wilkerson',
    title: 'So far, so good!',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptat accusant doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
  },
]

/* const Section = styled(HbSection)`
  *:focus { outline: none; }
` */

const Testimonials = () => {
  const { getDatasheet } = useContext(SlideContext)

  const [ testimonials, setTestimonials ] = useState([])

  React.useEffect(() => {
    const getTestimonials = async () => {
      try {
        const testimonials = await getDatasheet(['1XaJ9jNcSLz'])
        setTestimonials(testimonials)
      } catch(err) {
        console.error(err)
      }
    }

    getTestimonials()
  }, [getDatasheet])

  console.log('YOLO', testimonials)

  
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
          TESTIMONIALS.map(testimonial => (
              <HbTestimonial
                key={testimonial.client}
                style={{ outline: 'none', border: 'none' }}
                title={testimonial.title}
                client={testimonial.client}
                text={testimonial.text}
                stars={<FlexBox gap={5}>
                  {Array(testimonial.rating).fill().map(() => <span aria-label="rating-star" role="img">⭐️</span>)}
                </FlexBox>}
              />
          ))
        }
      </Carousel>
    </HbSection>
  );
}
 
export default Testimonials;