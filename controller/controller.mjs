console.log("Loaded controller");

export const state = {
  isUpdated: false,
};

window.addEventListener("keydown", handleKD);
window.addEventListener("keyup", handleKU);

function handleKD(e) {
  if (state[e.key]) return;
  state[e.key] = true;
  state.isUpdated = true;
}

function handleKU(e) {
  state[e.key] = false;
  state.isUpdated = true;
}

export default { state };
