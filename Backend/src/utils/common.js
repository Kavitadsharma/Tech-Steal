exports.generateRandomNumber = (size) => {
  const randomNumber = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(size, '0');

  return randomNumber;
};
