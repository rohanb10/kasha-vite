import { useEffect, useState } from "react";
import "../styles/how.css";
import chevron from "../assets/icons/chevron-down.svg";
import { loadBGImage } from "../common/utils";
import { DotPhoto } from "./DotPhoto";
import { HTMLContent } from "./HTMLContent";

function How({content}) {
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [currentIcon, setCurrentIcon] = useState(' ');

    const handleClick = (next) => {
        if (currentStep === next) return;
        setCurrentStep(undefined);
        setTimeout(() => setCurrentStep(next), 600);
    }
    useEffect(() => {
        if (!content || !content.length) return;
        setSteps(content);
        content.map(step => loadBGImage(step?.image?.url));
    }, [content]);

    useEffect(() => {
        if (!steps.length) return;
        setCurrentIcon(steps[currentStep]?.image);
    }, [steps, currentStep]);
    
    return (
        <div className="how-container">
            <div className={`how-media ${!isNaN(currentStep) ? 'fade-in' : ''}`}>
                {/* <div className="how-icon">{currentIcon}</div> */}
                <DotPhoto photo={currentIcon} containerClass="how-image" disableAnimation/>
            </div>
            <div className="how-accordion">
                {steps.map((step, i) => (
                    <div key={i}  className={`how-item ${currentStep === i ? '' : 'collapsed'}`}>
                        <div onClick={_ => handleClick(i)} className="how-title-container">
                            <div className="how-title">{step?.label}</div>
                            <img src={chevron} className="how-arrow" alt="Arrow" />
                        </div>
                        <div className="how-body">
                            <div className="how-media fade-in">
                                {/* <div className="how-icon">{currentIcon}</div> */}
                                <DotPhoto photo={step?.image} containerClass="how-image" disableAnimation/>
                            </div>
                            <HTMLContent content={step?.description?.html} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default How;