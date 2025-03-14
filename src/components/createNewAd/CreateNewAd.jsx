import React, { useEffect, useState } from "react";
import ScrollBar from "../UI/ScrollBar";
import { PrintOptions, QualityOptions, YolkOptions } from "../static";
import { useForm } from "react-hook-form";
import InputSelect from "../UI/InputSelect";
import axios from "axios";
import { useRouter } from "next/navigation";
import InputField from "../UI/InputField";
import { useToken } from "../hook/useToken/useToken";
import BottomModal from "../Modal/BottomModal";
import SelectCity from "../UI/SelectCity";
import PriceInput from "./PriceInput";
import { formatPrice } from "@/utils/formatPrice";
import { toast } from "react-toastify";

export default function CreateNewAd({ profile }) {
  const router = useRouter();
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { isValid, isDirty, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      origin: "",
      yolk_type: "",
      weight: "",
      quality: "",
      brand: "",
      price: "",
      count: "",
      description: "",
      print_type: "",
    },
  });

  useEffect(() => {
    if (errors.count) {
      errors.count.type === "min" &&
        setErrorMessages([
          ...errorMessages,
          { type: "count", message: "تعداد کارتن باید حداقل 165 باشد." },
        ]);
    } else {
      setErrorMessages(errorMessages.filter((error) => error.type !== "count"));
    }
  }, [errors.count]);

  useEffect(() => {
    if (errors.weight) {
      errors.weight.type === "min" &&
        setErrorMessages([
          ...errorMessages,
          { type: "weight", message: "وزن باید بیشتر از 0 باشد." },
        ]);
    } else {
      setErrorMessages(errorMessages.filter((error) => error.type !== "count"));
    }
  }, [errors.weight]);

  const [token, setToken] = useToken();

  const weight = register("weight", {
    required: true,
    pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
    min: 1,
  });
  const brand = register("brand", { required: true });
  const count = register("count", {
    required: true,
    pattern: /^[0-9]+$/,
    min: 165,
  });
  const price = register("price", {
    required: false,
    onChange: (e) => {
      setValue("price", formatPrice(e.target.value));
    },
  });
  const description = register("description", { required: false });

  const postData = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/loads/add`,
        {
          client: "web",
          origin_field1: data.origin.provinceId, //province id
          origin_field2: data.origin.cityName, //city name
          weight: data.weight,
          count: data.count,
          print_type: data.print_type,
          yolk_type: data.yolk_type,
          box_type: "تست", // string
          stage_type: "تست", // string
          type: "announcement",
          pack_type: "bulk",
          quality: data.quality,
          price: data.price.replace(/,/g, ""), // string
          description: data.description, // string
          person_owner_name: profile.person_owner_name, // string
          owner_name: data.brand, // string
          phones: [null],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        setIsLoading(false);
        toast.info("آگهی شما با موفقیت اضافه شد.");
        document.getElementById("adModal").close();
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast.error("خطایی وجود دارد.");
      setIsLoading(false);
    }
  };
  const onSubmit = (data) => {
    setIsLoading(true);
    postData(data);
  };

  return (
    <BottomModal
      title="ثبت آگهی جدید"
      id="adModal"
      onClose={() => {
        reset();
        setIsDescOpen(false);
      }}
    >
      <form
        method="dialog"
        className="flex justify-between items-center py-2 px-4 border-b border-default-300 bg-surface-secondary"
      >
        <h3 className="text-sm text-tertiary">ثبت آگهی جدید</h3>
        <button className="h-6 w-6">
          <span className="icon-light-bold-Close text-2xl text-[#2D264B]"></span>
        </button>
      </form>
      <div className="bg-surface-secondary addLoad">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ScrollBar>
            <div className="grid grid-cols-2 grid-row-6 gap-x-6 gap-y-4 py-2">
              <InputField
                name={weight.name}
                onChange={weight.onChange}
                inputRef={weight.ref}
                label="وزن کارتن"
                smallText="(کیلوگرم)"
                required={true}
                placeholder="مثلا ۱۲.۵"
                space="col-span-1"
                type="number"
                step="0.01"
              />
              <InputField
                name={count.name}
                onChange={count.onChange}
                inputRef={count.ref}
                label="تعداد کارتن"
                smallText="(حداقل 165)"
                required={true}
                placeholder="مثلا ۳۶۰"
                space="col-span-1"
                type="number"
              />
              <InputField
                name={brand.name}
                onChange={brand.onChange}
                inputRef={brand.ref}
                label="برند"
                required={true}
                placeholder="مثلا چکاوک"
                space="col-span-1"
              />
              <InputSelect
                name="quality"
                label="کیفیت"
                options={QualityOptions}
                register={register}
                setValue={setValue}
                isDirty={isDirty}
                defaultValue={getValues("quality")}
              />
              <InputSelect
                name="print_type"
                label="پرینت"
                options={PrintOptions}
                register={register}
                setValue={setValue}
                isDirty={isDirty}
                defaultValue={getValues("print")}
              />
              <InputSelect
                name="yolk_type"
                label="نوع زرده"
                options={YolkOptions}
                register={register}
                setValue={setValue}
                isDirty={isDirty}
                defaultValue={getValues("yolk_type")}
              />
              <SelectCity
                name="origin"
                label="محل بارگیری"
                register={register}
                setValue={setValue}
                space="col-span-2"
                isDirty={isDirty}
                defaultValue={getValues("origin")}
                isSearch={true}
              />
              <PriceInput
                name={price.name}
                onChange={price.onChange}
                inputRef={price.ref}
              />
              {/* <input
                type="number"
                name={price.name}
                onChange={price.onChange}
                inputRef={price.input}
                value={priceInput}
                className="hidden"
              /> */}
              {/* <InputField
                name={price.name}
                onChange={price.onChange}
                inputRef={price.ref}
                label="قیمت"
                smallText="(تومان)"
                required={false}
                placeholder="مثلا ۴۵,۰۰۰"
                space="col-span-2"
                type="number"
              /> */}
              {isDescOpen ? (
                <InputField
                  name={description.name}
                  onChange={description.onChange}
                  inputRef={description.ref}
                  label="توضیحات"
                  required={false}
                  placeholder="توضیحات بیشتر مانند شرایط پرداخت، تعداد شکسته و..."
                  space="col-span-2"
                  type="text"
                />
              ) : (
                <button
                  className="col-span-2 text-xs text-tertiary text-start"
                  onClick={() => setIsDescOpen(true)}
                >
                  افزودن توضیحات...
                </button>
              )}
            </div>
          </ScrollBar>
          <div className="*:text-danger-900 *:text-xs px-8 space-y-1">
            {errorMessages.map((error, index) => (
              <p key={index}>{error.message}</p>
            ))}
          </div>
          <div className="px-8 py-3 mb-3 w-full bg-inherit">
            <button
              className={`button button-primary w-full ${
                isLoading ? "isLoading" : ""
              } ${isValid ? "" : "disabled"}`}
              disabled={!isValid ? true : isLoading ? true : false}
            >
              ثبت آگهی
            </button>
          </div>
        </form>
      </div>
    </BottomModal>
  );
}
