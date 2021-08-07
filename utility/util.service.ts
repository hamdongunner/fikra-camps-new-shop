/**
 * ReE
 * @param body
 */
const errRes = (res, err, code = 400, lang = "en", v = "", key = "err") => {
  if (typeof err == "object" && typeof err.message != "undefined") {
    err = err.message;
  } else if (typeof err == "string") {
    // translate the error
    err = translate(err, lang, v);
    let obj = {};
    obj[key] = [err];
    err = obj;
  }
  if (typeof code !== "undefined") res.statusCode = code;
  console.log(typeof err);
  return res.json({ status: false, errMsg: err });
};

const translate = (errCode, lang, v) => {
  let obj = {
    en: {
      default: "Something went wrong",
      emptyCart: "cart shouldn't be empty",
    },
    ar: {
      default: "حصل خطأٌ ما ",
      emptyCart: "الرجاء ملئ السله",
      phoneExist: ` هذا الرقم ${v} موجود بالفعل`,
    },
  };

  return obj[lang][errCode] ? obj[lang][errCode] : obj[lang]["default"];
};

/**
 * ReS
 * @param body
 */
const okRes = (res, data, code = 200) => {
  // Success Web Response
  let sendData = { status: true, errMsg: "" };

  if (typeof data == "object") {
    sendData = Object.assign(data, sendData); //merge the objects
  }
  if (typeof code !== "undefined") res.statusCode = code;
  return res.json(sendData);
};

// const getOtp = () => Math.floor(1000 + Math.random() * 9000);
const getOtp = () => 1111;

const paginate = (p = 1, s = 10) => ({ take: s, skip: (p - 1) * s });

export { okRes, errRes, getOtp, paginate };
