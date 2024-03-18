const BASE_URL = "https://fakestoreapi.com";

const postData = async (path, data) => {
  try {
    const res = await fetch(`${BASE_URL}/${path}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.json();
    return json;
  } catch (error) {
    throw new Error("an error occurred!");
  }
};

export { postData };
