import React, { useState } from "react";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import Country from "./components/Country/Country";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };
  return (
    <div>
      <Header />
      <Form onSuccess={handleRefresh} />
      <Country refresh={refresh} />

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default React.memo(App);
