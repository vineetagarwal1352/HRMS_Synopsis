async function setAbsenceTime(absenceTime) {
  let time = await chrome.storage.local.get(["absenceTime"]);
  if (!time) time = 0;
  time = time + absenceTime;
  await chrome.storage.local.set({ absenceTime: time });
}

async function checkLocation(location) {
  let locData = {
    accuracy: 1,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: 24.5854,
    longitude: 73.7141,
    speed: null,
  };

  if (location == null) return null;

  const precision = 2;
  location.latitude = location.latitude.toFixed(precision);
  location.longitude = location.longitude.toFixed(precision);

  locData.latitude = locData.latitude.toFixed(precision);
  locData.longitude = locData.longitude.toFixed(precision);

  if (locData != location) return 2;
  else return 0;
}

async function checkActivity(time) {
  let lastActive = await chrome.storage.local.get(["lastActive"]);
  if (!lastActive) lastActive = new Date();
  await chrome.storage.local.set({ lastActive: time });
  const absenceTime = ((time - lastActive) / 1000) * 60;
  if (absenceTime > 30) return absenceTime;
  else return 0;
}

async function markAttendence() {
     
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log(message);
  switch (message.type) {
    case "location":
      const absenceTime = await checkLocation(message.data);
      await setAbsenceTime(absenceTime);
      break;
    case "active":
      const time = new Date();
      const absTime = await checkActivity(time);
      await setAbsenceTime(absTime);
  }
});


