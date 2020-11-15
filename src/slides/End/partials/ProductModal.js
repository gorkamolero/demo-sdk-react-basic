import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { HbSection } from '../../../visly/Pages'
import { HbKibblePlan, HbKibblePlanElement, icons, useBreakpoint, HbCloseModal, HbTabs, colors, textstyles, HbLinkButton } from '../../../visly'
import { Tabs, Panel, useTabState } from '@bumaga/tabs'
import { FlexBox, FlexItem } from "react-styled-flex";
import CustomHTML from "../../../components/CustomHTML/CustomHTML";
import './modals/commonModals.css'
import './modals/kibbleModal.css'
import './modals/mixinModal.css'
import './modals/supplementModal.css'

const Close = styled(HbCloseModal)`
  position: fixed;
  top: 0;
  right: 0;
`

const Tab = ({ text }) => {
    const { onClick, isActive } = useTabState();

    return <HbTabs.Button text={text} onClick={onClick} selected={isActive} />
};

const getTabs = (product, dog, goals, size) => {
    if (product.type === 'kibble') {
        return (
            <div className="tabContainer" style={{ ...textstyles.bodySmall, paddingTop: 20 }}>
                <Tabs>
                    <HbTabs>
                        <Tab text="Meal Plan" />
                        <Tab text="Transitioning" />
                        <Tab text={['small', 'medium'].includes(size) ? 'Nutritional' : 'Nutritional Info'} />
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

                            <HbKibblePlan
                                stack={['small', 'medium'].includes(size)}
                                HbKibblePlanElement={<HbKibblePlan.HbKibblePlanElement slot1={product.calories} slot2="Kcals / day" style={{ flex: 1 }} HbCircleIcon={<HbKibblePlanElement.HbCircleIcon down={['small', 'medium'].includes(size)} icon={icons.chevronRightIcon} style={{ position: 'relative', zIndex: 9 }} />} />}
                                HbKibblePlanElement1={<HbKibblePlan.HbKibblePlanElement1 slot1={product.serving} slot2="Cups / day" style={{ flex: 1 }} HbCircleIcon={<HbKibblePlanElement.HbCircleIcon icon={icons.hbEqual} style={{ position: 'relative', zIndex: 9 }} />} />}
                                HbKibblePlanElement2={<HbKibblePlan.HbKibblePlanElement2 slot1={product.lbs14} slot2="Lbs / 2 weeks" style={{ flex: 1 }} NoNext />} 
                            />

                        </div>

                        <div className="kibtab-content-2">
                            <h2 style={{ color: colors.hbBrown, ...textstyles.hbFeatureTitle }}><span className="capitalise-pz">{dog.name}</span>'s Health Goals</h2>
                            <div className="kibGoalContent">
                                <ul className="health-goals">
                                    {
                                        goals.map((goal, i) => (<li className="goal" key={i}>{goals[i]}</li>))
                                    }
                                </ul>
                            </div>
                        </div>
                    </Panel>

                    <Panel>
                        <div className="kibtab-header">
                            <h2 style={{ color: colors.hbBrown, ...textstyles.hbFeatureTitle }}>Feeding Transition</h2>
                            <p>Hungry Bark has over 66 billion probiotic microorganisms, making it easier for your dog to transition to.</p>
                        </div>

                        <div className="kibtab-content">
                            <div className="kibtab-content-trans" style={{ backgroundColor: colors.hbGoldLight }}>
                                <h2 style={{ color: colors.hbBrown, ...textstyles.hbFeatureTitle }}>Easily Transition Your Dog’s Meal To Hungry Bark In Less Than 2 Weeks</h2>

                                <div className="kibtab-contentImgGrp" style={{ backgroundColor: colors.hbGoldLight }}>
                                    <div className="kibTransImg kibTransImg-1">
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0080/0561/5687/files/transition1.png?v=1592925792"
                                            alt="Days 1-3"/>
                                        <p style={{ fontWeight: 'bold' }}>Days 1-3</p>
                                    </div>

                                    <div className="kibTransImg kibTransImg-2">
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0080/0561/5687/files/transition2.png?v=1592925793"
                                            alt="Days 4-6"/>
                                        <p style={{ fontWeight: 'bold' }}>Days 4-6</p>
                                    </div>

                                    <div className="kibTransImg kibTransImg-3">
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0080/0561/5687/files/transition3.png?v=1593010810"
                                            alt="Days 7-10"/>
                                        <p style={{ fontWeight: 'bold' }}>Days 7-10</p>
                                    </div>

                                    <div className="kibTransImg kibTransImg-4">
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0080/0561/5687/files/transition4.png?v=1592925793"
                                            alt="Day 11"/>
                                        <p style={{ fontWeight: 'bold' }}>Day 11</p>
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
                                <FlexBox column gap=".25em" style={{ paddingTop: '.25em' }}>
                                    {product.values.map(value => (
                                        <FlexBox justifyContent="space-between" style={{ padding: '0 0 .5em' }}>
                                            <div className="nutriLabel">{value.bottom}</div>
                                            <div className="nutriValue">{value.top} {value.mid}{value.symbol}</div>
                                        </FlexBox>
                                    ))}
                                </FlexBox>
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
                        <h2 style={{ color: colors.hbBrown, ...textstyles.hbFeatureTitle }}>Scoop, Pour & Mix</h2>
                        <p>Mix in 1 tablespoon per cup of food.</p>
                    </Panel>

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

    const size = useBreakpoint("small", ["medium", "large", "super"]);

    useEffect(() => {
        document.body.classList.add('noScroll')

        return () => document.body.classList.remove('noScroll')

    }, [])

    return (
        <FlexBox is={ReactModal} isOpen onAfterClose={hideModal} className="Modal">
            <HbSection
                style={{ margin: '0 auto', alignItems: 'flex-start', position: 'relative' }}
                withImage={product.type !== 'kibble'}
                withLargeImage={product.type === 'kibble'}
                imageSrc={product.type === 'kibble' ? product.sectionsImg : product.images[product.selectedImage]}
            >
                {getTabs(product, dog, goals, size)}
                <FlexBox center style={{ padding: '20px' }}>
                    <FlexItem>
                        <HbLinkButton
                            onPress={hideModal}
                            text="Close"
                        />
                    </FlexItem>
                </FlexBox>
            </HbSection>

            <Close onClick={hideModal} />
        </FlexBox>
    );
}

export default ProductModal;