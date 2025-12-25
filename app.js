const CLIENT_ID = 295909204564-2q6vjjlllohfb7gnk3k8jj54t0vr3skp.apps.googleusercontent.com;
const API_KEY  = AIzaSyDKTKx6p7rR2NmF7IGv2WirM6tuFbDcViU;

const SCOPES = "https://www.googleapis.com/auth/drive.readonly";

let accessToken;

/* Google API 로드 */
window.onload = () => {
  gapi.load("picker");
};

/* 버튼 연결 */
document.getElementById("uploadBtn").addEventListener("click", () => {
  const tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: (tokenResponse) => {
      accessToken = tokenResponse.access_token;
      createPicker();
    }
  });

  tokenClient.requestAccessToken();
});

/* Picker 생성 */
function createPicker() {
  const view = new google.picker.DocsView(google.picker.ViewId.DOCS_IMAGES)
    .setIncludeFolders(false);

  const picker = new google.picker.PickerBuilder()
    .setOAuthToken(accessToken)
    .setDeveloperKey(API_KEY)
    .addView(view)
    .setCallback(pickerCallback)
    .build();

  picker.setVisible(true);
}

/* 선택 결과 */
function pickerCallback(data) {
  if (data.action === google.picker.Action.PICKED) {
    data.docs.forEach(doc => {
      const url = `https://drive.google.com/uc?id=${doc.id}`;
      addImage(url);
    });
  }
}

/* 갤러리 출력 */
function addImage(src) {
  const gallery = document.getElementById("gallery");
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = src;

  card.appendChild(img);
  gallery.prepend(card);
}