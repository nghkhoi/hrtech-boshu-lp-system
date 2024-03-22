import { useForm } from '../context/FormContext';

export default function Step4() {
  const { state } = useForm();

  return (
    <div className="lg:w-2/5 mx-auto">
      <div className="md:pb-0 mb-10">
        <div className="md:px-[10%] px-[5%] md:py-[4%] py-[6%] rounded mx-auto md:mb-10 my-8 bg-white">
          <div className="inline-block">
            <div className="font-bold my-2">
              <div className="mx-auto md:text-2xl text-xl space-y-4 px-4">
                <p>ご応募ありがとうございます。</p>
                <p>採用担当者よりご連絡させて頂きます。</p>
                <p>今しばらくお待ちくださいませ。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
