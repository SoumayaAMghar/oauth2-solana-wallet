"use strict";
exports.id = 944;
exports.ids = [944];
exports.modules = {

/***/ 3852:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ encrypt)
/* harmony export */ });
/* unused harmony export decrypt */
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6113);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);

const [key, initVector] = JSON.parse(process.env.CRYPT_KEYS).map((key)=>Buffer.from(key, "base64"));
function crypt(cipher, data, inputType, outputType) {
    return Buffer.concat([
        cipher.update(data, inputType),
        cipher.final(), 
    ]).toString(outputType);
}
function encrypt(data, inputType = "utf8", outputType = "base64") {
    return crypt((0,crypto__WEBPACK_IMPORTED_MODULE_0__.createCipheriv)("aes-256-ctr", key, initVector), data, inputType, outputType);
}
function decrypt(data, inputType = "base64", outputType = "utf8") {
    crypt(createDecipheriv("aes-256-ctr", key, initVector), data, inputType, outputType);
}


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