var map = L.map("ip-loc-map");
const getIpInfo = async (ip = null) => {
  if (!ip)
    return (
      await fetch("https://ipinfo.io/json?token=018d92a3b2537d", {
        method: "GET",
      })
    ).json();
  else
    return (
      await fetch(`https://ipinfo.io/${ip}/json?token=018d92a3b2537d`, {
        method: "GET",
      })
    ).json();
};

const showValues = (info) => {
  const vals = document.querySelectorAll(".details-val");

  vals[0].innerHTML = `${info.ip}`;
  vals[1].innerHTML = `${info.region},${info.country}`;
  vals[2].innerHTML = `${info.timezone}`;
  let isp = "";
  info.org.startsWith("AS")
    ? (isp = info.org.split(" ").splice(1).join(" "))
    : (isp = info.org);

  vals[3].innerHTML = `${isp}`.substring(0, 30);

  const lat = parseFloat(info.loc.split(",")[0]);
  const lon = parseFloat(info.loc.split(",")[1]);
  map.setView([lat, lon], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 20,
    attribution: "© OpenStreetMap",
  }).addTo(map);
};

const onPageLoad = async () => {
  const info = await getIpInfo();
  console.log(info);
  showValues(info);
};

document.querySelector("#ip-input").addEventListener("submit", async (e) => {
  e.preventDefault();
  const reqIp = document.querySelector("#ip-req").value;
  const info = await getIpInfo(reqIp);
  showValues(info);
});

onPageLoad();
