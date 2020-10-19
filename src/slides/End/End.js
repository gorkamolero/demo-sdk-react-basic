import React, { useState } from 'react';
import './End.css'
import Navigation from "../../components/Navigation/Navigation";
import Loading from '../../components/Loading';
import Products from './partials/Products'
import Features from './partials/Features'
import Testimonials from './partials/Testimonials'
import Video from './partials/Video'
import { Footer } from '../../styles/StyledComps'

function End() {
    // const [loading, setLoading] = useState(false)
    // No loading for dev
    const [loading, setLoading] = useState(true)

    return (
        <>
            {
                loading && (
                    <Loading setLoading={setLoading} timing={1000} outTiming={2500} />
                )
            }

            {<Video />}

            <Products />

            <Navigation />

            <Features />

            <Testimonials />

            <Footer />
        </>
    );

}

export default End;