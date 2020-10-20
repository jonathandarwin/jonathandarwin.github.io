let webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BPRer67rept5ff1y8MnRGFB5YdGaBfXjt3d8drQaxLZiZ0P17Y5l9npWLiyeyp8qBw7FunQoaRbFqCtOlygbLlA",
  privateKey: "YYMl54nFOIifBldsBbHqDS2QkTmTcbQ1znSOlL_chlg",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

let pushSubscription = {
  endpoint: "https://fcm.googleapis.com/fcm/send/fr2K5gf1fkI:APA91bFLehuNTBXrRogZD2hO301bd42KXiLmdL1mcDz3ItcDHD4kFwJwgvDUu-XmrYBpJbav1u8hyJeh73XdDbpK823dlN6Dw5mswh69sbMpmsItm76OVlM5PplvXG1F-Pruf9C55Ubi",
  keys: {
    p256dh: "BFv3RsYWwkZXpjbEYrCcIcJg3TRKz4GU4+B3cudpkGpoxjxh3VfdA6xomnIlfOQFNNPzyD/xWW3aulxbcTaxmG0=",
    auth: "6OLzoOd4FfNZaDNuJvLZuQ==",
  },
};

let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
let options = {
   gcmAPIKey: '564159684688',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
