import React, { useEffect, useState } from "react";
import { api } from "../../api";
import type { ICountry } from "../../shared/types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Country = () => {
  const [data, setData] = useState<ICountry[]>([]);

  useEffect(() => {
    api
      .get("/countries")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => {});
  }, []);

  return (
    <div className="container mx-auto flex flex-wrap justify-center gap-5 py-10">
      {data?.map((country) => (
        <div key={country.id} className="w-[350px]">
          <Card className="text-center">
            <CardMedia
              sx={{ height: 200 }}
              image="https://thebluntpost.com/wp-content/uploads/2021/12/yerevan-header-1024x629.jpg"
              title="green iguana"
            />
            <CardContent className="text-center">
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="line-clamp-1 font-medium">
                {country?.country_name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {country?.city_name}
              </Typography>
            </CardContent>
            <CardActions className="flex justify-center">
              <Button size="large">Edit</Button>
              <Button size="large">Delete</Button>
            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default React.memo(Country);
