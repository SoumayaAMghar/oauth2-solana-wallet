"use strict";
(() => {
var exports = {};
exports.id = 908;
exports.ids = [908];
exports.modules = {

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 4511:
/***/ ((module) => {

module.exports = require("next-iron-session");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 3477:
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ 2747:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3477);
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(querystring__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _util_crypt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3852);



// import { dbConnect } from "../../../util/mongodb";

const OAuthScope = [
    "identify",
    "guilds",
    "guilds.members.read"
].join(" ");
const OAuthData = new URLSearchParams({
    response_type: "code",
    client_id: "998913822712672276",
    redirect_uri: encodeURIComponent("http://127.0.0.1/{data}"),
    scope: OAuthScope
});
// redirect the user to the resource owner for authorization
const handler = async (req, res)=>{
    res.redirect(`https://discordapp.com/oauth2/authorize?${OAuthData}`);
    try {
        const { data  } = await axios__WEBPACK_IMPORTED_MODULE_2___default().post("https://discordapp.com/api/v9/oauth2/token", (0,querystring__WEBPACK_IMPORTED_MODULE_0__.stringify)({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: "authorization_code",
            code: req.query.code,
            redirect_uri: `${process.env.DOMAIN}/wallet/index`
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        const { data: user  } = await axios__WEBPACK_IMPORTED_MODULE_2___default().get("https://discordapp.com/api/v9/users/@me", {
            headers: {
                Authorization: `Bearer ${data.access_token}`
            }
        });
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
            token: (0,_util_crypt__WEBPACK_IMPORTED_MODULE_3__/* .encrypt */ .H)(user.id),
            avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`
        });
    } catch (e) {
        res.redirect("/index");
        return;
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util_session__WEBPACK_IMPORTED_MODULE_1__/* .withSession */ .N)(handler));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [944], () => (__webpack_exec__(2747)));
module.exports = __webpack_exports__;

})();