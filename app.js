const gallery = document.getElementById("gallery");
const fileInput = document.getElementById("fileInput");

/* 로컬 이미지 업로드 */
fileInput.addEventListener("change", e => {
  [...e.target.files].forEach(file => {
    const url = URL.createObjectURL(file);
    addImage(url);
  });
});

/* 갤러리에 이미지 추가 */
function addImage(src) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = src;
  img.loading = "lazy";

  card.appendChild(img);
  gallery.prepend(card);
}

/* Google Drive (다음 단계) */
function loadDrive() {
  alert("Google Drive 연동은 다음 단계에서 천천히 연결해요 🙂");
}