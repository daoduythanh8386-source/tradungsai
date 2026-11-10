# Tra dung sai

Tra cứu dung sai Oristar theo TQM.QĐ02-03 (lần ban hành 03, 25/10/2024).
App tạo bởi Đào Duy Thanh. Copyright ® Mọi điều khoản nội dung được bảo lưu.

## Cấu trúc
- `www/` – toàn bộ app (HTML, ảnh bảng tiêu chuẩn, PWA offline)
- `electron/` – vỏ ứng dụng Windows (.exe)
- `package.json` – thư viện + cấu hình đóng gói .exe
- `capacitor.config.json` – cấu hình Android (.apk)
- `assets/`, `build/` – icon ứng dụng
- `tools/make_icon.py` – tạo lại toàn bộ icon từ logo Oristar
- `.github/workflows/build.yml` – tự build .exe và .apk trên GitHub

## Đưa logo Oristar 3D làm icon
1. Đặt file logo (PNG vuông, tối thiểu 1024×1024, nền trong suốt hoặc nền xanh) vào `assets/logo-oristar.png`.
2. Chạy `python3 tools/make_icon.py` (cần `pip install pillow numpy`). Script tạo: `assets/icon-only.png`, `icon-foreground.png`, `icon-background.png`, `splash.png`, `build/icon.png` (.exe), `www/icon-192.png`, `www/icon-512.png`.
   Không chạy được script: gửi logo cho người hỗ trợ tạo giúp, hoặc tự thay các file trên đúng kích thước.
3. Đưa các file lên GitHub. Workflow sẽ dùng chúng cho icon .exe và .apk.

## Build trên GitHub (không cần cài gì)
1. Tải TOÀN BỘ nội dung thư mục này (kể cả thư mục `.github`) lên repo, nhánh `main`.
2. Vào tab **Actions** → **Build EXE & APK** → **Run workflow** (hoặc mỗi lần push sẽ tự chạy).
3. Chờ vài phút, mở lần chạy → mục **Artifacts**:
   - `TraDungSai-Setup-Windows` → file cài `.exe`
   - `TraDungSai-APK-Android` → file `.apk`
   Muốn có link tải cố định: tạo tag, ví dụ `git tag v1.0.0 && git push origin v1.0.0` → file `.exe`, `.apk` tự lên mục **Releases**.
4. Cài `.apk` trên Android: cho phép "cài từ nguồn không rõ".

## Lưu ý
- `.apk` là bản debug để cài trực tiếp. Muốn đưa lên Google Play cần khóa ký (keystore) và build bản release.
- `.exe` chưa ký số nên Windows SmartScreen có thể cảnh báo; chọn "More info → Run anyway".
- iPhone: dùng PWA (Safari → Chia sẻ → Thêm vào MH chính). Bản .ipa cần Mac và tài khoản Apple Developer.

## Chạy thử trên máy
- Mở `www/index.html` bằng Chrome/Edge, hoặc `npm install && npm start` (cần Node.js 20).
