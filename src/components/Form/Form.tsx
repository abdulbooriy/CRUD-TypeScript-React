import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { Button, Form, Input, Typography } from "antd";
import type { ICountry } from "../../shared/types";

const { Title } = Typography;

const initialState: ICountry = {
  id: "",
  country_name: "",
  city_name: "",
};

const CountryForm = () => {
  const [formData, setFormData] = useState<ICountry>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newCountry = {
      ...formData,
      id: String(new Date().getTime()),
    };
    setFormData(newCountry);
  };

  return (
    <div className="flex justify-center pt-20">
      <div className="max-w-[450px] w-full border border-gray-300 rounded-lg p-4">
        <Title className="text-center pb-5" level={3}>
          Create Countries
        </Title>
        <Form
          className=""
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
          onSubmitCapture={handleSubmit}>
          <Form.Item<ICountry>
            label="CountryName"
            name="country_name"
            rules={[{ required: true, message: "Please input CountryName!" }]}>
            <Input
              className="text-black h-12"
              placeholder="Enter Country Name"
              value={formData.country_name}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item<ICountry>
            label="CityName"
            name="city_name"
            rules={[{ required: true, message: "Please input CityName!" }]}>
            <Input
              className="text-black h-12"
              placeholder="Enter City Name"
              value={formData.city_name}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full">
              + Add a new Country
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default React.memo(CountryForm);
