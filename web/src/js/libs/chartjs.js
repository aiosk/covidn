const getFile = async (zone, periods = 7) => {
  let res = await fetch(
    `https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/chartjs/${zone}-${periods}.json?_=${Date.now()}`
  );
  let resJson = await res.json();

  return resJson;
};

export default { getFile };
