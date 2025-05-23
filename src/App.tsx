import React from "react";
// import Country from "./components/Country/Country";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";

const App = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Form />
      {/* <Country /> */}
    </div>
  );
};

export default React.memo(App);
