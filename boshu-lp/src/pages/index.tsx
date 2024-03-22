import { useForm, FormProvider } from '../context/FormContext';
import { JobDetails } from '../components/JobDetails'; 
import { ProgressBar } from '../components/ProgressBar';
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';
import Step3 from '../components/Step3';
import Step4 from '../components/Step4';

export default function Home() {
  const jobDetails = {
    "職種名": "テスト",
    "会社名／店舗名／施設名": "株式会社〇〇",
    "勤務地": "東京都港区",
    "アクセス": "",
    "雇用形態": "",
    "給与": "テスト",
    "仕事内容": "テスト",
    "福利厚生": "",
    "勤務時間": "",
    "求める人材・資格": "テスト"
  };

  return (
    <div className="md:min-h-screen flex justify-center items-center bg-[#f3fafb]">
      <div className="w-full">
        <FormProvider>
          <FormContent />
        </FormProvider>
        <JobDetails details={jobDetails} />
      </div>
    </div>
  );
}

function FormContent() {
  const { state } = useForm();

  const steps: { [key: number]: JSX.Element } = {
    1: <Step1 />,
    2: <Step2 />,
    3: <Step3 />,
    4: <Step4 />,
  };

  return (
    <div className="md:pb-0 mb-10">
      {state.step < 4 && <ProgressBar currentStep={state.step} />}
      {steps[state.step]}
    </div>
  );
}