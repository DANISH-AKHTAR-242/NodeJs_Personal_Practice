/*
 * This is a simple example of a security vulnerability in a Node.js application. The code takes user input from the request body and directly uses it to create a new security object without any validation or sanitization. This can lead to various security issues such as injection attacks, where an attacker can inject malicious code into the input fields.

function CreateSecurity() { 
    const name = req.body.name; //untrusted line
    
    const description = req.body.description;
    const price = req.body.price;
    
    secure.push(body);
    res.send(secure);
}
*/

// To fix this vulnerability, we should validate and sanitize the user input before using it to create a new security object. We can use libraries like Joi or express-validator to perform validation and sanitization.

//whats the difference in encoding, hashing, and encryption?
//Encoding is the process of converting data into a specific format for storage or transmission. It is not meant to be secure and can be easily reversed. Examples include Base64 encoding and URL encoding. 
//Base64, purpose - used to send the binary data over the text-based protocols, such as email and HTTP. It converts binary data into a string format that can be easily transmitted and stored. Base64 encoding is not secure and should not be used for sensitive data.

const base64Encoded = Buffer.from('Hello, World!').toString('base64');
console.log(base64Encoded); // Outputs: SGVsbG8sIFdvcmxkIQ==
//decode
const base64Decoded = Buffer.from(base64Encoded, 'base64').toString('utf-8');
console.log(base64Decoded); // Outputs: Hello, World!

//Hashing is the process of converting data into a fixed-size string of characters, which is typically a hash value. It is a one-way function, meaning that it cannot be reversed to retrieve the original data. Hashing is commonly used for password storage and data integrity verification. Examples include SHA-256 and bcrypt.
const crypto = require('crypto');
const hash = crypto.createHash('sha256').update('Hello, World!').digest('hex');
console.log(hash); // Outputs: a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f


//Encryption is the process of converting data into a format that can only be read by someone who has the correct decryption key. It is a two-way function, meaning that it can be reversed to retrieve the original data. Encryption is commonly used for secure communication and data protection. Examples include AES and RSA.
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(encrypted) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const encryptedText = encrypt('Hello, World!');
console.log(encryptedText); // Outputs: (encrypted string)
const decryptedText = decrypt(encryptedText);
console.log(decryptedText); // Outputs: Hello, World!


//----passkey ----
//A passkey is a secret value that is used to authenticate a user or device. It is typically a string of characters that is known only to the user and the system. Passkeys are often used in conjunction with other authentication methods, such as passwords or biometric data, to provide an additional layer of security. Passkeys can be generated randomly or created by the user, and they should be kept secure to prevent unauthorized access.
