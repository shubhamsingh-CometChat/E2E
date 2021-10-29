import { EThree } from '@virgilsecurity/e3kit-browser';
const ClientSetUP = async (userId) => {
  const data = await (
    await fetch(`http://localhost:5400/virgil-jwt/${userId}`)
  ).json();
  const { virgilToken } = data;
  const Register = await EThree.initialize(() => virgilToken);
  try {
    await Register.register();
    console.log('login successfull');
  } catch (e) {
    if (e.name === 'IdentityAlreadyExistsError') {
      const hasLocalPrivateKey = await Register.hasLocalPrivateKey();
      console.log(`${userId} is alredy login`);
      console.log(hasLocalPrivateKey, 'local private key');
      if (!hasLocalPrivateKey) {
        console.log(await Register.restorePrivateKey('def'), 'yha pr');
      }
    } else {
      await Register.rotatePrivateKey();
      console.log('gernated on device');
    }
  }
  return { Register, userId };
};

const SendMessages = async (reciverId, message, eThree, senderId) => {
  try {
    console.log(reciverId, message, eThree, senderId);
    const identities = [reciverId];
    const findUsersResult = await eThree.findUsers(identities);
    // console.log(findUsersResult);
    const encryptedText = await eThree.authEncrypt(message, findUsersResult);
    const messageObject = {
      body: encryptedText,
      author: senderId,
    };
    return messageObject;
  } catch (e) {
    return e;
  }
};
const decryptMessages = async (eThree, encryptedText, author) => {
  const senderCard = await eThree.findUsers(author);
  // console.log(encryptedText, 'senderId');
  try {
    const decryptedText = await eThree.authDecrypt(encryptedText, senderCard);
    // console.log(decryptedText);
    return decryptedText;
  } catch (e) {
    // await eThree.rotatePrivateKey();
    // const decryptedText = await eThree.authDecrypt(encryptedText, senderCard);
    // console.log(decryptedText);
    return encryptedText;
  }
};

const logoutCurrentUser = async (eThree) => {
  try {
    await eThree.backupPrivateKey('def');
    await eThree.cleanup();
  } catch (e) {
    await eThree.cleanup();
  }
  console.log('logout ');
};

const allFunctions = {
  ClientSetUP,
  SendMessages,
  decryptMessages,
  logoutCurrentUser,
};
export default allFunctions;
