TRA CUU DUNG SAI ORISTAR - theo TQM.QD02-03 (lan ban hanh 03, 25/10/2024)

1) DUNG NGAY (khong can cai gi): mo www/index.html bang Chrome/Edge.

2) CAI LEN DIEN THOAI / MAY TINH KHONG CAN BUILD (PWA, chay offline):
   Dua thu muc www len hosting HTTPS (Netlify keo tha thu muc www).
   - iPhone: mo link bang Safari > Chia se > Them vao MH chinh.
   - Android: Chrome > menu > Cai dat ung dung.
   - May tinh: Chrome/Edge > bieu tuong Cai dat tren thanh dia chi.

3) FILE .EXE (Windows) - can cai Node.js (nodejs.org), co mang:
   npm install
   npm run exe
   -> file cai dat nam trong thu muc dist/. Thu nhanh khong dong goi: npm start

4) ANDROID .APK - can Node.js + Android Studio:
   npm install
   npx cap add android
   npx cap sync
   npx cap open android   (Build > Build APK)

5) iPHONE .IPA - can Mac + Xcode + tai khoan Apple Developer:
   npx cap add ios && npx cap sync && npx cap open ios
   Neu khong co Mac: dung cach PWA o muc 2.

6) BUILD TU DONG TREN GITHUB (khong can cai gi tren may):
   Tao repo GitHub moi, tai TOAN BO noi dung thu muc app len (ke ca thu muc .github).
   Vao tab Actions > "Build exe va apk" > Run workflow. Doi vai phut,
   mo lan chay do, muc Artifacts: tai dung-sai-exe (file cai .exe) va dung-sai-apk (file .apk).
   File .apk la ban debug, cai tren Android bang cach cho phep "cai tu nguon khong ro".
