const CLIENT_ID = 295909204564-2q6vjjlllohfb7gnk3k8jj54t0vr3skp.apps.googleusercontent.com;
const API_KEY = AIzaSyDKTKx6p7rR2NmF7IGv2WirM6tuFbDcViU;

const SCOPES = "https://www.googleapis.com/auth/drive.readonly";

let accessToken = null;

function initPicker() {
  google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: tokenResponse => {
      accessToken = tokenResponse.access_token;
      createPicker();
    }
  }).requestAccessToken();
}

function createPicker() {
  const picker = new google.picker.PickerBuilder()
    .addView(
      new google.picker.DocsView(google.picker.ViewId.DOCS_IMAGES)
        .setIncludeFolders(false)
    )
    .setOAuthToken(accessToken)
    .setDeveloperKey(API_KEY)
    .setCallback(pickerCallback)
    .build();

  picker.setVisible(true);
}

async function pickerCallback(data) {
  if (data.action === google.picker.Action.PICKED) {
    for (const doc of data.docs) {
      const fileId = doc.id;
      const imageUrl = `https://drive.google.com/uc?id=${fileId}`;

      // Supabase에 저장
      await supabaseClient.from("photos").insert({
        album_id: currentAlbumId,
        drive_file_id: fileId,
        url: imageUrl,
        source: "drive"
      });

      addImage(imageUrl);
    }
  }
}