import Image from 'next/image';
import { useForm } from '../context/FormContext';

export default function Step1() {
  const { state, dispatch } = useForm();

  const certifications = ['正看護師', '准看護師', '介護福祉士', '初任者研修', '実務者研修',
                'ケアマネージャー', '保育士', '幼稚園教諭', '理学療法士', '作業療法士', '言語聴覚士', 'その他', '無資格'];

  const handleCertificationsChange = (certification: string) => {
    let newCertifications = [...state.certifications];

    if (newCertifications.includes(certification)) {
      newCertifications = newCertifications.filter((j) => j !== certification);
    } else {
      newCertifications.push(certification);
    }

    dispatch({ type: 'SET_CERTIFICATION', payload: newCertifications });
  };

  const handleNextClick = () => {
    if (state.certifications.length === 0) {
      alert('資格を選択してください');
    } else {
      dispatch({ type: 'SET_STEP', payload: 2 });
    }
  };

  return (
    <div className="lg:w-2/5 mx-auto">
      <h2 className="text-[16px] text-[#12243a] text-center font-bold mt-8">お持ちの資格・免許を選択してください(複数選択可)</h2>
      <div className="md:px-[10%] px-[5%] md:py-[4%] py-[6%] rounded mx-auto md:mb-10 my-8 bg-white">
        <div className="grid grid-cols-2 gap-2">
          {certifications.map((certification) => (
            <button
              key={certification}
              className={`border border-[#bfbec5] text-center mx-auto w-full cursor-pointer h-12 items-center grid rounded ${state.certifications.includes(certification) ? 'bg-brand-accent text-white' : 'text-[#12243a]'}`}
              onClick={() => handleCertificationsChange(certification)}
            >
              {certification}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-cols mx-auto md:px-[10%] md:pb-8 md:w-auto w-[90%]">
        <Image src="/img/nextbtn.png" alt="次へ"
              width={347} height={87} onClick={handleNextClick}
              className="sm:w-[43%] w-[70%] mx-auto cursor-pointer"/>
      </div>
    </div>
  );
}
