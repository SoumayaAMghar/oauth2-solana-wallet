import { NextApiResponse } from "next";

import { stringify } from "querystring";
import { NextIronRequest, withSession } from "../../../util/session";
import axios from "axios";
// import { dbConnect } from "../../../util/mongodb";
import { decrypt, encrypt } from "../../../util/crypt";



const OAuthScope = ["identify","guilds","guilds.members.read"].join(" ");
const OAuthData = new URLSearchParams({
  response_type: "code",
  client_id: '998913822712672276' as string,
  redirect_uri: `${process.env.DOMAIN}/api/auth/callback`,
  scope: OAuthScope
});
 // redirect the user to the resource owner for authorization
const handler = async (req: NextIronRequest, res: NextApiResponse) => {
  res.redirect(`https://discordapp.com/oauth2/authorize?${OAuthData}`);
};

export default withSession(handler);
