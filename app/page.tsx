"use client";
import Buttons from "@/components/Buttons";
import Charts from "@/components/Charts";
import Input from "@/components/Input";
import { AdminType } from "@/type";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function Home() {
  const [Admin, setAdmin] = useState<AdminType>();
  const [id, setId] = useState(0);
  const [chargeCustomers, setChargeCustomers] = useState(
    Admin?.charge_customers || false
  );
  const [amount, setAmount] = useState({
    category_6: Admin?.amount?.category_6 || 0,
    category_7: Admin?.amount?.category_7 || 0,
    category_8: Admin?.amount?.category_8 || 0,
    category_9: Admin?.amount?.category_9 || 0,
    category_10: Admin?.amount?.category_10 || 0,
  });

  //Use Router to Navigate
  const route = useRouter();

  //Fetch Admin when user Id changes
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios(`https://stg.dhunjam.in/account/admin/${id}`);
        if (res.data.status == 200) {
          setAdmin(res.data.data);
          setAmount({ ...res.data.data.amount });
          setChargeCustomers(res.data.data.charge_customers);
        } else {
          console.log("User Not Found");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdmin();
  }, [id]);

  //If No Id Redirect to Sign In
  useEffect(() => {
    const myValue = localStorage.getItem("id");
    if (myValue) {
      setId(parseInt(myValue));
    } else {
      route.push("/signin");
    }
  }, []);

  //Set Amount Of Inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setAmount((pre) => ({ ...pre, [name]: parseInt(value) }));
  };

  //Save Changes
  const handleSave = async () => {
    try {
      const res = await axios.put(
        `https://stg.dhunjam.in/account/admin/${id}`,
        {
          amount,
        }
      );
      if (res.data.status == 200) {
        toast.success("Changes Saved !!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setAmount({ ...res.data.data.amount });
      } else {
        console.log("User Not Found");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  //Save Button Disable Logic
  let isDisabled =
    amount.category_10 > 79 &&
    amount.category_9 > 59 &&
    amount.category_8 > 39 &&
    amount.category_7 > 19 &&
    amount.category_6 > 99 &&
    chargeCustomers;

  //Radio Button Logic
  const handleChargeCustomersChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value === "true"; // Convert the string to a boolean
    setChargeCustomers(newValue);
  };
  return (
    <main className="mx-auto  flex min-h-screen w-full p-8 md:p-24 justify-center bg-[#030303] text-white">
      <section className="flex md:w-[38rem] w-full flex-col space-y-10">
        <h1 className="text-center text-4xl font-medium">
          {Admin?.name} {Admin?.location} On Dhun Jam
        </h1>

        <div className="mb-5 flex justify-between items-center md:flex-row flex-col gap-8">
          <label className=" block text-base font-medium ">
            Are you coming to the event?
          </label>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <input
                type="radio"
                name="radio1"
                id="radioButton1"
                className="h-5 w-5"
                value="true"
                checked={chargeCustomers}
                onChange={handleChargeCustomersChange}
              />
              <label
                htmlFor="radioButton1"
                className="pl-3 text-base font-medium "
              >
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="radio1"
                id="radioButton2"
                className="h-5 w-5"
                value="false"
                checked={!chargeCustomers}
                onChange={handleChargeCustomersChange}
              />
              <label
                htmlFor="radioButton2"
                className="pl-3 text-base font-medium "
              >
                No
              </label>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-between items-center md:flex-row flex-col gap-8">
          <label className=" block text-base font-medium ">
            Custom song request amount
          </label>
          <Input
            name="category_6"
            onChange={(e) => handleChange(e)}
            value={amount?.category_6}
            disabled={chargeCustomers}
            width="full"
          />
        </div>
        <div className="flex w-full justify-between items-center md:flex-row flex-col gap-8">
          <label className=" block text-base font-medium w-[250px]">
            Regular song request amounts, from high to low
          </label>
          <div className="md:w-[300px] w-full flex gap-2 justify-end">
            <Input
              name="category_7"
              onChange={(e) => handleChange(e)}
              value={amount?.category_7}
              disabled={chargeCustomers}
            />
            <Input
              name="category_8"
              onChange={(e) => handleChange(e)}
              value={amount?.category_8}
              disabled={chargeCustomers}
            />
            <Input
              name="category_9"
              onChange={(e) => handleChange(e)}
              value={amount?.category_9}
              disabled={chargeCustomers}
            />
            <Input
              name="category_10"
              onChange={(e) => handleChange(e)}
              value={amount?.category_10}
              disabled={chargeCustomers}
            />
          </div>
        </div>
        {chargeCustomers && <Charts amount={amount} />}
        <Buttons text="Save" onClick={handleSave} disabled={isDisabled} />
      </section>
    </main>
  );
}
