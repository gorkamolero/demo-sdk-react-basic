import React, { useEffect, useState, useCallback, useContext, useMemo } from 'react';
import {SlideContext} from "../../context/SlideContext";
import './End.css'
import Navigation from "../../components/Navigation/Navigation";
import Loading from '../../components/Loading';
import Products from './partials/Products'
import Features from './partials/Features'
import Testimonials from './partials/Testimonials'
import { HbCircleIcon, icons, colors, useBreakpoint, HbWave, textstyles } from "../../visly";
import { HbSection } from '../../visly/Pages'
import Video from './partials/ReactPlayerWistia2'
import { Footer, Tip } from '../../styles/StyledComps';
import CustomHTML from '../../components/CustomHTML/CustomHTML';
import 'react-tippy/dist/tippy.css'
import {
  Tooltip,
} from 'react-tippy';
import { useLocalStorage } from 'react-use';
import { FlexBox } from 'react-styled-flex';
import { HbSuperProductEmpty } from '../../visly/Compounds';

let noTest = window.location.href.includes('dev') || window.location.href.includes('localhost')

function End({loading, setLoading}) {
    const [loadingScreenIsSeen, setLoadingScreenIsSeen] = useLocalStorage('loadingScreenIsSeen', noTest ? true : false);
    const [videoIsDone, setVideoIsDone] = useLocalStorage('videoIsSeen', noTest ? true : false);
    
    useEffect(() => {
        if (loadingScreenIsSeen) setLoading(false)
        if (videoIsDone) setLoading(false)
    }, [loadingScreenIsSeen, videoIsDone, setLoading])

    const { nav } = useContext(SlideContext);
    const [hungry, setHungry] = useState(null)
    const [dog, setDog] = useState(null)
    const [products, setProducts] = useState(null)
    const [texts, setTexts] = useState(null)
    const [reviews, setReviews] = useState(null)
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

                // setProducts({
                //     kibble: null,
                //     supplement:null,
                //     mixin: null
                // })

                if (window.hungry.end.kibble) {
                    setReviews(window.hungry.end.reviews[window.hungry.end.kibble.key])
                } else {
                    setReviews(window.hungry.end.reviews['chicken_rice'])
                }

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
    const getPriceWithoutMultiplier = (price) => Number(price).toFixed(2)
    const roundPrice = (price) => Number(price).toFixed(2)
    const totalProducts = selectedResults.filter(s => s).length

    const continueToCheckout = () => {
        window.hungry.end.goToCheckout(subscription, selectedResults);
    }

    const addAnotherDog = () => {
        window.hungry.end.addAnotherDog( subscription, selectedResults, () => {
            nav.restart();
        });
    }

    const restartQuiz = () => nav.restart()

    useEffect(() => {
        if (!hungry) return
        console.log(hungry)
        let trialText = hungry.texts.plan.trialText.replace('[PRICETRIAL]',getPrice(totalPrice))
        let afterTrialText = hungry.texts.plan.afterTrialText
            .replace('[PRICE]', getPriceWithoutMultiplier(totalPrice*0.9))
            .replace('[PRICEPERDAY]', getPrice(totalPrice*0.9/28))
            .replace('[SHIPPING]', hungry.getShippingText(totalPrice))

        setTexts({
            plan:{
                trial: trialText,
                afterTrial: afterTrialText
            }
        })
    }, [hungry, getPrice, totalPrice])

    useEffect(() => {
        return () => setLoading(true)
    }, [setLoading])
    
    if (!hungry || !products) return <div></div>

    console.log("XXXX", hungry.video)

    return (
        <FlexBox column center width="100%">
            {
                loading && !loadingScreenIsSeen && (
                    <Loading loading={loading} setLoading={setLoading} setLoadingScreenIsSeen={setLoadingScreenIsSeen}  timing={9000} outTiming={100} />
                )
            }

            {
                !loading && (
                    <FlexBox column center width="100%">
                        <Video video={hungry.video} play={true} videoIsDone={videoIsDone} setVideoIsDone={setVideoIsDone} />
                    </FlexBox>
                )
            }

            {
                videoIsDone && (
                    <>
                        {/* {
                            products && (

                            )
                        } */}

                        {
                            !products.kibble && !products.supplement && !products.mixin ? (
                                <HbSection
                                    noMaxWidth
                                    waveslot1={<HbWave className="HbWave" double />}
                                    waveslot2={<HbWave className="HbWave" invert />}
                                    column
                                    alignItems="center"
                                    className="wave"
                                    style={{ backgroundColor: colors.hbGoldLight}}
                                    title={'Recommended Plan'}
                                >
                                    <HbSuperProductEmpty
                                        className="HbSuperProductEmpty"
                                        Extratext={
                                            <CustomHTML style={{ ...textstyles.hbFeatureText, color: colors.hbBrown }}
                                                html={`It looks like ${hungry.dogName} has some very specific nutrition challenges. We don’t have a Hungry Bark Supplements to offer him. If you would like to discuss this further, please contact our team at Clinical Pet Nutritionists at <span class="hungryBlue">nutritionist@hungrybark.com</span>`}
                                            />
                                        }
                                        oops={`Oops… Looks like ${hungry.dogName} has some very specific needs…`}
                                    />
                                </HbSection>
                            ) : (
                                <Products products={products} dog={dog} goals={hungry.goals} texts={texts} totalPrice={totalPrice} setTotalPrice={setTotalPrice} selectedResults={selectedResults} setSelectedResults={setSelectedResults} subscription={subscription} setSubscription={setSubscription} getPrice={getPrice} continueToCheckout={continueToCheckout} />
                            )
                        }

                        { window.location.href.includes('localhost') && <Navigation />}

                        <Features reviews={reviews} stack={size === 'small'} />

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
                            NoHbAddAnotherDog={hungry.currentDog >= hungry.dogsInHousehold}
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
        </FlexBox>
    );

}

export default End;