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
