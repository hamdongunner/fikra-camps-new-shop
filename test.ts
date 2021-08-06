const ZC = require("zaincash");

async () => {
  const paymentData = {
    amount: 250,
    orderId: "2",
    serviceType: "some serviceType",
    redirectUrl: "http:localhost:3000/redirect",
    production: false,
    msisdn: "9647835077893",
    merchantId: "5ffacf6612b5777c6d44266f",
    secret: "$2y$10$hBbAZo2GfSSvyqAyV2SaqOfYewgYpfR1O19gIh4SqyGWdmySZYPuS",
    lang: "ar",
  };

  let zc = new ZC(paymentData);

  let trId = await zc.init();
};
