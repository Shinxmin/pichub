const SUPABASE_URL = https://jpuehixgevycykiimbvw.supabase.com;
const SUPABASE_KEY = sb_publishable_gpKb0QVwPvkfPtdnM0V-oQ_k8PQWc3T;

const supabase = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const gallery = document.getElementById("gallery");
const fileInput = document.getElementById("fileInput");

/* 페이지 로드시 DB에서 이미지 불러오기 */
window.onload = async () => {
  const { data } = await supabase
    .from("photos")
    .select("*")
    .order("created_at", { ascending: false });

  data.forEach(photo => addImage(photo.url));
};

/* 업로드 */
fileInput.addEventListener("change", async e => {
  for (const file of e.target.files) {
    const filePath = `${Date.now()}-${file.name}`;

    // Storage에 업로드
    await supabase.storage
      .from("images")
      .upload(filePath, file);

    // 공개 URL 가져오기
    const { data } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    // DB에 저장
    await supabase.from("photos").insert({
      url: data.publicUrl
    });

    addImage(data.publicUrl);
  }
});

/* 화면에 추가 */
function addImage(src) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = src;
  img.loading = "lazy";

  card.appendChild(img);
  gallery.prepend(card);
}