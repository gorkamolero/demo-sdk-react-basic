import React, { useContext, useState } from 'react';
import { SlideContext } from "../../../context/SlideContext";
import { FlexBox } from "react-styled-flex";
import { HbSection } from '../../../visly/Pages'
import { useBreakpoint } from '../../../visly'
import { HbTestimonial } from '../../../visly/Compounds'
import Carousel from 'nuka-carousel'
import styled from 'styled-components';
import { WaveContainer, Wave } from '../../../styles/StyledComps'

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

const Section = styled(HbSection)`
  *:focus { outline: none; }
`

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
    renderCenterLeftControls: () => null,
    renderCenterRightControls: () => null,
    framePadding: '20px 0 80px',
    cellSpacing: 10,
    frameOverflow: 'visible'
  };
  
  return (
    <WaveContainer light style={{ paddingBottom: 40 }}>
      <Wave light invert />
      <Section noMaxWidth={true} title="See what other dog parents like you are saying" style={{ paddingBottom: 20 }}>
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
      </Section>
    </WaveContainer>
  );
}
 
export default Testimonials;