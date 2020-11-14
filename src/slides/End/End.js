import React, { useEffect, useState, useCallback, useContext, useMemo } from 'react';
import {SlideContext} from "../../context/SlideContext";
import './End.css'
import Navigation from "../../components/Navigation/Navigation";
import Loading from '../../components/Loading';
import Products from './partials/Products'
import Features from './partials/Features'
import Testimonials from './partials/Testimonials'
import { HbCircleIcon, icons, colors, useBreakpoint } from "../../visly";
import Video from './partials/ReactPlayerWistia2'
import { Footer, Tip } from '../../styles/StyledComps';
import 'react-tippy/dist/tippy.css'
import {
  Tooltip,
} from 'react-tippy';
import { useLocalStorage } from 'react-use';

const noTest = false

function End({loading, setLoading}) {
    const [loadingScreenIsSeen, setLoadingScreenIsSeen] = useLocalStorage('loadingScreenIsSeen', false);

    React.useEffect(() => {
        if (loadingScreenIsSeen) setLoading(false)
    }, [loadingScreenIsSeen, setLoading])

    const [videoIsDone, setVideoIsDone] = useState(noTest ? true : false)

    const { nav } = useContext(SlideContext);
    const [hungry, setHungry] = useState(null)
    const [dog, setDog] = useState(null)
    const [products, setProducts] = useState(null)
    const [texts, setTexts] = useState(null)

    const size = useBreakpoint("small", ["medium", "large", "super"]);

    useEffect(() => {
        const waitForWindowData = () => {
            if (window.hungry.end) {
                setHungry(window.hungry.end)
                setDog({
                    name: window.hungry.end.dogName,
                    weight: window.hungry.end.dogWeight,
                    gender: window.hungry.end.dogGender,
                })
                setProducts({
                    kibble: window.hungry.end.kibble ? window.hungry.end.kibble : null,
                    supplement:window.hungry.end.supplement ? window.hungry.end.supplement : null,
                    mixin: window.hungry.end.mixin ? window.hungry.end.mixin : null
                })

            } else {
                setTimeout(() => waitForWindowData(), 500);
            }
        }

        waitForWindowData()

    }, [])

    const [selectedResults, setSelectedResults] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [subscription, setSubscription] = useState(true)

    const subscribeMultiplier = useMemo(() => subscription ? 0.8 : 1, [subscription])
    const getPrice = useCallback(
        (price) => Number(price * subscribeMultiplier).toFixed(2),
        [subscribeMultiplier],
    );
    const roundPrice = (price) => Number(price).toFixed(2)
    const totalProducts = selectedResults.length

    const continueToCheckout = () => {
        console.log('Going to checkout with :' + JSON.stringify(selectedResults))
    }

    const addAnotherDog = () => {
        console.log('Adding another dog')
        window.hungry.end.addAnotherDog( () => {
            nav.restart();
        });
    }

    const restartQuiz = () => nav.restart()

    useEffect(() => {
        if (!hungry) return
        let trialText = hungry.texts.plan.trialText.replace('[PRICETRIAL]',getPrice(totalPrice*0.8))
        let afterTrialText = hungry.texts.plan.afterTrialText
            .replace('[PRICE]', getPrice(totalPrice*0.9))
            .replace('[PRICEPERDAY]', getPrice(totalPrice*0.9/28))
            .replace('[SHIPPING]', hungry.getShippingText(totalPrice))

        setTexts({
            plan:{
                trial: trialText,
                afterTrial: afterTrialText
            }
        })
    }, [hungry, getPrice, totalPrice])

    if (!hungry) return null

    return (
        <>
            {
                loading && !loadingScreenIsSeen && (
                    <Loading loading={loading} setLoading={setLoading} setLoadingScreenIsSeen={setLoadingScreenIsSeen}  timing={2000} outTiming={100} />
                )
            }

            {
                !loading && (
                    <Video video={hungry.video} play={true} videoIsDone={videoIsDone} setVideoIsDone={setVideoIsDone} />
                )
            }

            {
                videoIsDone && (
                    <>
                        {
                            products && <Products products={products} dog={dog} goals={hungry.goals} texts={texts} totalPrice={totalPrice} setTotalPrice={setTotalPrice} selectedResults={selectedResults} setSelectedResults={setSelectedResults} subscription={subscription} setSubscription={setSubscription} getPrice={getPrice} continueToCheckout={continueToCheckout} />
                        }

                        { window.location.href.includes('localhost') && <Navigation />}

                        <Features stack={size === 'small'} />

                        <Testimonials />

                        <Footer
                            className={`HbEndFooter ${size === 'small' ||  size === 'medium' ? 'stack' : ''}`}
                            total={`Total (${totalProducts})`}
                            priceOriginal={subscription && selectedResults.length ? '$' + roundPrice(totalPrice) : ''}
                            priceFinal={'$' + getPrice(totalPrice)}
                            HbLinkButton={<Footer.HbLinkButton text={size === 'small' ? '+ Dog' : 'Add another dog'} onPress={addAnotherDog} />}
                            HbButtonWithIcon={<Footer.HbButtonWithIcon onPress={continueToCheckout} />}
                            HbButtonWithIconMobile={<Footer.HbButtonWithIcon onPress={continueToCheckout} />}
                            RestartSlot={<Footer.RestartSlot onPress={restartQuiz} />}
                            RestartSlotMobile={<Footer.RestartSlotMobile onPress={restartQuiz} />}
                            // NoHbAddAnotherDog={hungry.currentDog >= hungry.dogsInHousehold}
                            stack={size === 'small' ||  size === 'medium'}
                            HelpSlot={
                                <Tooltip
                                    // options
                                    position="top"
                                    trigger="mouseenter click"
                                    style={{ padding: 0 }}
                                    theme="light"
                                    html={(
                                        <Tip>
                                            Your current selections have been saved. Click to create a plan for your other dog.
                                        </Tip>
                                    )}
                                >
                                    <HbCircleIcon icon={icons.hbHelp2} style={{ width: 32, height: 32, color: colors.hbBrown }} />
                                </Tooltip>
                            }
                        />
                    </>
               )
            }
        </>
    );

}

export default End;