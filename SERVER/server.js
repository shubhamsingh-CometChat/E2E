require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const {
  initCrypto,
  VirgilCrypto,
  VirgilAccessTokenSigner,
} = require('virgil-crypto');
const { JwtGenerator } = require('virgil-sdk');

async function getJwtGenerator() {
  await initCrypto();

  const virgilCrypto = new VirgilCrypto();
  // initialize JWT generator with your App ID and App Key ID you got in
  // Virgil Dashboard.
  return new JwtGenerator({
    appId: process.env.APP_ID,
    apiKeyId: process.env.APP_KEY_ID,
    // import your App Key that you got in Virgil Dashboard from string.
    apiKey: virgilCrypto.importPrivateKey(process.env.APP_KEY),
    // initialize accessTokenSigner that signs users JWTs
    accessTokenSigner: new VirgilAccessTokenSigner(virgilCrypto),
    // JWT lifetime - 20 minutes (default)
  });
}

const generatorPromise = getJwtGenerator();

app.get('/virgil-jwt/:uid', async (req, res) => {
  const generator = await generatorPromise;
  const virgilJwtToken = generator.generateToken(req.params.uid);
  res.json({ virgilToken: virgilJwtToken.toString() });
});

app.listen(5400);
