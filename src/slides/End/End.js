import React, { useEffect, useState } from 'react';
import './End.css'
import Navigation from "../../components/Navigation/Navigation";
import Loading from '../../components/Loading';
import Products from './partials/Products'
import Features from './partials/Features'
import Testimonials from './partials/Testimonials'
// import Video from './partials/Video'
import { Footer } from '../../styles/StyledComps';

function End() {
    // No loading for dev
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState(null)

    useEffect(() => {
        setData({
            hungry: window.hungry,
            ctrl: window.pickzen.ctrl
        })
    }, [])

    console.log(data)

    return (
        <>
            {
                loading && (
                    <Loading setLoading={setLoading} timing={1000} outTiming={2500} />
                )
            }

            {/* {<Video />} */}

            <Products />

            <Navigation />

            <Features />

            <Testimonials />

            <Footer />
        </>
    );

}

export default End;