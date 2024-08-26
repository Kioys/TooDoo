import axios from "axios";
// import Parse from "parse-server"

const makeHttpRequest = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    return response.data;
  } catch (error) {
    throw new Error("Error making HTTP request: " + error.message);
  }
};
