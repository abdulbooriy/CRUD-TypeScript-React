import { useState, type ChangeEvent, type FormEvent, memo } from "react";
import { Button, Form, Input, Typography } from "antd";
import type { ICountry } from "../../shared/types";
import { api } from "../../api";
import toast from "react-hot-toast";

const { Title } = Typography;

export const initialState: ICountry = {
  id: "",
  country_name: "",
  city_name: "",
  image: "",
};

const CountryForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [formData, setFormData] = useState<ICountry>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    api
      .post("/countries", formData)
      .then(() => {
        toast.success("Country is successfully created !");
        setFormData(initialState);
        onSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center pt-20">
      <div className="max-w-[450px] w-full border border-gray-400 rounded-lg p-4">
        <Title className="text-center pb-5" level={3}>
          Create Countries
        </Title>
        <Form
          name="basic"
          autoComplete="off"
          layout="vertical"
          onSubmitCapture={handleSubmit}>
          <Form.Item<ICountry>
            label="CountryName"
            rules={[{ required: true, message: "Please input CountryName!" }]}>
            <Input
              className="text-black h-12"
              placeholder="Enter Country Name"
              name="country_name"
              value={formData.country_name}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item<ICountry>
            label="CityName"
            rules={[{ required: true, message: "Please input CityName!" }]}>
            <Input
              className="text-black h-12"
              placeholder="Enter City Name"
              name="city_name"
              value={formData.city_name}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full"
              style={{
                height: "50px",
                fontFamily: "sans-serif",
                fontWeight: "bolder",
              }}>
              + Add a new Country
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default memo(CountryForm);
