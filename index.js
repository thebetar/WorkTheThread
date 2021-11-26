const fs = require("fs");
const { Worker } = require("worker_threads");

function WorkTheThread(input, ...args) {
  const filename =
    typeof input === "function" ? writeFuncAndGetFilename(input) : null;

  if (filename === null) {
    throw "Wrong argument for input";
  }
  return new Promise((resolve, reject) => {
    const worker = new Worker(filename, {
      workerData: args,
    });
    worker.once("message", resolve);
    worker.on("error", (error) => {
      console.error(error);
      reject(error);
    });
    worker.on("exit", (code) => {
      if (code !== 0) reject(new Error(`stopped with  ${code} exit code`));
    });
  }).finally(() => {
    fs.unlinkSync(filename);
  });
}

function writeFuncAndGetFilename(fn) {
  const filename = `./tmp_files/tmp_fn_file_${Math.random()}.js`;
  const filecontent = `
        const WorkerThreads = require('worker_threads');

        const { parentPort, workerData } = WorkerThreads;

        parentPort.postMessage(${fn.name}(...workerData));

        ${fn.toString()}
    `;
  fs.writeFileSync(filename, filecontent);
  return filename;
}

module.exports = WorkTheThread;
