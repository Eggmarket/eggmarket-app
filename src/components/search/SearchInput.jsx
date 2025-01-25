"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import advertising from "@/image/advertising.svg";

const SearchInput = () => {
  const [datas, setDatas] = useState([]);
  const [input, setInput] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/api`);
        const data = await response.json();
        setDatas(data || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await fetch(`${API}/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input)
      })
      if (!datas.includes(input) && input !== '') {
        if (datas.length < 10) {
          setDatas([...datas, input]);
        } else {
          datas.shift()
          setDatas([...datas, input]);
        }
      }
      setInput('');
    }
  };

  const lists = [
    {
      icon: "icon-light-outline-Calender-2",
      text: "تاریخچه جستجوهای شما",
      trash: true,
      isTrue: true,
    },
    {
      icon: "icon-light-outline-Activity-1",
      text: "بیشترین جستجوها",
      isTrue: true,
    },
    {
      icon: "icon-icon-ads-empty-1",
      text: "پیشنهاد ویژه",
      isTrue: false,
    },
  ];

  // <<<<<<< HEAD
  //     return (
  //         <>
  //             <div className='flex items-center gap-4 px-6'>
  //                 <form method='dialog' className='pt-6'>
  //                     <button className='outline-none'>
  //                         <span className='icon-Vector text-default-200 text-[11.5px]'></span>
  //                     </button>
  //                 </form>
  //                 <label className='pt-6 w-full'>
  //                     <input
  //                         value={input}
  //                         onChange={(e) => setInput(e.target.value)}
  //                         onKeyDown={handleKeyDown}
  //                         className='outline-none w-full text-default-200'
  //                         type="search"
  //                         placeholder='جستجو در بازار اگمارکت' />
  //                 </label>
  //             </div>
  //             <div className='h-[1.2px] bg-primary mx-2 mt-4'></div>
  //             <div className='mt-2'>
  //                 {
  //                     lists.map((list, index) => (
  //                         <>
  //                             <div className='mt-4 flex px-6' key={index + 1}>
  //                                 <div className='flex items-center gap-2'>
  //                                     <span className={list.icon}></span>
  //                                     <p className='text-sm text-default-200'>{list.text}</p>
  //                                 </div>
  //                                 {list.trash && <span
  //                                     onClick={async () => {
  //                                         await fetch('http://localhost:3000/api', { method: 'DELETE' })
  //                                         setDatas([])
  //                                     }}
  //                                     className='icon-trash mr-auto'></span>}
  //                             </div>
  //                             {list.isTrue && <>
  //                                 <div key={index + 1} className='h-8 mr-6 mt-4 overflow-x-auto grid auto-cols-max grid-flow-col gap-2 overscroll-contain items-center'>
  //                                     {
  //                                         datas.map((data, index) => (<div key={index + 1}
  //                                             className='text-sm text-default-200 py-1 px-2 rounded-full text-center border-[1px] border-solid border-default-100'
  //                                             onClick={() => setInput(data)}
  //                                         >{data}</div>))
  //                                     }
  //                                 </div>
  //                                 <div key={index + 1} className='h-px mt-[14px] bg-default-100 w-full'></div>
  //                             </>}
  //                         </>
  //                     ))
  //                 }
  //                 {
  //                     [{ city: 'چکاوک', weight: '۱۲.۴۰۰', filters: ['زرده ساده', ' با پرینت', '۳۶۰ کارتن ', ' لوکس', ' کاشان'] }].map((list, index) => (
  //                         <div key={index + 1} className='max-w-[364px] h-[78px] mx-4 rounded-lg shadow-[0px_1px_4px_0px_#00000026] mt-[18px] py-3 px-4'>
  //                             <div className='flex items-center'>
  //                                 <Image src={advertising} alt='advertising' />
  //                                 <p className='text-default-700 text-xs mr-[2.5px]'>برند</p>
  //                                 <p className='text-tertiary font-bold mr-1'>{list.city}</p>
  //                                 <p className='text-default-500 mx-1'>|</p>
  //                                 <p className='text-tertiary font-bold font-["vazir"]'>{list.weight}<span className='text-default-700 text-sm font-normal'> کیلوگرم</span></p>
  //                             </div>
  //                             <div key={index + 1} className='mt-2 flex'>{list.filters.map((filter, index) => (<p key={index + 1} className='text-default-700 text-sm font-normal'>{filter}{index < list.filters.length - 1 && ' -'}</p>))}</div>
  //                         </div>
  //                     ))
  //                 }
  // =======
  return (
    <>
      <div className="flex items-center gap-4 border-b border-primary m-2 p-4">
        <form method="dialog" className="flex items-center justify-center">
          <button className="h-6 w-6 flex items-center justify-center outline-none">
            <span className="icon-light-bold-Right-1 text-default-900 text-2xl"></span>
          </button>
        </form>
        <label className="w-full">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="outline-none w-full placeholder:text-default-400 text-default-900 font-medium"
            type="search"
            placeholder="جستجو در بازار اگمارکت"
          />
        </label>
      </div>
      <div className="mt-2">
        {lists.map((list, index) => (
          <div key={index + 1}>
            <div className="mt-4 flex px-6" key={index + 1}>
              <div className="flex items-center gap-2">
                <span
                  className={`${list.icon} text-default-600 text-xl`}
                ></span>

                <p className="text-sm text-default-600">{list.text}</p>
              </div>
              {list.trash && (
                <span
                  onClick={async () => {
                    await fetch(`${API}/api`, {
                      method: "DELETE",
                    });
                    setDatas([]);
                  }}
                  className="icon-light-outline-Delete-2 mr-auto text-xl cursor-pointer"
                ></span>
              )}
            </div>
            {list.isTrue && (
              <>
                <div className="h-8 mr-6 mt-4 overflow-x-auto grid auto-cols-max grid-flow-col gap-2 overscroll-contain items-center">
                  {datas.map((data, index) => (
                    <div
                      key={index + 1}
                      className="text-sm text-default-700 py-1 px-2 rounded-full text-center border border-solid border-default-300"
                      onClick={() => setInput(data)}
                    >
                      {data}
                    </div>
                  ))}
                </div>
                <div className="h-px mt-[14px] bg-default-300 w-full"></div>
              </>
            )}
          </div >
        ))}
        {[
          {
            city: "چکاوک",
            weight: "۱۲.۴۰۰",
            filters: [
              "زرده ساده",
              " با پرینت",
              "۳۶۰ کارتن ",
              " لوکس",
              " کاشان",
            ],
          },
        ].map((list, index) => (
          <div
            key={index + 1}
            className="max-w-[364px] h-[78px] mx-4 rounded-lg shadow-[0px_1px_4px_0px_#00000026] mt-[18px] py-3 px-4"
          >
            <div className="flex items-center">
              <Image src={advertising} alt="advertising" />
              <p className="text-default-700 text-xs mr-[2.5px]">برند</p>
              <p className="text-tertiary font-bold mr-1">{list.city}</p>
              <p className="text-default-700 mx-1">|</p>
              <p className='text-tertiary font-bold font-["vazir"]'>
                {list.weight}
                <span className="text-default-700 text-sm font-normal">
                  {" "}
                  کیلوگرم
                </span>
              </p>
            </div>
            <div className="mt-2 flex">
              {list.filters.map((filter, index) => (
                <p key={index + 1} className="text-default-700 text-sm font-normal">
                  {filter}
                  {index < list.filters.length - 1 && " -"}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div >
    </>
  );
};

export default SearchInput;
