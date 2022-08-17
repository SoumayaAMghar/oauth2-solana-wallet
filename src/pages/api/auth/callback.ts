import { NextApiResponse } from "next";
import { stringify } from "querystring";
import { NextIronRequest, withSession } from "../../../util/session";
import axios from "axios";
// import { dbConnect } from "../../../util/mongodb";
import { decrypt, encrypt } from "../../../util/crypt";

const OAuthScope = ["identify","guilds","guilds.members.read"].join(" ");

const handler = async (req: NextIronRequest, res: NextApiResponse) => {

  if (!req.query.code) {
    res.status(404).redirect("/404");
    return;
  }
  try {
    const { data } = await axios.post(
      "https://discordapp.com/api/v9/oauth2/token",
      stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: `${process.env.DOMAIN}/api/auth/callback`,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    

    const { data: user } = await axios.get(
      "https://discordapp.com/api/v9/users/@me",
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    ).then(() => { return data.access_token});


  res.redirect(`/wallet?token=${data.access_token}`);

} catch (e) {
  res.redirect("/r?true");
  return;
}
};
export default withSession(handler);