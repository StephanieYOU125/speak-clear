# 簡明說話｜Speak Clear

一個可以直接放到 GitHub Pages、也能加到 iPhone Home Screen 的簡明表達練習 PWA。

## 核心方法

**結論 → 理由 → 例子**

目標不是「講得少」，而是讓別人更快抓到重點。

## 如何放到 GitHub Pages

1. 在 GitHub 建立一個新的 Repository，例如 `speak-clear`
2. 把這個資料夾內所有檔案上傳到 Repository 根目錄
3. 進入 `Settings`
4. 點 `Pages`
5. `Build and deployment` 選：
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
6. 儲存後，GitHub 會提供一個網址，例如：
   `https://你的帳號.github.io/speak-clear/`

## 如何加入 iPhone Home Screen

1. 用 **Safari** 打開 GitHub Pages 網址
2. 點下方 **分享**
3. 選 **加入主畫面**
4. 名稱可改成「簡明說話」
5. 點 **加入**

之後會像 App 一樣出現在主畫面。

## 檔案

- `index.html`：主要內容
- `style.css`：畫面設計
- `app.js`：練習題、字數計算、本機儲存
- `manifest.webmanifest`：PWA 設定
- `sw.js`：離線快取
- `icon.svg`：App 圖示
