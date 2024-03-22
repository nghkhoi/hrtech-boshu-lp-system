import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from '../context/FormContext';
import appConfig from '../config';

export default function Step3() {
  const { state, dispatch } = useForm();

  const prefectures = ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県',
                      '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県',
                      '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府',
                      '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
                      '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県',
                      '宮崎県', '鹿児島県', '沖縄県']; 
 
  const [currentCities, setCurrentCities] = useState<string[]>([]);

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_PHONE_NUMBER', payload: event.target.value });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_EMAIL', payload: event.target.value });
  };

  const handlePrefectureChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newAddress = { ...state.address, prefecture: event.target.value };
    dispatch({ type: 'SET_ADDRESS', payload: newAddress });

    // 選択した都道府県に対応する市区町村名一覧をAPIから取得
    try {
      const response = await axios.post('https://uz2y65obak.execute-api.ap-northeast-1.amazonaws.com/get_city_from_pref', {pref_id: event.target.selectedIndex});
      const cityNames = response.data.data.map((city: {name: string}) => city.name);
    
      // currentCitiesを取得した市区町村名一覧で更新
      setCurrentCities(cityNames);

      console.log(`市区町村名一覧取得済: ${response.status}`);
    } catch (error) {
      // API呼び出しに失敗した場合、currentCitiesを空の配列に設定
      setCurrentCities([' ']);

      console.error(`市区町村名一覧取得エラー: ${error}`);
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newAddress = { ...state.address, city: event.target.value };
    dispatch({ type: 'SET_ADDRESS', payload: newAddress });
  };

  const handleBackClick = () => {
    dispatch({ type: 'SET_STEP', payload: 2 });
  };

  const handleSubmitClick = async () => {
    const phoneNumberPattern = /^0\d{10}$/;
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!phoneNumberPattern.test(state.phoneNumber))
      alert('電話番号を正しい形式で入力してください (ハイフン無しの11桁)');
    else if (!emailPattern.test(state.email))
      alert('メールアドレスを正しい形式で入力してください');
    else if (state.address.prefecture === '')
      alert('都道府県を選択してください');
    else if (state.address.city === '')
      alert('市区町村を入力してください');
    else
    {
      await updateDatabase();
      dispatch({ type: 'SET_STEP', payload: 4 });
    }
  };

  const updateDatabase = async () => {
    const application = {
      certs: state.certifications,
      first_name: state.name.firstName,
      last_name: state.name.lastName,
      birth_date: `${state.birthdate.year}-${state.birthdate.month.padStart(2, '0')}-${state.birthdate.day.padStart(2, '0')}`,
      phone_no: state.phoneNumber,
      email: state.email, // 複合キーのソートキー構成
      adr_prefecture: state.address.prefecture, 
      adr_city: state.address.city,
    };

    console.log (`応募者: ${JSON.stringify(application, null, 3)}`);

    try {
      const selectedJobID = '求人テスト011';

      const apiRoute =  `${appConfig.ProdAPI}/${appConfig.JobID}/applications`;

      const response = await axios.put(apiRoute, application);

      console.log(`応募済み: ${response.status}`);
    } catch (error) {
      console.error(`応募エラー: ${error}`);
    }
  };

  return (
    <div className="lg:w-2/5 mx-auto">
      <h2 className="text-[16px] text-[#12243a] text-center font-bold mt-8">お持ちの資格・免許を選択してください(複数選択可)</h2>
      <div className="md:px-[10%] px-[5%] md:py-[4%] py-[6%] rounded mx-auto md:mb-10 my-8 bg-white">
        <div className="inline-block w-full space-y-8">
          <div>
            <div className="flex font-bold items-center mb-1">
              <label className="text-[16px] text-[#12243a]">電話番号</label>
              <div className="md:text-xs text-[9px] bg-[#E50011] px-2 text-white rounded ml-2 h-5 pb-2 leading-5">必須</div>
              <div>　※ハイフンは不要です</div>
            </div>
            <input
              type="tel"
              placeholder="09012345678"
              value={state.phoneNumber}
              onChange={handlePhoneNumberChange}
              className="border border-[#bfbec5] mx-auto w-full cursor-pointer h-12 items-center grid rounded pl-4 text-[#12243a] bg-[#f5f5f5]"
            />
          </div>
          <div>
            <div className="flex font-bold items-center mb-1">
              <label className="text-[16px] text-[#12243a]">メールアドレス</label>
              <div className="md:text-xs text-[9px] bg-[#E50011] px-2 text-white rounded ml-2 h-5 pb-2 leading-5">必須</div>
            </div>
            <input
              type="email"
              placeholder="example@xxx.xxx"
              value={state.email}
              onChange={handleEmailChange}
              className="border border-[#bfbec5] mx-auto w-full cursor-pointer h-12 items-center grid rounded pl-4 text-[#12243a] bg-[#f5f5f5]"
            />
          </div>
          <div>
            <div className="flex font-bold items-center mb-1">
              <label className="text-[16px] text-[#12243a]">都道府県・市区町村名</label>
              <div className="md:text-xs text-[9px] bg-[#E50011] px-2 text-white rounded ml-2 h-5 pb-2 leading-5">必須</div>
            </div>
            <div className="grid grid-cols-2 gap-2 items-end">
              <select value={state.address.prefecture} onChange={handlePrefectureChange} className="border border-[#bfbec5] mx-auto w-full cursor-pointer h-12 items-center grid rounded pl-4 text-[#12243a] bg-[#f5f5f5]">
                <option value="">都道府県</option>
                {prefectures.map((prefecture, index) => (
                <option key={index} value={prefecture}>
                  {prefecture}
                </option>
                ))}
              </select>
              <select value={state.address.city} onChange={handleCityChange} className="border border-[#bfbec5] mx-auto w-full cursor-pointer h-12 items-center grid rounded px-4 text-[#12243a] bg-[#f5f5f5]">
                <option value="">市区町村</option>
                {currentCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
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
          <Image src="/img/entrybtn.png" alt="応募する"
                width={348} height={88} onClick={handleSubmitClick}
                className="object-contain sm:w-[43%] w-[59%] ml-auto mr-0 cursor-pointer"/>
      </div>
    </div>
  );
}
