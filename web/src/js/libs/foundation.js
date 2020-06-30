const mqAtleast = (size) => {
  return Foundation.MediaQuery.atLeast(size);
};
const mqAtleastLarge = () => {
  return mqAtleast("xlarge");
};

export default { mqAtleast, mqAtleastLarge };
