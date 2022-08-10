"use strict";
(() => {
var exports = {};
exports.id = 712;
exports.ids = [712];
exports.modules = {

/***/ 2934:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ callback)
});

;// CONCATENATED MODULE: external "querystring"
const external_querystring_namespaceObject = require("querystring");
// EXTERNAL MODULE: ./src/util/session.ts + 1 modules
var session = __webpack_require__(5838);
;// CONCATENATED MODULE: external "axios"
const external_axios_namespaceObject = require("axios");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_namespaceObject);
;// CONCATENATED MODULE: ./src/pages/api/auth/callback.ts



const OAuthScope = [
    "identify",
    "guilds",
    "guilds.members.read"
].join(" ");
const handler = async (req, res)=>{
    if (!req.query.code) {
        res.status(404).redirect("/404");
        return;
    }
    try {
        const { data  } = await external_axios_default().post("https://discordapp.com/api/v9/oauth2/token", (0,external_querystring_namespaceObject.stringify)({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: "authorization_code",
            code: req.query.code,
            redirect_uri: `${process.env.DOMAIN}/api/auth/callback`
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        const { data: user  } = await external_axios_default().get("https://discordapp.com/api/v9/users/@me", {
            headers: {
                Authorization: `Bearer ${data.access_token}`
            }
        });
    } catch (e) {
        res.redirect("/r?true");
        return;
    }
    await req.session.save();
    res.redirect("/wallet?token=${json.access_token}");
};
/* harmony default export */ const callback = ((0,session/* withSession */.N)(handler));


/***/ }),

/***/ 5838:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "N": () => (/* binding */ withSession)
});

;// CONCATENATED MODULE: external "next-iron-session"
const external_next_iron_session_namespaceObject = require("next-iron-session");
;// CONCATENATED MODULE: ./src/util/session.ts

function withSession(handler) {
    return (0,external_next_iron_session_namespaceObject.withIronSession)(handler, {
        password: process.env.COOKIE_SECRET,
        cookieName: "session",
        ttl: 15 * 24 * 3600,
        cookieOptions: {
            secure: "production" === "production",
            sameSite: "strict",
            httpOnly: true
        }
    });
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(2934));
module.exports = __webpack_exports__;

})();