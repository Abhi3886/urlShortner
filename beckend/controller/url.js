const { nanoid } = require("nanoid");
const connectDB = require("../database/urlDB");

async function handlerCreateShortUrl(req, res) {
  const originalUrl = req.body.url;
  if (!originalUrl) return res.status(400).send({ error: "Missing url" });
  const shortId = nanoid(8);
  const insertQuery = `insert into urlTable(originalUrl, shortId) values(?,?);`;
  try {
    const urlDB = await connectDB();
    const [rows] = await urlDB.execute(insertQuery, [originalUrl, shortId]);
    res.status(201).send({ shortId: `${req.headers.host}/url/${shortId}` });
  } catch (error) {
    console.log(error);
    res.status(500).send(`Database Error:  ${error.message}`);
  }
}
async function handlerGetShortUrl(req, res) {
  const { shortId } = req.params;
  console.log("shortId : calling..", shortId);
  if (!shortId) return res.status(400).send({ error: "Missing Short Url" });

  const searchQuery = "SELECT * FROM urlTable WHERE shortId = ?";
  try {
    const urlDB = await connectDB();
    const [rows] = await urlDB.execute(searchQuery, [shortId]);
    console.log("hello im row", rows);
    if (rows.length > 0) {
      console.log("im inside the if block");
      await urlDB.execute(
        "UPDATE urlTable SET visited = visited + 1, updatedAt = NOW() WHERE shortId = ?",
        [shortId]
      );
      return res.redirect(
        301,
        rows[0].originalUrl.startsWith("http")
          ? rows[0].originalUrl
          : `https://${rows[0].originalUrl}`
      );
    } else {
      return res.status(404).send({ error: "Short URL not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ "Database Error": error.message });
  }
}

async function getAnalytics(req, res) {
  const { shortId } = req.params;
  try {
    const urlDB = await connectDB();
    const [rows] = await urlDB.execute(
      "SELECT visited FROM urlTable WHERE shortId = ?",
      [shortId]
    );
    return res.status(200).json({ visited: rows[0]?.visited || 0 });
  } catch (error) {
    console.log(error);
    res.status(500).send(`error : ${error}`);
  }
}

module.exports = { handlerCreateShortUrl, handlerGetShortUrl, getAnalytics };
