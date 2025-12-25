const CLIENT_ID = 295909204564-2q6vjjlllohfb7gnk3k8jj54t0vr3skp.apps.googleusercontent.com;
const API_KEY  = AIzaSyDKTKx6p7rR2NmF7IGv2WirM6tuFbDcViU;

const SCOPES = "https://www.googleapis.com/auth/drive.readonly";

let accessToken = null;

/* 업로드 버튼 */
document.getElementById("uploadBtn").addEventListener("click", () => {
  requestAccessToken();
});

/* Google OAuth */
function requestAccessToken() {
  const tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: (response) => {
      accessToken = response.access_token;
      loadPicker();
    }
  });

  tokenClient.requestAccessToken();
}

/* Picker 로드 */
function loadPicker() {
  gapi.load("picker", createPicker);
}

/* Google Drive Picker 생성 */
function createPicker() {
  const view = new google.picker.DocsView(google.picker.ViewId.DOCS_IMAGES)
    .setIncludeFolders(false)
    .setSelectFolderEnabled(false);

  const picker = new google.picker.PickerBuilder()
    .setDeveloperKey(API_KEY)
    .setOAuthToken(accessToken)
    .addView(view)
    .setCallback(pickerCallback)
    .build();

  picker.setVisible(true);
}

/* 선택 결과 처리 */
function pickerCallback(data) {
  if (data.action === google.picker.Action.PICKED) {
    data.docs.forEach(doc => {
      const fileId = doc.id;
      const imageUrl = `https://drive.google.com/uc?id=${fileId}`;

      addImage(imageUrl);
      // 👉 여기서 DB 저장하면 "영구 저장" 완성
    });
  }
}

/* 갤러리에 표시 */
function addImage(src) {
  const gallery = document.getElementById("gallery");

  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = src;
  img.loading = "lazy";

  card.appendChild(img);
  gallery.prepend(card);
}