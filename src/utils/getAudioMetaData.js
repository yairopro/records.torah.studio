export default function getAudioMetaData(url) {
  return new Promise((resolve, reject) => {
    let audioElement = document.createElement("audio");

    audioElement.onloadedmetadata = () =>
      resolve({ duration: audioElement.duration });

    audioElement.src = url;
  });
}
