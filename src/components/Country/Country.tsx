import { memo, useEffect, useState } from "react";
import type { ICountry } from "../../shared/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { api } from "../../api";
import toast from "react-hot-toast";

const { Meta } = Card;

const defaultImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBpiSjG1wGdbJAxfiekT2zMNuzvVyPubCRdg&s";

const Country = ({ refresh }: { refresh: boolean }) => {
  const [data, setdata] = useState<ICountry[]>([]);

  useEffect(() => {
    api
      .get("/countries")
      .then((res) => setdata(res.data))
      .catch((e) => console.log(e))
      .finally(() => {});
  }, [refresh]);

  const handleDelete = (id: number | string) => {
    if (confirm("Are you sure you want to delete this Country ?")) {
      api
        .delete(`/countries/${id}`)
        .then(() => {
          toast.success("Country is successfully deleted !");
          setdata((prevData) =>
            prevData.filter((country) => country.id !== id)
          );
        })
        .catch((error) => toast.error(error))
        .finally(() => {});
    }
  };

  return (
    <div className="container mx-auto py-20">
      <div className="flex flex-wrap gap-6 justify-center">
        {data?.map((country: ICountry) => (
          <Card
            key={country?.id}
            hoverable
            className="shadow-lg"
            style={{ width: 300 }}
            cover={
              <img
                alt={country?.city_name}
                src={country?.image || defaultImage}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = defaultImage;
                }}
                style={{
                  height: "220px",
                  objectFit: "cover",
                }}
              />
            }
            actions={[
              <EditOutlined key="edit" style={{ fontSize: "20px" }} />,
              <DeleteOutlined
                onClick={() => handleDelete(country.id ?? "")}
                key="delete"
                style={{ fontSize: "20px" }}
              />,
            ]}>
            <Meta
              className="text-center"
              title={
                <h3 className="text-2xl font-semibold text-gray-800">
                  {country?.country_name}
                </h3>
              }
              description={
                <p className="text-[18px] text-gray-600 font-medium">
                  {country?.city_name}
                </p>
              }
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default memo(Country);
