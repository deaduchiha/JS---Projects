const fetchData = async () => {
  try {
    const res = await fetch("assets/data.json");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { fetchData };
