import React, { useState, useEffect } from "react";

const PeriodSlider = ({ optionLabels, options, activeOption, onChange }) => {
    const [isTransitionCompleted, setIsTransitionCompleted] = useState(true);

    const slideStyles = {
        sliderContainer: {
            position: "relative",
            display: "inline-flex",
            borderRadius: "20px",
            overflow: "hidden",
            width: "350px",
            height: "30px",
            cursor: "pointer",
            border: "1px solid #0b3150",
        },
        toggleOption: {
            flex: 1,
            textAlign: "center",
            lineHeight: "30px",
            fontSize: "0.9rem",
            color: "#0b3150",
            zIndex: 2,
            fontWeight: "normal",
            userSelect: "none",
            transition: "color 0.3s ease-in-out",
        },
        activeOption: {
            color: "white",
        },
        sliderIndicator: {
            border: "1px solid #0b3150",
            position: "absolute",
            top: 0,
            left: 0,
            width: `${100 / options.length}%`,
            height: "100%",
            backgroundColor: "#0b3150",
            borderRadius: "20px",
            transition: "left 0.3s ease-in-out",
            zIndex: 1,
        },
    };

    useEffect(() => {
        setIsTransitionCompleted(false);
        const transitionTimeout = setTimeout(() => {
          setIsTransitionCompleted(true);
        }, 1); 
        return () => clearTimeout(transitionTimeout);
      }, [activeOption]);

    return (
        <div style={slideStyles.sliderContainer}>
            {options.map((option, index) => (
                <span
                    key={option}
                    style={{
                        ...slideStyles.toggleOption,
                        ...(isTransitionCompleted && activeOption === option ? slideStyles.activeOption : {}),
                    }}
                    onClick={() => onChange(option)}
                >
                    {optionLabels[index]}
                </span>
            ))}
            <div
                style={{
                    ...slideStyles.sliderIndicator,
                    left: `${options.indexOf(activeOption) * (100 / options.length)}%`,
                }}
            ></div>
        </div>
    );
};

export default PeriodSlider;