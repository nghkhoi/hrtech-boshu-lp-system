import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useForm } from '../context/FormContext';

export default function Step2() {
  const { state, dispatch } = useForm();

  const [daysInMonth, setDaysInMonth] = useState(31);

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = { ...state.name, lastName: event.target.value };
    dispatch({ type: 'SET_NAME', payload: newName });
  };

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = { ...state.name, firstName: event.target.value };
    dispatch({ type: 'SET_NAME', payload: newName });
  };

  const handleBirthYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newBirthdate = { ...state.birthdate, year: event.target.value };
    dispatch({ type: 'SET_BIRTHDATE', payload: newBirthdate });
  };

  const handleBirthMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newBirthdate = { ...state.birthdate, month: event.target.value };
    dispatch({ type: 'SET_BIRTHDATE', payload: newBirthdate });
  };

  const handleBirthDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newBirthdate = { ...state.birthdate, day: event.target.value };
    dispatch({ type: 'SET_BIRTHDATE', payload: newBirthdate });
  };

  const handleBackClick = () => {
    dispatch({ type: 'SET_STEP', payload: 1 });
  };

  const handleNextClick = () => {
    if (state.name.lastName === '' || state.name.firstName === '')
      alert('氏名を入力してください');
    else if (state.birthdate.year === '' || state.birthdate.month === '' || state.birthdate.day === '')
      alert('生年月日を選択してください');
    else
      dispatch({ type: 'SET_STEP', payload: 3 });
  };

  // 月または年が変わると、選択した月の日数を更新
  useEffect(() => {
    const year = parseInt(state.birthdate.year);
    const month = parseInt(state.birthdate.month);
    if (month === 2) {
      if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
        setDaysInMonth(29);
      } else {
        setDaysInMonth(28);
      }
    } else if ([4, 6, 9, 11].includes(month)) {
      setDaysInMonth(30);
    } else {
      setDaysInMonth(31);
    }
  }, [state.birthdate.year, state.birthdate.month]);

  return (
    <div className="lg:w-2/5 mx-auto">
      <h2 className="text-[16px] text-[#12243a] text-center font-bold mt-8">お名前と生年月日を入力してください。</h2>
      <div className="md:px-[10%] px-[5%] md:py-[4%] py-[6%] rounded mx-auto md:mb-10 my-8 bg-white">

        <div className="inline-block w-full space-y-8">
          <div className="flex font-bold items-center mb-1">
            <label className="text-[16px] text-[#12243a]">氏名</label>
            <div className="md:text-xs text-[9px] bg-[#E50011] px-2 text-white rounded ml-2 h-5 pb-2 leading-5">必須</div>
          </div>
            <div className="grid grid-cols-2 gap-2 items-end">
              <input
                type="text"
                placeholder="山田"
                value={state.name.lastName}
                onChange={handleLastNameChange}
                className="border border-[#bfbec5] mx-auto w-full cursor-pointer h-12 items-center grid rounded pl-4 text-[#12243a] bg-[#f5f5f5]"
              />
              <input
                type="text"
                placeholder="花子"
                value={state.name.firstName}
                onChange={handleFirstNameChange}
                className="border border-[#bfbec5] mx-auto w-full cursor-pointer h-12 items-center grid rounded pl-4 text-[#12243a] bg-[#f5f5f5]"
              />
            </div>
            <div className="mb-4">
              <div className="flex font-bold items-center mb-1">
                <label className="text-[16px] text-[#12243a]">生年月日</label>
                <div className="md:text-xs text-[9px] bg-[#E50011] px-2 text-white rounded ml-2 h-5 pb-2 leading-5">必須</div>
              </div>
              <div className="grid grid-cols-3 gap-2 items-end">
                <select value={state.birthdate.year} onChange={handleBirthYearChange}
                    className="border border-[#bfbec5] mx-auto w-full cursor-pointer h-12 items-center grid rounded text-[#12243a] bg-[#f5f5f5] text-center">
                  <option value="">年</option>
                  {Array.from({ length: 87 }, (_, i) => 2006 - i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select value={state.birthdate.month} onChange={handleBirthMonthChange}
                    className="border border-[#bfbec5] mx-auto w-full cursor-pointer h-12 items-center grid rounded text-[#12243a] bg-[#f5f5f5] text-center">
                  <option value="">月</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select value={state.birthdate.day} onChange={handleBirthDayChange}
                    className="border border-[#bfbec5] mx-auto w-full cursor-pointer h-12 items-center grid rounded text-[#12243a] bg-[#f5f5f5] text-center">
                  <option value="">日</option>
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            </div>
        </div>

      </div>
      <div className="flex flex-cols mx-auto md:px-[10%] md:pb-8 md:w-auto w-[90%]">
          <Image src="/img/backbtn.png" alt="次へ"
                width={154} height={81} onClick={handleBackClick}
                className="object-contain sm:w-[20%] w-[29%] cursor-pointer"/>
          <Image src="/img/nextbtn.png" alt="次へ"
                width={347} height={87} onClick={handleNextClick}
                className="object-contain sm:w-[43%] w-[59%] ml-auto mr-0 cursor-pointer"/>
      </div>
    </div>
  );
}
