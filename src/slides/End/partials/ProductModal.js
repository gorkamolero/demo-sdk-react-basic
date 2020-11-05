import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { HbSection } from '../../../visly/Pages'
import { Tabs, Panel, useTabState } from '@bumaga/tabs'
import { HbCloseModal, HbTabs, colors, textstyles } from '../../../visly'
import { FlexBox } from "react-styled-flex";
import CustomHTML from "../../../components/CustomHTML/CustomHTML";
import './modals/commonModals.css'
import './modals/kibbleModal.css'
import './modals/mixinModal.css'
import './modals/supplementModal.css'

const Close = styled(HbCloseModal)`
  position: absolute;
  top: 0;
  right: 0;
`

const Tab = ({ text }) => {
    const { onClick, isActive } = useTabState();

    return <HbTabs.Button text={text} onClick={onClick} selected={isActive} />
};

const getGoalColum = function(goals, min, max) {
    let items = [];
    for (let i = min; i <= max; i += 1) {
        if (goals[i]) items.push(<li className="goal" key={i}>{goals[i]}</li>);
    }
    return (
        <ul className="health-goals">
            {items}
        </ul>
    )
};

const getTabs = (product, dog, goals) => {
    if (product.type === 'kibble') {
        return (
            <div style={{ ...textstyles.bodySmall, paddingTop: 20 }}>
                <Tabs>
                    <HbTabs>
                        <Tab text="Meal Plan" />
                        <Tab text="Transitioning" />
                        <Tab text="Nutritional Info" />
                    </HbTabs>
                    <div className="spacer"></div>
                    <Panel>
                        <div className="kibtab-header">
                            <h2 style={{ color: colors.hbBrown, ...textstyles.hbFeatureTitle }}><span className="capitalise-pz">{dog.name}</span>'s Custom Plan</h2>
                            <p>We have used <span className="capitalise-pz">{dog.name}</span>’s unique characteristics
                                and health goals to create the following personalized feeding requirement.</p>
                        </div>

                        <div className="kibtab-content-1">
                            <h2 style={{ color: colors.hbBrown, ...textstyles.hbFeatureTitle }}><span className="capitalise-pz">{dog.name}</span>'s Meal Plan</h2>

                            <div className="KibMealPlanGraphicGrp">
                                <div className="kibmeal-pln-bx-bg kibmeal-pln-bx-bg-1">
                                    <div className="kibCircleMP-kcals kibCircleMP">
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0080/0561/5687/files/kcals.png?v=1592911965"
                                            alt=""/>
                                    </div>
                                    <p className="kibmeal-plan-number" data-hj-allow>{product.calories}</p>
                                    <p className="kibmeal-plan-label">Cals / day</p>
                                </div>

                                <div className="kibCircleMid-1 kibCircleMid">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18.75" height="15"
                                                     viewBox="0 0 18.75 15">
                                                    <path style={ {fill: '#1b1c24' } }
                                                          d="M11.25,0,10.193,1.058,15.877,6.75H0v1.5H15.877l-5.685,5.693L11.25,15l7.5-7.5L11.25,0Z"/>
                                                </svg>
                                            </span>
                                </div>


                                <div className="kibmeal-pln-bx-bg kibmeal-pln-bx-bg-2">
                                    <div className="kibCircleMP-cupsPD kibCircleMP">
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0080/0561/5687/files/cupsPD.png?v=1592911965"
                                            alt=""/>
                                    </div>
                                    <p className="kibmeal-plan-number" data-hj-allow>{product.serving}</p>
                                    <p className="kibmeal-plan-label">Cups / day</p>
                                </div>

                                <div className="kibCircleMid-2 kibCircleMid">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8">
                                                    <rect style={ {fill: '#1b1c24'} } width="12" height="2" />
                                                    <rect style={ {fill: '#1b1c24' } } width="12" height="2" />
                                                </svg>
                                            </span>
                                </div>

                                <div className="kibmeal-pln-bx-bg kibmeal-pln-bx-bg-3">
                                    <div className="kibCircleMP-lbs7 kibCircleMP">
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0080/0561/5687/files/lbs7x.png?v=1592911965"
                                            alt=""/>
                                    </div>
                                    <p className="kibmeal-plan-number" data-hj-allow>{product.lbs14}</p>
                                    <p className="kibmeal-plan-label">Lbs / 2 weeks</p>
                                </div>
                            </div>

                        </div>

                        <div className="kibtab-content-2">
                            <h2 style={{ color: colors.hbBrown, ...textstyles.hbFeatureTitle }}><span className="capitalise-pz">{dog.name}</span>'s Health Goals</h2>
                            <div className="kibGoalContent">
                                {getGoalColum(goals, 0,2)}
                                {getGoalColum(goals, 3,5)}
                                {getGoalColum(goals, 6,8)}
                                {getGoalColum(goals, 9,11)}
                            </div>
                        </div>
                    </Panel>

                    <Panel>
                        <div className="kibtab-header">
                            <h2 style={{ color: colors.hbBrown, ...textstyles.hbFeatureTitle }}>Feeding Transition</h2>
                            <p>Hungry Bark has over 66 billion probiotic microorganisms, making it easier for your dog to transition to.</p>
                        </div>

                        <div className="kibtab-content">
                            <div className="kibtab-content-trans">
                                <h2 style={{ color: colors.hbBrown, ...textstyles.hbFeatureTitle }}>Easily Transition Your Dog’s Meal To Hungry Bark In Less Than 2 Weeks</h2>

                                <div className="kibtab-contentImgGrp">
                                    <div className="kibTransImg kibTransImg-1">
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0080/0561/5687/files/transition1.png?v=1592925792"
                                            alt="Days 1-3"/>
                                        <p>Days 1-3</p>
                                    </div>

                                    <div className="kibTransImg kibTransImg-2">
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0080/0561/5687/files/transition2.png?v=1592925793"
                                            alt="Days 4-6"/>
                                        <p>Days 4-6</p>
                                    </div>

                                    <div className="kibTransImg kibTransImg-3">
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0080/0561/5687/files/transition3.png?v=1593010810"
                                            alt="Days 7-10"/>
                                        <p>Days 7-10</p>
                                    </div>

                                    <div className="kibTransImg kibTransImg-4">
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0080/0561/5687/files/transition4.png?v=1592925793"
                                            alt="Day 11"/>
                                        <p>Day 11</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Panel>

                    <Panel>
                        <div className="kibtab-header">
                            <h2 style={{ color: colors.hbBrown, ...textstyles.hbFeatureTitle }}><span className="capitalise-pz">{dog.name}</span>'s Ingredients</h2>
                            <p>{product.ingredients}</p>
                        </div>

                        <div className="kibcontent-Nutri">

                            <div className="kibcontent-NutriAnalysis">
                                <h2 style={{ color: colors.hbBrown, ...textstyles.hbFeatureTitle }}>Guaranteed Analysis</h2>
                                <ul>
                                    {product.values.map(value => (
                                        <>
                                            <div className="nutriLabel">{value.bottom}</div>
                                            <div className="nutriValue">{value.top} {value.mid}{value.symbol}</div>
                                        </>
                                    ))}
                                </ul>
                            </div>

                            <div className="kibcontent-NutriStatement">
                                <h2 style={{ color: colors.hbBrown, ...textstyles.hbFeatureTitle }}>AAFCO statement</h2>
                                <p>Hungry Bark is formulated to meet the nutritional levels established by the AAFCO
                                    (Association of American Feed Control Officials) Dog Food Nutrient Profiles for All Life
                                    Stages.</p>
                            </div>
                        </div>


                        <div className="kibdisclaimer">*Not recognized as an essential nutrient by the AAFCO Dog Food
                            Nutrient Profiles.
                        </div>

                    </Panel>
                </Tabs>
            </div>
        )
    } else if (product.type === 'chews') {
        return (
            <div style={{ ...textstyles.bodySmall, paddingTop: 20 }}>
                <Tabs>
                    <HbTabs>
                        <Tab text="Description" />
                        <Tab text="Dosing" />
                        <Tab text="Nutritional" />
                    </HbTabs>
                    <div className="spacer"></div>

                    <Panel>
                        <h2 style={{ color: colors.hbBrown, ...textstyles.hbFeatureTitle }}>Dosing Guidelines for <span className="capitalise-pz">{dog.name}</span></h2>
                        <div className="doseGrp">
                            <div className="doseDogWeight">
                                <h3>Weight</h3>
                                <ul>
                                    <li>{dog.weight} lbs</li>
                                </ul>
                            </div>
                            <div className="dosePerDay">
                                <h3>Chews Per Day</h3>
                                <ul>
                                    <li>{product.chews1}</li>
                                </ul>
                            </div>
                        </div>
                    </Panel>

                    <Panel>
                        <h2 style={{ color: colors.hbBrown, ...textstyles.hbFeatureTitle }}>Scoop, Pour & Mix</h2>
                        <p>Mix in 1 tablespoon per cup of food.</p>
                    </Panel>
                    <Panel>
                        <CustomHTML html={product.nutrition}></CustomHTML>
                    </Panel>
                </Tabs>
            </div>
        )
    } else if (product.type === 'mixin') {
        return (
            <div style={{ ...textstyles.bodySmall, paddingTop: 20 }}>
                <Tabs>
                    <HbTabs>
                        <Tab text="Description" />
                        <Tab text="Feeding Guideline" />
                        <Tab text="Nutritional" />
                    </HbTabs>
                    <div className="spacer"></div>

                    <Panel>
                        <h2 style={{ color: colors.hbBrown, ...textstyles.hbFeatureTitle }}>{product.title}</h2>
                        <CustomHTML html={product.description}></CustomHTML>
                    </Panel>

                    <Panel>
                        <h2 style={{ color: colors.hbBrown, ...textstyles.hbFeatureTitle }}>Scoop, Pour & Mix</h2>
                        <p>Mix in 1 tablespoon per cup of food.</p>
                    </Panel>
                    <Panel>
                        <CustomHTML html={product.nutrition}></CustomHTML>
                    </Panel>
                </Tabs>
            </div>
        )
    }
};

const ProductModal = ({hideModal, product, dog, goals}) => {
    console.log('PROD', product)

    useEffect(() => {
        document.body.classList.add('noScroll')

        return () => document.body.classList.remove('noScroll')

    }, [])

    return (
        <ReactModal isOpen onAfterClose={hideModal}>
            <FlexBox justifyContent="center">
                <HbSection style={{ margin: '0 auto', alignItems: 'flex-start' }} withImage imageSrc={product.images[product.selectedImage]}>
                    {getTabs(product, dog, goals)}
                </HbSection>

                <Close onClick={hideModal} />
            </FlexBox>
        </ReactModal>
    );
}

export default ProductModal;