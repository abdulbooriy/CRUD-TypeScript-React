import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Button, Form, Input, Typography } from "antd";
import type { ICountry } from "../../shared/types";
import Country from "../Country/Country";
import { api } from "../../api";

const { Title } = Typography;

export const initialState: ICountry = {
  id: "",
  country_name: "",
  city_name: "",
  image: "",
};

const CountryForm = () => {
  const [formData, setFormData] = useState<ICountry>(initialState);
  const [data, setData] = useState<ICountry[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    formData.id = String(new Date().getTime());
    setData(prev => ([...prev, formData]));
  };

  useEffect(() => {
    api
      .post("/countries", {
        data,
      })
      .then((res) => setData(res.data))
      .catch((error) => console.log(error))
      .finally(() => {});
  }, []);

  console.log(data);

  return (
    <div className="flex flex-col items-center pt-20">
      <div className="max-w-[450px] w-full border border-gray-300 rounded-lg p-4">
        <Title className="text-center pb-5" level={3}>
          Create Countries
        </Title>
        <Form
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
              name="country_name"
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
              name="city_name"
              value={formData.city_name}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item<ICountry>
            label="Image"
            name="image"
            rules={[
              { required: true, message: "Please input Country Image!" },
            ]}>
            <Input
              className="text-black h-12"
              placeholder="Enter Country Image"
              type="file"
              name="image"
              value={formData.image}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  setFormData((prev) => ({ ...prev, image: imageUrl }));
                }
              }}
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
      <div>
        <Country data={data} />
      </div>
    </div>
  );
};

export default React.memo(CountryForm);
