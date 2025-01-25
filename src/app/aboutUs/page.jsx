"use client";
import { useRouter } from "next/navigation";
import React from "react";

function Page() {
  const { back } = useRouter();
  return (
    <div className="min-h-screen bg-default-50">
      <div className="sticky top-0 bg-inherit p-6 z-10 flex gap-4 justify-start items-center">
        <button
          className="icon-light-bold-Right-1 text-2xl"
          onClick={() => back()}
        ></button>
        <h3 className="font-semibold text-xl text-default-900">
          درباره اگمارکت
        </h3>
      </div>
      <div className="px-6 py-4">
        <h1 className="font-semibold">
          محصولی از شرکت سامانه پیروزه دیبا با مدیریت مهدی قمی پور
        </h1>
        <br />
        <p className="text-sm">
          بخاطر اینکه از اگمارکت استفاده میکنید از شما سپاسگزاریم.
        </p>
        <br />
        <p className="text-sm">
          اگمارکت بازار آنلاین تجارت B2B در سراسر کشور است که در زمینه ی خرید و
          فروش تخم مرغ خوراکی (عمده فروشی) و ایجاد تعامل و مبادلات تجاری مابین
          تامین کنندگان و خریداران فعالیت میکند. خریداران میتوانند با استفاده از
          اگمارکت از تامین کنندگان به واسطه ی سیستم ارتباطی مستقیم، استعلام قیمت
          محصول مورد نظر را دریافت کنند. ارتباط بدون واسطه بین خریداران و تامین
          کنندگان از جمله مزیت های اگمارکت است که در اختیار کاربران قرار میدهد.
          علاوه بر این تولید کنندگان و بنکداران و توزیع کنندگان نیز میتوانند با
          پیوستن به دیگر تامین کنندگان در اگمارکت، محصولات خود را از طریق این
          بازار آنلاین B2B به فروش برسانند.
        </p>
        <br />
        <p className="text-sm">
          در صورت داشتن هر گونه سوال، انتقاد و یا پیشنهاد میتوانید از طریق
          تلگرام با ما در ارتباط باشید:
        </p>
        <br />
        <p className="text-sm">آدرس: قم، بلوار بوعلی، نبش کوچه 2، پلاک 186</p>
        <br />
        <p className="text-sm">شماره تماس:</p>
        <p dir="ltr">
          025 - 3294 2612 <br /> 025 - 3294 2613
        </p>
      </div>
    </div>
  );
}

export default Page;
