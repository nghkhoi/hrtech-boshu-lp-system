import React from 'react';

type ProgressBarProps = {
  currentStep: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  return (
    <div className="mx-auto mt-8 md:mt-20 w-[60%] lg:w-[12%] md:px-0 px-8 flex justify-center items-center font-bold text-[22px]">
      {[1, 2, 3].map((stepNumber) => (
        <React.Fragment key={stepNumber}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${currentStep >= stepNumber ? 'bg-brand-accent text-white' : 'bg-gray-200 text-gray-400'}`}>
            {stepNumber}
          </div>
          {stepNumber < 3 && <div className={`w-32 border-t-2  ${currentStep > stepNumber ? 'border-brand-accent' : 'border-gray-200'}`}></div>}
        </React.Fragment>
      ))}   
    </div>
  );
};

