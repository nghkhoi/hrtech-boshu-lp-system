import React from 'react';

type JobDetailsProps = {
  details: { [key: string]: string };
};

export const JobDetails: React.FC<JobDetailsProps> = ({ details }) => {
  return (
    <div className="w-full mx-auto md:mt-4">
      <div className="lg:p-18 md:mt-1 pb-14">
        <div className="pt-8 pb-4 text-center text-[28px] md:text-[36px] font-bold text-brand-accent md:bg-white bg-[#f3fafb]">
          募集要項
        </div>
        <div className="md:w-auto bg-[#f3fafb] md:bg-white w-full m-auto">
           <div className="py-0 md:py-10 w-11/12 md:w-2/3 mx-auto bg-white">
            <div className="max-w-[1050px] mx-auto overflow-hidden">
              <div className="mt-5 max-w-[1050px] mx-auto overflow-hidden px-2 lg:px-0">
                {Object.entries(details).map(([key, value]) => (
                  <div key={key} className="border-b-2 border-brand-accent py-4 w-full inline-block mx-auto">
                    <div className="relative flex flex-col md:flex-row items-center justify-center float-right w-full py-3">
                      <span className="w-full md:w-1/3 md:mx-auto pt-1 pl-1 font-bold inline-block float-left text-[#333]">{key}</span>
                      <span className="w-full md:w-2/3 md:mx-auto pt-1 pl-1 inline-block float-right text-justify break-words whitespace-pre-wrap">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
