# BarkHistory
🗣 a.k.a 흑흑역사 
## 서비스 소개
> **너의 흑역사(darkhistory)를 짖어라(bark)**  
개인마다 가지고 있는 흑역사를 익명으로 타인과 자유롭게 공유할 수 있는 커뮤니티  
## Overview
>  📇 **흑역사 공유 공간**  
> 서로의 흑역사 공유를 통해 쪽팔림을 덜어내자!  
- 실시간 흑역사 인기글을 확인할 수 있는 홈 화면
![image](https://user-images.githubusercontent.com/48620082/192756205-36fa63cd-8c2a-4dc0-bfbd-c70f6b2f32e9.png)
- 해당 흑역사에 반응 추가하는 글 상세 화면
![image](https://user-images.githubusercontent.com/48620082/192755102-d1617a1d-622e-4f28-a65d-1142ffa43543.png)
- 반응과 함께 댓글을 추가하는 글 상세 화면
![image](https://user-images.githubusercontent.com/48620082/192755439-031eec4a-cf43-42d2-a4b0-c7420f7227a9.png)
- 반응에 달린 댓글들을 확인할 수 있는 글 상세 화면
![image](https://user-images.githubusercontent.com/48620082/192755476-054a5a8b-d187-45b0-b070-7d1f8b5901bd.png)
- 흑역사 작성 화면  
![image](https://user-images.githubusercontent.com/48620082/192767178-b2d566ff-d71c-4141-a37d-7802987f5c32.png)
  
> 🗑 **흑역사를 머릿속에서 지워주는 지우개**  
> 나만 볼 수 있는 공간에 비밀 흑역사를 적어 머릿속에서 지우자!
- 지우개 글 작성 화면
![image](https://user-images.githubusercontent.com/48620082/192766704-c29a70a1-bc3b-42bb-9bac-a1c5c80a3737.png)
- 작성 후 일주일 뒤면 자동 삭제되는 지우개 글 목록 화면
![image](https://user-images.githubusercontent.com/48620082/192766643-c83011c0-99b3-4f87-adaf-6a1adfe7ff46.png)

## Steps to run
```
1. git clone https://github.com/ynawhocodes/BarkHistory.git
2. cd BarkHistory
3. node main.js
```
## API 설계
<img width="842" alt="스크린샷 2022-09-28 오후 8 14 44" src="https://user-images.githubusercontent.com/48620082/192765356-06b3ae35-31d6-481e-a7c3-217215dde1fa.png">
<img width="841" alt="스크린샷 2022-09-28 오후 8 12 07" src="https://user-images.githubusercontent.com/48620082/192764912-86c06ce4-6feb-4ce0-8680-874da60b0f94.png">
<img width="816" alt="스크린샷 2022-09-28 오후 8 14 56" src="https://user-images.githubusercontent.com/48620082/192765391-a556c6d8-ec28-48a6-8b13-0d1b59da426a.png">
<img width="739" alt="스크린샷 2022-09-28 오후 8 15 05" src="https://user-images.githubusercontent.com/48620082/192765418-bb5cfa00-5331-483a-88de-e16bde5855a7.png">


## ERD
![ERD](https://user-images.githubusercontent.com/48620082/142961734-4d08f323-d03d-42b4-9b90-ec6db78f016f.png)
  
## Foldering
```
   🗣 BarkHistory
    	 │
	 │
	 |── 📂 css
	 │        |── common.css //전체 초기화
	 │        |── navigation.css //상단 네비게이션
	 │        |── swiper.css
	 │        └── board.css //게시판 스타일
	 │── 📂 js
	 │        |── swiper.js
	 │        └── reaction.js 
	 │── 📂 src
	 │        └── icons png 모음
         │
------------------------------------ 📄 페이지 관리 ------------------------------------
         │
	 │── 📂 main //메인
	 │        └── home.html //홈
         │
	 │── 📂 board //글쓰기 페이지
	 │        |── detail.html //글 확인
	 │        |── post_list.html // 글 목록
	 │        └── write.html // 글 작성
         │
	 │── 📂 mypage //마이페이지
	 │        |── myInfo.html //아이디, 비밀번호 확인
	 │        |── myPost.html //내가 쓴 글 확인
	 │        |── myScrap.html //스크랩 글 확인
	 │        └── eraserList.html // 지우개 게시판
```

