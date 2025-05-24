import React from "react";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";

const App = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Form />
    </div>
  );
};

export default React.memo(App);
