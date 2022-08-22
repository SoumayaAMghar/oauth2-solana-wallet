"use strict";
(() => {
var exports = {};
exports.id = 908;
exports.ids = [908];
exports.modules = {

/***/ 2747:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_session__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5838);

const OAuthScope = [
    "identify",
    "guilds",
    "guilds.members.read"
].join(" ");
const OAuthData = new URLSearchParams({
    response_type: "code",
    client_id: "998913822712672276",
    redirect_uri: `${process.env.DOMAIN}/api/auth/callback`,
    scope: OAuthScope
});
// redirect the user to the resource owner for authorization
const handler = async (req, res)=>{
    res.redirect(`https://discordapp.com/oauth2/authorize?${OAuthData}`);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util_session__WEBPACK_IMPORTED_MODULE_0__/* .withSession */ .N)(handler));


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
var __webpack_exports__ = (__webpack_exec__(2747));
module.exports = __webpack_exports__;

})();