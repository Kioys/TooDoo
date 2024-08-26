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

Parse.Cloud.define("CreateTask", async (req) => {
  const { taskTitle, taskDescription } = req.params
  try {
    const Task = Parse.Object.extend("Task")
    const task = new Task();

    task.save({
      taskTitle,
      taskDescription
    })

  } catch (error) {
    throw new Error("Error in hello function: " + error.message);
  }
});

Parse.Cloud.define("GetTask", async (req) => {
  req.log.info(req);
  try {
    const result = await makeHttpRequest();
    return result;
  } catch (error) {
    throw new Error("Error in hello function: " + error.message);
  }
});

Parse.Cloud.define("UpdateTask", async (req) => {
  req.log.info(req);

  try {
    const result = await makeHttpRequest();
    return result;
  } catch (error) {
    throw new Error("Error in hello function: " + error.message);
  }
});

Parse.Cloud.define("DeleteTask", async (req) => {
  req.log.info(req);

  try {
    const result = await makeHttpRequest();
    return result;
  } catch (error) {
    throw new Error("Error in hello function: " + error.message);
  }
});

Parse.Cloud.define("asyncFunction", async (req) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  req.log.info(req);
  return "Hi async";
});

Parse.Cloud.beforeSave("Test", () => {
  throw new Parse.Error(9001, "Saving test objects is not available.");
});
