import React, { useState, createContext, useEffect, useRef } from 'react'
import {cfg} from '../containers/App'
import Utils from '../utils/Utils'

export const SlideContext = createContext(null);

const SlideContextProvider = ({children}) => {
    const EngineRef = useRef(null);

    const [slideModel, setSlideModel] = useState(null);
    const [nav, setNav] = useState({canBack:false, canNext:false});
    const [progress, setProgress] = useState(0);
    const [progressBar, setProgressBar] = useState({})

    const [touched, setTouched] = React.useState(0)

    useEffect(() => {
        // Mounted
        Utils.waitForEngine((Engine)=>{
            if (Engine) {
                EngineRef.current = Engine;
                Engine.load(cfg.code, cfg.server, {}, cfg.preview, cfg.preload).then( ({css, jsLibs}) => {
                    let progressBar = Engine.getProgressBar()
                    setProgressBar(progressBar)
                    displayCurrentSlide();

                    Utils.embedCSS(css);
                    Utils.embedJSLibs(jsLibs);
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                console.error("Error loading the Pickzen SDK");
            }
        });
    }, []);

    /* useEffect(() => {
        console.log(slideModel)
    }) */

    const displayCurrentSlide = () => {
        const Engine = EngineRef.current;
        const slideModel = Engine.getSlide();

        setSlideModel(slideModel);

        const canRestart = slideModel.getType()==='End';
        const canBack = slideModel.canBack();
        const canNext = slideModel.canNext();
        const backLabel = slideModel.getBackLabel() || 'Back';
        const nextLabel = slideModel.getNextLabel() || 'Next';

        setNav( {canBack, canNext, backLabel, nextLabel, canRestart});

        setProgress(Engine.getProgress(false, true));
    };

    const next = () => {
        slideModel.next();
        displayCurrentSlide();
        setTouched(touched + 1)
    };

    const back = () => {
        slideModel.back();
        displayCurrentSlide();
        setTouched(touched + 1)
    };

    const restart = () => {
        slideModel.restart();
        displayCurrentSlide();
        setTouched(touched + 1)
    };

    return (
        <SlideContext.Provider value={{
            Engine:EngineRef.current,
            interpolate: (txt) => txt.includes('%') ? EngineRef.current.interpolate(txt) : txt,
            getDatasheet: (ids) => EngineRef.current.getDatasheets(ids),
            slideModel, displayCurrentSlide,
            progress, progressBar,
            nav:{canBack:nav.canBack, canNext:nav.canNext, canRestart:nav.canRestart, backLabel:nav.backLabel, nextLabel:nav.nextLabel, back, next, restart},
            touched, setTouched
        }}>
            {slideModel ? children : null}
        </SlideContext.Provider>
    )
};

export default SlideContextProvider