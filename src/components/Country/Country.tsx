import React, { type FC } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface CountryType {
  country_name: string;
  city_name: string;
  image: string;
  id: string | number;
}

interface IProps {
  data: CountryType[];
}

const Country: FC<IProps> = ({ data }) => {
  return (
    <div className="container mx-auto flex flex-wrap justify-center gap-7 py-10">
      {Array.isArray(data) &&
        data.map((country) => (
          <div key={country?.id} className="w-[350px]">
            <Card className="text-center">
              <CardMedia
                sx={{ height: 200 }}
                image={country?.image}
                title={country?.city_name}
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
