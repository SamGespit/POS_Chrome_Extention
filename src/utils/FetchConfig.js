const getConfigData = () => {
  fetch(
    "https://raw.githubusercontent.com/Clards/pos-pay-configs/main/eurc.json"
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("configData", JSON.stringify(data));
    })
    .catch((err) => console.error(err));
};

export default getConfigData;
