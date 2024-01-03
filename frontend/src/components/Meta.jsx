import React from "react";
import { Helmet } from "react-helmet-async";
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to EShop",
  description: "We sell the best products for cheap",
  keywords: "electronics, buy electronics, affordable electroincs",
};

export default Meta;
