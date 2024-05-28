import model from "./model/model.mjs";
import view from "./view/view.mjs";
import controller from "./controller/controller.mjs";

onload = init;

function init() {
  model
    .initialize()
    .then(() => {
      view.initialize();
      requestAnimationFrame(animate);
    })
    .catch((error) => {
      console.error(error);
    });
}

function animate(timeNow) {
  let timePrior = timeNow;
  requestAnimationFrame(animate_);
  function animate_(timeNow) {
    model.run(timeNow - timePrior);
    view.run();
    timePrior = timeNow;
    requestAnimationFrame(animate_);
  }
}
