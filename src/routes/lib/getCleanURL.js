const getGoodString = (category) => {
  const mapp = {
    "Software Engineering👩‍💻": "softwareengg",
  };
  return mapp[category];
};

const getFancyString = (str) => {
  const mapp = {
    softwareengg: "Software Engineering👩‍💻",
  };
  return mapp[str];
};
export { getFancyString, getGoodString };
