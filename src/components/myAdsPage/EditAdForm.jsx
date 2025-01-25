import React, { useEffect, useState } from "react";
import ScrollBar from "../UI/ScrollBar";
import { PrintOptions, QualityOptions, YolkOptions } from "../static";
import { useForm } from "react-hook-form";
import InputSelect from "../UI/InputSelect";
import axios from "axios";
import { useToken } from "../hook/useToken/useToken";
import InputField from "../UI/InputField";
import { toast } from "react-toastify";

export default function EditAdForm({ card, provinces, setSelected, getData }) {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDescOpen, setIsDescOpen] = useState(
    card.description === "" ? false : true
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isValid, isDirty },
  } = useForm({
    defaultValues: {
      origin: provinces.find((item) => item.id === card.origin_field1),
      yolk_type: card.yolk_type,
      weight: card.weight,
      quality: card.quality,
      brand: card.owner_name,
      price: card.price,
      count: card.count,
      description: card.description,
      print_type: card.print_type,
    },
  });

  const [token, setToken] = useToken();

  const weight = register("weight", { required: true, pattern: /^[0-9]+$/ });
  const count = register("count", { required: true, pattern: /^[0-9]+$/ });
  const brand = register("brand", { required: true });
  const price = register("price", { required: false, pattern: /^[0-9]+$/ });
  const description = register("description", { required: false });

  const onSubmit = (data) => {
    setIsLoading(true);
    const postData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/loads/edit`,
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
            price: data.price, // string
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
          reset();
          setSelected("");
          document.getElementById("editAdModal").close();
          getData();
          toast.info("آگهی با موفقیت ویرایش شد.", { autoClose: 2000 });
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    postData();
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_EGG_MARKET}/API/customers/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        const data = await res.json();
        setProfile(data.profile);
      } catch (err) {
        console.error("data failed:", err);
      }
    };
    getProfile();
  }, []);

  return (
    <form className="editLoad py-2" onSubmit={handleSubmit(onSubmit)}>
      <ScrollBar>
        <div className="grid grid-cols-2 grid-row-6 gap-x-6 gap-y-4">
          <InputField
            name={weight.name}
            onChange={weight.onChange}
            inputRef={weight.ref}
            label="وزن کارتن"
            smallText="(کیلوگرم)"
            required={true}
            placeholder="مثلا 12.5"
            space="col-span-1"
            type="number"
          />
          <InputField
            name={count.name}
            onChange={count.onChange}
            inputRef={count.ref}
            label="تعداد کارتن"
            smallText="(کیلوگرم)"
            required={true}
            placeholder="مثلا 360"
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
          {/* <InputSelect
            name="pack_type"
            label="بسته بندی"
            options={PackOptions}
            register={register}
            setValue={setValue}
            isDirty={isDirty}
            defaultValue={getValues("pack_type")}
          /> */}
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
            defaultValue={getValues("print_type")}
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
          <InputSelect
            name="origin"
            label="محل بارگیری"
            options={provinces}
            register={register}
            setValue={setValue}
            space="col-span-2"
            isSearch={true}
            isDirty={isDirty}
            defaultValue={getValues("origin")}
          />
          <InputField
            name={price.name}
            onChange={price.onChange}
            inputRef={price.ref}
            label="قیمت"
            smallText="(تومان)"
            required={false}
            space="col-span-2"
            type="number"
          />
          {isDescOpen ? (
            <InputField
              name={description.name}
              onChange={description.onChange}
              inputRef={description.ref}
              label="توضیحات"
              required={false}
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
      <div className="bg-white border-t-default-300 px-6 py-4 w-full">
        <button
          className={`button button-primary w-full ${
            isLoading ? "isLoading" : ""
          } ${isValid ? "" : "disabled"} ${isDirty ? "" : "disabled"}`}
          disabled={!isValid || isLoading || !isDirty ? true : false}
        >
          ویرایش آگهی
        </button>
      </div>
    </form>
  );
}
