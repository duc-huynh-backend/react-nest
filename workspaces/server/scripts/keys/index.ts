/**
 * This module will generate a public and private keypair and save to current directory
 * See https://github.com/zachgoll/express-jwt-authentication-starter for use in creating JWT's
 * using jsonwebtoken and passport.
 *
 * Make sure to save the private key elsewhere after generated!
 */
import * as crypto from 'crypto';
import * as fs from 'fs';

function genKeyPair() {
  // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem', // Most common formatting choice
    },
    privateKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem', // Most common formatting choice
    },
  });

  // Create the private key file
  fs.writeFileSync(`${__dirname}/key.pem`, keyPair.privateKey);
  console.log(`JWT__PRIVATE_KEY=${Buffer.from(keyPair.privateKey).toString('base64')}`);

  // Create the public key file
  fs.writeFileSync(`${__dirname}/key.pub`, keyPair.publicKey);
  console.log(`JWT__PUBLIC_KEY=${Buffer.from(keyPair.publicKey).toString('base64')}`);
}

// Generate the keypair
genKeyPair();
