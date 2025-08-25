import { Button } from "../../../../components/ui/button";
import React from "react";

const StepProgress = ({ stepCount, setStepCount, data }) => {
    if (!data || !Array.isArray(data)) {
        return null;
    }

    const handlePrevious = () => {
        if (stepCount > 0) {
            setStepCount(stepCount - 1);
        }
    };

    const handleNext = () => {
        if (stepCount < data.length - 1) {
            setStepCount(stepCount + 1);
        }
    };

    return (
        <div className="flex flex-col gap-4 mb-6">
            {/* Progress Bar */}
            <div className="flex gap-2">
                {data.map((item, index) => (
                    <div 
                        key={index} 
                        className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                            index <= stepCount ? "bg-primary" : "bg-gray-200"
                        }`}
                    />
                ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handlePrevious}
                    disabled={stepCount === 0}
                    className="px-4 py-2"
                >
                    Previous
                </Button>

                <div className="text-sm text-gray-500">
                    Question {stepCount + 1} of {data.length}
                </div>

                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleNext}
                    disabled={stepCount >= data.length - 1}
                    className="px-4 py-2"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default StepProgress;
