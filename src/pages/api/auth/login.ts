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
  redirect_uri: encodeURIComponent('http://127.0.0.1/data'),
  scope: OAuthScope
});
 // redirect the user to the resource owner for authorization
const handler = async (req: NextIronRequest, res: NextApiResponse) => {
  res.redirect(`https://discordapp.com/oauth2/authorize?${OAuthData}`);

try {
  const { data } = await axios.post(
    "https://discordapp.com/api/v9/oauth2/token",
    stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "authorization_code",
      code: req.query.code,
      redirect_uri: `${process.env.DOMAIN}/wallet/index`,
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
  );

  // const exists = await db
  //   .collection("users")
  //   .countDocuments({ _id: user.id });

  // if (exists) {
  //   db.collection("users").updateOne(
  //     { _id: user.id },
  //     {
  //       $set: {
  //         email: user.email,
  //         name: user.username,
  //         discriminator: user.discriminator,
  //         avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
  //       },
  //       $addToSet: {
  //         ip: req.headers["cf-connecting-ip"],
  //       },
  //     }
  //   );
  // } else {
  //   db.collection("users").insertOne({
  //     _id: user.id,
  //     email: user.email,
  //     name: user.username,
  //     discriminator: user.discriminator,
  //     avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
  //     ip: [req.headers["cf-connecting-ip"]],
  //   });
  // }

  // const staffUser = await db.collection("staff").findOne({ _id: user.id });

  // if (staffUser) {
  //   db.collection("staff").updateOne(
  //     { _id: user.id },
  //     {
  //       $set: {
  //         avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
  //       },
  //     }
  //   );
  // }

  await req.session.set("user", {
    ...user,
    token: encrypt(user.id),
    avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
  });
} catch (e) {
  res.redirect("/index");
  return;
}

};

export default withSession(handler);
