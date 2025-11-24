async function handlerCreateUser(req, res) {
  res.json({ msg: "you are connected to server" });
}

async function handlerGetUser(req, res) {
  res.json({ msg: "you are connected to server" });
}
module.exports = { handlerCreateUser, handlerGetUser };
