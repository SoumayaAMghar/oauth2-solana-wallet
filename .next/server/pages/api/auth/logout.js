"use strict";
(() => {
var exports = {};
exports.id = 845;
exports.ids = [845];
exports.modules = {

/***/ 4511:
/***/ ((module) => {

module.exports = require("next-iron-session");

/***/ }),

/***/ 3283:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_session__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);

const handler = async (req, res)=>{
    req.session.destroy();
    res.redirect(`/`);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_util_session__WEBPACK_IMPORTED_MODULE_0__/* .withSession */ .N)(handler));


/***/ }),

/***/ 8:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ withSession)
/* harmony export */ });
/* harmony import */ var next_iron_session__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4511);
/* harmony import */ var next_iron_session__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_iron_session__WEBPACK_IMPORTED_MODULE_0__);

function withSession(handler) {
    return (0,next_iron_session__WEBPACK_IMPORTED_MODULE_0__.withIronSession)(handler, {
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
var __webpack_exports__ = (__webpack_exec__(3283));
module.exports = __webpack_exports__;

})();