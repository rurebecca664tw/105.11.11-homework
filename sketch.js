let backgroundImage; // 宣告背景圖片變數

let stopSprite; // 宣告 Keroro 待機動畫精靈圖變數
let runSprite; // 宣告 Keroro 跑步動畫精靈圖變數
let jumpSprite; // 宣告 Keroro 跳躍動畫精靈圖變數
let pushSprite; // 宣告 Keroro 推動動畫精靈圖變數
let keroroFallSprite; // 宣告 Keroro 摔倒動畫精靈圖變數

let tamamaStopSprite; // 宣告 Tamama 待機動畫精靈圖變數
let tamamaFallSprite; // 宣告 Tamama 摔倒動畫精靈圖變數
let tamamaPushSprite; // 宣告 Tamama 推動動畫精靈圖變數
let tamamaTalkSprite; // 宣告 Tamama 對話動畫精靈圖變數

const stopFrameCount = 4; // 設定 Keroro 待機動畫總格數為 4 格
const runFrameCount = 4; // 設定 Keroro 跑步動畫總格數為 4 格
const jumpFrameCount = 9; // 設定 Keroro 跳躍動畫總格數為 9 格
const pushFrameCount = 5; // 設定 Keroro 推動精靈圖原始格數為 5 格
const pushActionStageCount = 7; // 設定 Keroro 推動動作總共播放 7 個階段
const keroroFallFrameCount = 4; // 設定 Keroro 摔倒動畫總格數為 4 格
const tamamaStopFrameCount = 4; // 設定 Tamama 待機動畫總格數為 4 格
const tamamaFallFrameCount = 3; // 設定 Tamama 摔倒動畫總格數為 3 格
const tamamaPushFrameCount = 11; // 設定 Tamama 推動動畫總格數為 11 格
const tamamaTalkFrameCount = 6; // 設定 Tamama 對話動畫總格數為 6 格

const designWidth = 1536; // 設定響應式縮放的基準寬度
const designHeight = 1024; // 設定響應式縮放的基準高度
const characterScale = 3; // 將 Keroro 與 Tamama 所有動畫的基本放大倍率設為 4，較原本再放大一倍
const baseMoveSpeed = 5; // 設定基準畫面中的角色移動速度
const basePushMoveDistance = 200; // 設定 Keroro 推動第 5、6 階段的基準水平位移
const initialKeroroXRatio = 1 / 5; // 設定 Keroro 初始水平位置為畫面寬度的五分之一
const initialTamamaXRatio = 4 / 5; // 設定 Tamama 初始水平位置為畫面寬度的五分之四
const initialVerticalOffset = 300; // 設定基準畫面中角色中心向下偏移 270 像素
const initialVerticalExtraOffset = 50; // 設定初始位置額外向下偏移 50 基準像素
const actionFrameInterval = 6; // 設定特殊動作每隔 6 個畫面切換一次
const normalFrameInterval = 8; // 設定待機或跑步動畫每隔 8 個畫面切換一次
const frameRateValue = 60; // 設定程式預期使用的畫面更新速率
const tamamaFallFrameDuration = 500; // 設定 Tamama 摔倒動畫每格持續 150 毫秒
const tamamaPushFrameDuration = 180; // 設定 Tamama 推動動畫每格持續 120 毫秒
const keroroFallFrameDuration = 150; // 設定 Keroro 摔倒動畫每格持續 150 毫秒
const resultHoldDuration = 3000; // 設定結果動畫最後一格保持 5 秒
const incorrectSideGap = 10; // 設定答錯時兩個角色邊界之間的距離
const incorrectKeroroMoveDistance = 200; // 設定答錯流程開始時 Keroro 向左移動的基準距離
const correctFallMoveDistance = 30; // 設定 Tamama 摔倒第 2 格的水平位移
const incorrectKeroroFrame1OffsetX = -100; // 設定 Keroro 摔倒第 2 格向左位移
const incorrectKeroroFrame1OffsetY = -80; // 設定 Keroro 摔倒第 2 格向上位移
const incorrectKeroroFrame2OffsetX = -200; // 設定 Keroro 摔倒第 3 格向左位移
const incorrectKeroroFrame2OffsetY = -40; // 設定 Keroro 摔倒第 3 格向上位移
const incorrectKeroroFrame3OffsetX = -300; // 設定 Keroro 摔倒第 4 格向左位移
const incorrectKeroroFrame3OffsetY = 40; // 設定 Keroro 摔倒第 4 格垂直位移

let scaleFactor = 1; // 儲存目前視窗相對基準畫面的等比例縮放倍率
let currentFrame = 0; // 儲存 Keroro 待機或跑步動畫目前播放的動畫格
let frameTimer = 0; // 儲存 Keroro 一般動畫計時器
let lastNormalFrameAt = 0; // 儲存 Keroro 一般動畫上次切格的毫秒時間
let actionType = "none"; // 儲存 Keroro 目前特殊動作類型
let actionFrame = 0; // 儲存 Keroro 特殊動作目前播放的階段索引
let actionTimer = 0; // 保留特殊動作計時器變數以便相容既有程式
let lastActionFrameAt = 0; // 儲存 Keroro 特殊動作上次切格的毫秒時間
let facingLeft = false; // 儲存 Keroro 目前是否面向左方

let characterX = 0; // 儲存 Keroro 中心點的水平座標
let characterY = 0; // 儲存 Keroro 中心點的垂直座標
let tamamaX = 0; // 儲存 Tamama 中心點的水平座標
let tamamaY = 0; // 儲存 Tamama 中心點的垂直座標
let tamamaStopFrame = 0; // 儲存 Tamama 待機動畫目前播放的動畫格
let tamamaStopLastFrameAt = 0; // 儲存 Tamama 待機動畫上次切格的毫秒時間
let tamamaTalkFrame = 0; // 儲存 Tamama 對話動畫目前播放的動畫格
let tamamaTalkLastFrameAt = 0; // 儲存 Tamama 對話動畫上次切格的時間
let talkActive = false; // 儲存 Tamama 目前是否正在對話
const tamamaTalkFrameDuration = 130; // 設定 Tamama 對話動畫每格持續時間

let gameState = "normal"; // 使用 normal、question、correct、incorrect 管理遊戲狀態
let collisionTriggered = false; // 儲存本次推動碰撞是否已經觸發過問答
let questionData = null; // 儲存目前隨機產生的題目與選項資料

let correctFallFrame = 0; // 儲存答對時 Tamama 摔倒動畫目前的動畫格
let correctFallLastFrameAt = 0; // 儲存 Tamama 摔倒動畫上次切格的毫秒時間
let correctHoldStartAt = 0; // 儲存 Tamama 第 3 格開始保持的毫秒時間

let incorrectTamamaFrame = 0; // 儲存答錯時 Tamama 推動動畫目前的動畫格
let incorrectTamamaLastFrameAt = 0; // 儲存 Tamama 推動動畫上次切格的毫秒時間
let incorrectTamamaFinished = false; // 儲存 Tamama 推動動畫是否已經完成
let incorrectKeroroFrame = 0; // 儲存答錯時 Keroro 摔倒動畫目前的動畫格
let incorrectKeroroLastFrameAt = 0; // 儲存 Keroro 摔倒動畫上次切格的毫秒時間
let incorrectKeroroHoldStartAt = 0; // 儲存 Keroro 第 4 格開始保持的毫秒時間
let incorrectTamamaFacingLeft = false; // 儲存答錯時 Tamama 是否面向左方

function preload() { // 在建立畫布前先載入所有圖片資源
  backgroundImage = loadImage("background.png"); // 載入原本的背景圖片
  stopSprite = loadImage("keroro/stop/stop.png"); // 載入 Keroro 待機動畫精靈圖
  runSprite = loadImage("keroro/run/run.png"); // 載入 Keroro 跑步動畫精靈圖
  jumpSprite = loadImage("keroro/jump/jump.png"); // 載入 Keroro 跳躍動畫精靈圖
  pushSprite = loadImage("keroro/push/push.png"); // 載入 Keroro 推動動畫精靈圖
  keroroFallSprite = loadImage("keroro/fall/fall.png"); // 載入 Keroro 摔倒動畫精靈圖
  tamamaStopSprite = loadImage("tamama/stop/stop.png"); // 載入 Tamama 待機動畫精靈圖
  tamamaFallSprite = loadImage("tamama/fall/fall.png"); // 載入 Tamama 摔倒動畫精靈圖
  tamamaPushSprite = loadImage("tamama/push/push.png"); // 載入 Tamama 推動動畫精靈圖
  tamamaTalkSprite = loadImage("tamama/talk/talk.png"); // 載入 Tamama 對話動畫精靈圖
} // 結束 preload 函式

function setup() { // 執行一次初始化設定
  createCanvas(windowWidth, windowHeight); // 建立符合瀏覽器視窗大小的畫布
  imageMode(CORNER); // 設定圖片使用左上角作為繪製基準
  frameRate(frameRateValue); // 設定畫面更新速率為每秒 60 格
  updateScaleFactor(); // 根據目前視窗大小計算等比例縮放倍率
  resetCharactersAndState(); // 使用統一重設函式設定兩個角色的初始位置與狀態
} // 結束 setup 函式

function draw() { // 每一格畫面都會重複執行的主要函式
  drawBackground(); // 保留原本背景圖片的繪製功能

  if (gameState === "question") { // 如果目前正在顯示選擇題
    drawQuestionWorld(); // 繪製答題期間暫停的角色畫面
    drawQuestionPanel(); // 繪製中央選擇題方框
    return; // 答題期間不更新任何角色動畫或移動
  } // 結束選擇題狀態判斷

  if (gameState === "correct") { // 如果目前正在播放答對流程
    updateCorrectSequence(); // 使用毫秒計時器更新答對動畫
    drawCorrectWorld(); // 繪製答對流程的角色畫面
    return; // 答對流程期間不執行 Keroro 移動
  } // 結束答對狀態判斷

  if (gameState === "incorrect") { // 如果目前正在播放答錯流程
    updateIncorrectSequence(); // 使用毫秒計時器更新答錯動畫
    drawIncorrectWorld(); // 繪製答錯流程的角色畫面
    return; // 答錯流程期間不執行 Keroro 移動
  } // 結束答錯狀態判斷

  updateNormalMovementAndAnimation(); // 更新正常狀態的移動與動畫
  updateTamamaStopAnimation(); // 更新 Tamama 的待機循環動畫
  updateTalkState(); // 判斷 Keroro 是否與 Tamama 接觸並更新對話狀態
  updateTamamaTalkAnimation(); // 更新 Tamama 對話動畫
  drawNormalWorld(); // 繪製正常狀態的 Keroro 與 Tamama

  if (actionType === "push" && isPushCollisionStage(actionFrame) && !collisionTriggered && isPushStageTouchingTamama()) { // 如果推動第 4、5、6 張圖片的階段碰到 Tamama 且尚未觸發碰撞
    enterQuestionState(); // 立即進入選擇題狀態並只觸發一次
    return; // 保持第 6 階段畫面並暫停後續更新
  } // 結束推動碰撞判斷

  updateActionAnimation(); // 更新 Keroro 的跳躍或推動特殊動作
} // 結束 draw 函式

function updateScaleFactor() { // 計算符合需求的響應式等比例縮放倍率
  scaleFactor = min(width / designWidth, height / designHeight); // 以寬高比例較小值作為等比例縮放倍率
  scaleFactor = max(scaleFactor, 0.01); // 避免極小視窗造成零倍率錯誤
} // 結束 updateScaleFactor 函式

function updateNormalMovementAndAnimation() { // 更新正常狀態的 Keroro 移動與一般動畫
  const movingLeft = keyIsDown(LEFT_ARROW); // 判斷是否按住鍵盤左方向鍵
  const movingRight = keyIsDown(RIGHT_ARROW); // 判斷是否按住鍵盤右方向鍵
  const isMoving = movingLeft !== movingRight && actionType === "none"; // 判斷是否只有一個方向鍵被按住且沒有特殊動作

  if (movingLeft && !movingRight && actionType === "none") { // 如果只按住左方向鍵且沒有特殊動作
    characterX -= baseMoveSpeed * scaleFactor; // 讓 Keroro 依響應式倍率向左移動
    facingLeft = true; // 讓 Keroro 面向左方
  } // 結束左移判斷

  if (movingRight && !movingLeft && actionType === "none") { // 如果只按住右方向鍵且沒有特殊動作
    characterX += baseMoveSpeed * scaleFactor; // 讓 Keroro 依響應式倍率向右移動
    facingLeft = false; // 讓 Keroro 面向右方
  } // 結束右移判斷

  if (actionType === "none") { // 如果目前沒有特殊動作
    updateNormalAnimation(isMoving); // 更新待機或跑步動畫
  } // 結束一般動畫更新判斷

  const normalHeight = getKeroroNormalHeight(); // 取得 Keroro 一般動畫目前顯示高度
  characterX = constrainCharacterX(characterX, getKeroroNormalWidth()); // 限制 Keroro 不超出畫面左右邊界
  characterY = constrainCharacterY(characterY, normalHeight); // 限制 Keroro 不超出畫面上下邊界
  tamamaY = characterY; // 讓 Tamama 維持與 Keroro 相同的垂直位置
} // 結束 updateNormalMovementAndAnimation 函式

function updateNormalAnimation(isMoving) { // 更新 Keroro 的待機或跑步動畫
  if (!isMoving) { // 如果 Keroro 沒有移動
    currentFrame = 0; // 將待機動畫固定在第 1 格
    frameTimer = 0; // 將一般動畫計時器歸零
    lastNormalFrameAt = millis(); // 重新記錄待機起始時間
    return; // 結束一般動畫更新
  } // 結束待機狀態判斷

  const now = millis(); // 取得目前毫秒時間
  const frameDuration = normalFrameInterval * 1000 / frameRateValue; // 將原本畫面格間隔換算成毫秒

  if (now - lastNormalFrameAt >= frameDuration) { // 如果已經達到跑步動畫切格時間
    currentFrame = (currentFrame + 1) % runFrameCount; // 切換到下一格跑步動畫並循環播放
    frameTimer = 0; // 將一般動畫計時器歸零
    lastNormalFrameAt = now; // 記錄本次切格時間
  } // 結束跑步動畫切格判斷
} // 結束 updateNormalAnimation 函式

function updateTamamaStopAnimation() { // 更新 Tamama 的待機循環動畫
  if (!isImageReady(tamamaStopSprite)) { // 如果 Tamama 待機圖片尚未載入完成
    return; // 暫停 Tamama 待機動畫更新
  } // 結束 Tamama 待機圖片判斷

  const now = millis(); // 取得目前毫秒時間
  const frameDuration = normalFrameInterval * 1000 / frameRateValue; // 計算 Tamama 待機動畫每格持續時間

  if (now - tamamaStopLastFrameAt >= frameDuration) { // 如果達到 Tamama 待機動畫切格時間
    tamamaStopFrame = (tamamaStopFrame + 1) % tamamaStopFrameCount; // 循環播放 Tamama 待機動畫
    tamamaStopLastFrameAt = now; // 記錄 Tamama 本次切格時間
  } // 結束 Tamama 待機動畫切格判斷
} // 結束 updateTamamaStopAnimation 函式

function drawNormalWorld() { // 繪製正常狀態的所有角色
  if (actionType === "jump") { // 如果 Keroro 正在跳躍
    drawActionCharacter(jumpSprite, jumpFrameCount); // 繪製 Keroro 跳躍動畫
  } else if (actionType === "push") { // 如果 Keroro 正在推動
    drawPushCharacter(); // 使用七階段規則繪製 Keroro 推動動畫
  } else { // 如果 Keroro 沒有特殊動作
    drawKeroroNormalCharacter(); // 繪製 Keroro 待機或跑步動畫
  } // 結束 Keroro 正常繪製判斷

  drawTamamaStopCharacter(); // 繪製 Tamama 待機動畫
} // 結束 drawNormalWorld 函式

function drawQuestionWorld() { // 繪製選擇題期間保持不動的角色畫面
  if (actionType === "push") { // 如果碰撞發生在 Keroro 推動動作期間
    drawPushCharacter(); // 保持顯示推動第 6 階段
  } else { // 如果目前沒有推動動作
    drawKeroroNormalCharacter(); // 繪製 Keroro 一般畫面
  } // 結束答題期間 Keroro 繪製判斷

  drawTamamaStopCharacter(); // 保持顯示答題期間的 Tamama 畫面
} // 結束 drawQuestionWorld 函式

function drawKeroroNormalCharacter() { // 繪製 Keroro 待機或跑步動畫
  const movingLeft = keyIsDown(LEFT_ARROW); // 判斷是否按住左方向鍵
  const movingRight = keyIsDown(RIGHT_ARROW); // 判斷是否按住右方向鍵
  const isMoving = movingLeft !== movingRight && actionType === "none"; // 判斷目前是否使用跑步動畫
  const sprite = isMoving ? runSprite : stopSprite; // 根據移動狀態選擇跑步或待機精靈圖
  const frameCount = isMoving ? runFrameCount : stopFrameCount; // 根據移動狀態選擇動畫格數

  if (!isImageReady(sprite)) { // 如果目前 Keroro 一般精靈圖尚未載入完成
    return; // 暫停繪製避免圖片索引錯誤
  } // 結束 Keroro 一般圖片判斷

  const safeFrame = constrain(currentFrame, 0, frameCount - 1); // 將 Keroro 一般動畫索引限制在有效範圍
  const frameData = getFrameData(sprite, frameCount, safeFrame); // 取得 Keroro 一般動畫格資料
  const displayWidth = frameData.sourceWidth * characterScale * scaleFactor; // 計算 Keroro 一般動畫顯示寬度
  const displayHeight = frameData.sourceHeight * characterScale * scaleFactor; // 計算 Keroro 一般動畫顯示高度

  drawCharacterAtPosition(sprite, frameData, displayWidth, displayHeight, facingLeft, characterX, characterY); // 在 Keroro 目前位置繪製一般動畫
} // 結束 drawKeroroNormalCharacter 函式

function drawTamamaStopCharacter() { // 繪製 Tamama 待機或對話動畫
  if (talkActive) { // 如果 Tamama 正在對話
    drawTamamaTalkCharacter(); // 繪製 Tamama 對話動畫
    drawTamamaDialogue(); // 繪製 Tamama 上方的對話框
    return; // 結束 Tamama 待機繪製
  } // 結束對話狀態判斷

  if (!isImageReady(tamamaStopSprite)) { // 如果 Tamama 待機圖片尚未載入完成
    return; // 暫停繪製避免圖片錯誤
  } // 結束 Tamama 待機圖片判斷

  const frameData = getFrameData(tamamaStopSprite, tamamaStopFrameCount, tamamaStopFrame); // 取得 Tamama 待機動畫格資料
  const displayWidth = frameData.sourceWidth * characterScale * scaleFactor; // 計算 Tamama 顯示寬度
  const displayHeight = frameData.sourceHeight * characterScale * scaleFactor; // 計算 Tamama 顯示高度

  drawCharacterAtPosition(tamamaStopSprite, frameData, displayWidth, displayHeight, true, tamamaX, tamamaY); // 繪製 Tamama 待機動畫並水平翻轉
} // 結束 drawTamamaStopCharacter 函式

function updateTalkState() { // 判斷 Keroro 是否正在與 Tamama 接觸
  if (gameState !== "normal") { // 如果目前不是正常遊戲狀態
    talkActive = false; // 關閉對話狀態
    return; // 結束對話判斷
  } // 結束遊戲狀態判斷

  if (actionType === "push") { // 如果 Keroro 正在執行推動動作
    talkActive = false; // 推動動作優先於對話
    return; // 結束對話判斷
  } // 結束推動判斷

  const keroroBounds = getKeroroNormalBounds(); // 取得 Keroro 一般狀態的碰撞範圍
  const tamamaBounds = getTamamaStopBounds(); // 取得 Tamama 待機狀態的碰撞範圍

  if (keroroBounds && tamamaBounds && rectanglesOverlap(keroroBounds, tamamaBounds)) { // 如果兩個角色正在碰觸
    talkActive = true; // 開啟 Tamama 對話狀態
    tamamaTalkLastFrameAt = millis(); // 記錄對話動畫開始時間
  } else { // 如果兩個角色沒有碰觸
    talkActive = false; // 關閉 Tamama 對話狀態
    tamamaTalkFrame = 0; // 將對話動畫回到第一格
  } // 結束碰觸判斷
} // 結束 updateTalkState 函式

function updateTamamaTalkAnimation() { // 更新 Tamama 對話動畫
  if (!talkActive || !isImageReady(tamamaTalkSprite)) { // 如果沒有對話或圖片尚未載入
    return; // 暫停對話動畫
  } // 結束動畫更新判斷

  const now = millis(); // 取得目前時間

  if (now - tamamaTalkLastFrameAt >= tamamaTalkFrameDuration) { // 如果達到動畫切換時間
    tamamaTalkFrame = (tamamaTalkFrame + 1) % tamamaTalkFrameCount; // 循環播放對話動畫
    tamamaTalkLastFrameAt = now; // 更新上次切換時間
  } // 結束動畫切換判斷
} // 結束 updateTamamaTalkAnimation 函式

function drawTamamaTalkCharacter() { // 繪製 Tamama 對話動畫
  if (!isImageReady(tamamaTalkSprite)) { // 如果對話圖片尚未載入完成
    return; // 暫停繪製避免錯誤
  } // 結束圖片載入判斷

  const frameData = getFrameData(tamamaTalkSprite, tamamaTalkFrameCount, tamamaTalkFrame); // 取得對話動畫格資料
  const displayWidth = frameData.sourceWidth * characterScale * scaleFactor; // 計算對話角色顯示寬度
  const displayHeight = frameData.sourceHeight * characterScale * scaleFactor; // 計算對話角色顯示高度

  drawCharacterAtPosition(tamamaTalkSprite, frameData, displayWidth, displayHeight, true, tamamaX, tamamaY); // 繪製並水平翻轉 Tamama 對話動畫
} // 結束 drawTamamaTalkCharacter 函式

function drawTamamaDialogue() { // 繪製 Tamama 上方的對話框
  const dialogueWidth = max(180, 260 * scaleFactor); // 設定對話框寬度
  const dialogueHeight = max(45, 70 * scaleFactor); // 設定對話框高度
  const dialogueX = tamamaX - dialogueWidth / 2; // 計算對話框水平位置
  const dialogueY = tamamaY - 120 * scaleFactor; // 計算對話框垂直位置

  push(); // 儲存目前畫布繪圖設定
  fill(255, 255, 255, 230); // 設定對話框白色半透明填色
  stroke(50, 50, 50, 220); // 設定對話框邊線
  strokeWeight(max(1, 2 * scaleFactor)); // 設定對話框邊線寬度
  rect(dialogueX, dialogueY, dialogueWidth, dialogueHeight, 12 * scaleFactor); // 繪製圓角對話框
  noStroke(); // 移除文字外框
  fill(30, 30, 30, 255); // 設定文字顏色
  textAlign(CENTER, CENTER); // 設定文字置中
  textSize(max(12, 18 * scaleFactor)); // 設定文字大小
  text("答對題目才能打倒我。", tamamaX, dialogueY + dialogueHeight / 2); // 顯示對話內容
  pop(); // 還原畫布繪圖設定
} // 結束 drawTamamaDialogue 函式

function getKeroroNormalBounds() { // 取得 Keroro 一般狀態的碰撞範圍
  if (!isImageReady(stopSprite)) { // 如果 Keroro 待機圖片尚未載入完成
    return null; // 回傳無效碰撞範圍
  } // 結束圖片載入判斷

  const frameData = getFrameData(stopSprite, stopFrameCount, 0); // 取得 Keroro 待機第一格資料
  const displayWidth = frameData.sourceWidth * characterScale * scaleFactor; // 計算 Keroro 碰撞寬度
  const displayHeight = frameData.sourceHeight * characterScale * scaleFactor; // 計算 Keroro 碰撞高度

  return makeBounds(characterX, characterY, displayWidth, displayHeight); // 回傳 Keroro 碰撞範圍
} // 結束 getKeroroNormalBounds 函式

function keyPressed() { // 當鍵盤按鍵被按下時執行
  if (gameState !== "normal" || actionType !== "none") { // 如果正在答題、結果流程或其他特殊動作
    return false; // 阻止新的按鍵動作以確保流程暫停
  } // 結束按鍵鎖定判斷

  if (keyCode === UP_ARROW) { // 如果按下上方向鍵
    startAction("jump"); // 開始播放一次跳躍動畫
    return false; // 防止瀏覽器執行預設捲動動作
  } // 結束上方向鍵判斷

  if (key === " " || keyCode === 32) { // 如果按下空白鍵
    startAction("push"); // 開始播放一次推動動畫
    return false; // 防止瀏覽器執行預設捲動動作
  } // 結束空白鍵判斷

  return false; // 阻止其他按鍵造成瀏覽器預設行為
} // 結束 keyPressed 函式

function startAction(actionName) { // 開始播放 Keroro 的特殊動作
  actionType = actionName; // 設定目前特殊動作類型
  actionFrame = 0; // 將特殊動作階段重設為第 1 階段
  actionTimer = 0; // 將特殊動作計時器歸零
  lastActionFrameAt = millis(); // 記錄特殊動作開始的毫秒時間
} // 結束 startAction 函式

function updateActionAnimation() { // 使用毫秒計時器更新 Keroro 特殊動作
  if (actionType === "none") { // 如果目前沒有特殊動作
    return; // 不更新特殊動作動畫
  } // 結束無特殊動作判斷

  if (!isActionSpriteReady()) { // 如果目前特殊動作圖片尚未載入完成
    return; // 暫停特殊動作更新避免錯誤
  } // 結束特殊圖片載入判斷

  const now = millis(); // 取得目前毫秒時間
  const frameDuration = actionFrameInterval * 1000 / frameRateValue; // 將特殊動作畫面格間隔換算成毫秒
  const frameCount = actionType === "jump" ? jumpFrameCount : pushActionStageCount; // 取得目前特殊動作階段總數

  if (now - lastActionFrameAt >= frameDuration) { // 如果已經達到特殊動作切換時間
    actionFrame += 1; // 切換至下一個特殊動作階段
    actionTimer = 0; // 將特殊動作計時器歸零
    lastActionFrameAt = now; // 記錄本次特殊動作切格時間
  } // 結束特殊動作切格判斷

  if (actionFrame >= frameCount) { // 如果特殊動作已經播放完畢
    actionType = "none"; // 結束特殊動作並回到一般狀態
    actionFrame = 0; // 將特殊動作索引歸零
    actionTimer = 0; // 將特殊動作計時器歸零
    currentFrame = 0; // 將一般動畫回到第一格
    lastNormalFrameAt = now; // 記錄回到一般動畫的時間
  } // 結束特殊動作完成判斷
} // 結束 updateActionAnimation 函式

function drawActionCharacter(sprite, frameCount) { // 繪製 Keroro 跳躍等一般特殊動作
  if (!isImageReady(sprite)) { // 如果特殊動作精靈圖尚未載入完成
    return; // 暫停繪製避免圖片錯誤
  } // 結束特殊動作圖片判斷

  const safeFrame = constrain(actionFrame, 0, frameCount - 1); // 將特殊動作索引限制在有效範圍
  const frameData = getFrameData(sprite, frameCount, safeFrame); // 取得目前特殊動作動畫格資料
  const displayWidth = frameData.sourceWidth * characterScale * scaleFactor; // 計算特殊動作顯示寬度
  const displayHeight = frameData.sourceHeight * characterScale * scaleFactor; // 計算特殊動作顯示高度
  const actionOffsetY = actionType === "jump" ? -80 * scaleFactor : 0; // 讓跳躍動畫依倍率向上移動 80 基準像素
  const safeX = constrainCharacterX(characterX, displayWidth); // 計算特殊動作的安全水平位置
  const safeY = constrainCharacterY(characterY, displayHeight); // 計算特殊動作的安全垂直位置

  drawCharacterAtPosition(sprite, frameData, displayWidth, displayHeight, facingLeft, safeX, safeY + actionOffsetY); // 在指定位置繪製特殊動作
} // 結束 drawActionCharacter 函式

function drawPushCharacter() { // 依照七階段規則繪製 Keroro 推動動畫
  if (!isImageReady(pushSprite)) { // 如果 Keroro 推動精靈圖尚未載入完成
    return; // 暫停繪製避免圖片錯誤
  } // 結束推動圖片判斷

  const pushStageFrameMap = [0, 1, 2, 3, 3, 3, 3]; // 設定第 5、6 階段持續顯示原始第 4 格
  const safeStage = constrain(actionFrame, 0, pushActionStageCount - 1); // 將推動階段限制在 0 到 6
  const spriteFrame = pushStageFrameMap[safeStage]; // 取得目前階段對應的原始精靈圖格
  const frameData = getFrameData(pushSprite, pushFrameCount, spriteFrame); // 取得推動動畫格資料
  const normalWidth = frameData.sourceWidth * characterScale * scaleFactor; // 計算一般推動圖片寬度
  const normalHeight = frameData.sourceHeight * characterScale * scaleFactor; // 計算一般推動圖片高度
  const isEnlarged = safeStage >= 5; // 判斷目前是否為放大的第 5 或第 6 階段
  const displayWidth = isEnlarged ? normalWidth * 2 : normalWidth; // 第 5、6 階段放大一倍
  const displayHeight = isEnlarged ? normalHeight * 2 : normalHeight; // 第 5、6 階段放大一倍
  const pushMoveDistance = isEnlarged ? (safeStage - 4) * basePushMoveDistance * scaleFactor : 0; // 第 5、6 階段依倍率移動 200、400 基準像素
  const moveOffsetX = facingLeft ? -pushMoveDistance : pushMoveDistance; // 依 Keroro 面向決定推動位移方向
  const safeX = constrainCharacterX(characterX, displayWidth); // 計算推動圖片基準位置的水平邊界
  const drawX = safeX + moveOffsetX; // 計算目前推動階段的圖片中心水平位置
  const drawY = characterY; // 固定推動圖片中心垂直位置避免上下跳動

  drawCharacterAtPosition(pushSprite, frameData, displayWidth, displayHeight, facingLeft, drawX, drawY); // 在指定位置繪製 Keroro 推動動畫
} // 結束 drawPushCharacter 函式

function isActionSpriteReady() { // 檢查 Keroro 目前特殊動作圖片是否可用
  if (actionType === "jump") { // 如果目前是跳躍動作
    return isImageReady(jumpSprite); // 回傳跳躍圖片載入狀態
  } // 結束跳躍圖片判斷

  if (actionType === "push") { // 如果目前是推動動作
    return isImageReady(pushSprite); // 回傳推動圖片載入狀態
  } // 結束推動圖片判斷

  return false; // 沒有特殊動作時回傳不可用
} // 結束 isActionSpriteReady 函式

function isPushCollisionStage(stage) { // 檢查目前推動階段是否對應第 4、5、6 張圖片
  return stage === 3 || stage === 4 || stage === 5; // actionFrame 為 0-based，因此第 4、5、6 張對應 3、4、5
} // 結束 isPushCollisionStage 函式

function isPushStageTouchingTamama() { // 檢查 Keroro 推動目前階段是否碰到 Tamama
  if (!isPushCollisionStage(actionFrame)) { // 如果目前不是第 4、5、6 張圖片對應階段
    return false; // 不觸發碰撞
  } // 結束階段判斷

  const keroroBounds = getKeroroPushBounds(); // 取得 Keroro 第 6 階段顯示範圍
  const tamamaBounds = getTamamaStopBounds(); // 取得 Tamama 待機動畫顯示範圍

  if (!keroroBounds || !tamamaBounds) { // 如果任一角色圖片尚未準備完成
    return false; // 安全地略過碰撞檢查
  } // 結束碰撞資料判斷

  return rectanglesOverlap(keroroBounds, tamamaBounds); // 回傳兩個顯示矩形是否重疊
} // 結束 isPushStageTouchingTamama 函式

function getKeroroPushBounds() { // 計算 Keroro 推動目前階段的顯示邊界
  if (!isImageReady(pushSprite)) { // 如果 Keroro 推動圖片尚未載入完成
    return null; // 回傳無效邊界
  } // 結束圖片載入判斷

  const pushStageFrameMap = [0, 1, 2, 3, 3, 3, 3]; // 設定推動階段對應的精靈圖格
  const safeStage = constrain(actionFrame, 0, pushActionStageCount - 1); // 將推動階段限制在安全範圍
  const spriteFrame = pushStageFrameMap[safeStage]; // 取得目前階段精靈圖格
  const frameData = getFrameData(pushSprite, pushFrameCount, spriteFrame); // 取得推動動畫格資料
  const normalWidth = frameData.sourceWidth * characterScale * scaleFactor; // 計算一般圖片寬度
  const normalHeight = frameData.sourceHeight * characterScale * scaleFactor; // 計算一般圖片高度
  const isEnlarged = safeStage >= 5; // 判斷是否為放大階段
  const displayWidth = isEnlarged ? normalWidth * 2 : normalWidth; // 計算目前圖片顯示寬度
  const displayHeight = isEnlarged ? normalHeight * 2 : normalHeight; // 計算目前圖片顯示高度
  const pushMoveDistance = isEnlarged ? (safeStage - 4) * basePushMoveDistance * scaleFactor : 0; // 計算目前階段水平位移
  const moveOffsetX = facingLeft ? -pushMoveDistance : pushMoveDistance; // 依面向計算水平位移方向
  const centerX = constrainCharacterX(characterX, displayWidth) + moveOffsetX; // 計算 Keroro 推動圖片中心

  return makeBounds(centerX, characterY, displayWidth, displayHeight); // 回傳 Keroro 推動矩形邊界
} // 結束 getKeroroPushBounds 函式

function getTamamaStopBounds() { // 計算 Tamama 待機動畫的顯示邊界
  if (!isImageReady(tamamaStopSprite)) { // 如果 Tamama 待機圖片尚未載入完成
    return null; // 回傳無效邊界
  } // 結束圖片載入判斷

  const frameData = getFrameData(tamamaStopSprite, tamamaStopFrameCount, tamamaStopFrame); // 取得 Tamama 目前待機格資料
  const displayWidth = frameData.sourceWidth * characterScale * scaleFactor; // 計算 Tamama 顯示寬度
  const displayHeight = frameData.sourceHeight * characterScale * scaleFactor; // 計算 Tamama 顯示高度

  return makeBounds(tamamaX, tamamaY, displayWidth, displayHeight); // 回傳 Tamama 待機矩形邊界
} // 結束 getTamamaStopBounds 函式

function makeBounds(centerX, centerY, displayWidth, displayHeight) { // 根據中心點與尺寸建立矩形邊界資料
  return { left: centerX - displayWidth / 2, right: centerX + displayWidth / 2, top: centerY - displayHeight / 2, bottom: centerY + displayHeight / 2 }; // 回傳安全的矩形邊界
} // 結束 makeBounds 函式

function rectanglesOverlap(firstBounds, secondBounds) { // 檢查兩個矩形是否互相重疊
  return firstBounds.left <= secondBounds.right && firstBounds.right >= secondBounds.left && firstBounds.top <= secondBounds.bottom && firstBounds.bottom >= secondBounds.top; // 回傳矩形碰撞結果
} // 結束 rectanglesOverlap 函式

function enterQuestionState() { // 進入選擇題狀態並鎖定碰撞只觸發一次
  collisionTriggered = true; // 標記本次碰撞已經觸發問答
  gameState = "question"; // 將遊戲狀態切換為選擇題
  questionData = createRandomQuestion(); // 建立一題隨機四則運算
} // 結束 enterQuestionState 函式

function createRandomQuestion() { // 建立隨機四則運算題目與四個選項
  const operators = ["+", "-", "×", "÷"]; // 建立四則運算符號清單
  const operator = random(operators); // 隨機選取一種運算符號
  let firstNumber = 0; // 宣告第一個運算數
  let secondNumber = 0; // 宣告第二個運算數
  let answer = 0; // 宣告正確答案

  if (operator === "÷") { // 如果題目是除法
    secondNumber = floor(random(1, 13)); // 產生不為零的除數
    answer = floor(random(1, 13)); // 產生整數商
    firstNumber = secondNumber * answer; // 由除數乘商建立可整除的被除數
  } else if (operator === "+") { // 如果題目是加法
    firstNumber = floor(random(1, 21)); // 產生第一個正整數
    secondNumber = floor(random(1, 21)); // 產生第二個正整數
    answer = firstNumber + secondNumber; // 計算加法答案
  } else if (operator === "-") { // 如果題目是減法
    firstNumber = floor(random(1, 21)); // 產生第一個正整數
    secondNumber = floor(random(1, firstNumber + 1)); // 產生不大於被減數的第二個整數
    answer = firstNumber - secondNumber; // 計算減法答案
  } else { // 如果題目是乘法
    firstNumber = floor(random(1, 13)); // 產生第一個乘數
    secondNumber = floor(random(1, 13)); // 產生第二個乘數
    answer = firstNumber * secondNumber; // 計算乘法答案
  } // 結束運算答案判斷

  const options = [answer]; // 先將正確答案放入選項清單
  const wrongRange = max(5, abs(answer) + 5); // 設定錯誤答案產生範圍

  while (options.length < 4) { // 持續產生直到有四個不同選項
    const wrongAnswer = answer + floor(random(-wrongRange, wrongRange + 1)); // 產生可能的錯誤答案

    if (!options.includes(wrongAnswer)) { // 如果錯誤答案尚未存在於清單
      options.push(wrongAnswer); // 將不同的錯誤答案加入清單
    } // 結束錯誤答案重複判斷
  } // 結束四個選項產生迴圈

  shuffleArray(options); // 將正確答案與錯誤答案隨機排列

  return { text: `${firstNumber} ${operator} ${secondNumber} = ?`, answer: answer, options: options }; // 回傳題目文字、正解與選項
} // 結束 createRandomQuestion 函式

function shuffleArray(values) { // 使用 Fisher-Yates 演算法打亂選項陣列
  for (let index = values.length - 1; index > 0; index -= 1) { // 從陣列最後一項逐項往前處理
    const swapIndex = floor(random(index + 1)); // 隨機產生交換位置
    const temporaryValue = values[index]; // 暫存目前索引的選項
    values[index] = values[swapIndex]; // 將隨機位置選項移至目前位置
    values[swapIndex] = temporaryValue; // 將暫存選項移至隨機位置
  } // 結束陣列打亂迴圈
} // 結束 shuffleArray 函式

function drawQuestionPanel() { // 繪製中央四分之一大小的選擇題方框
  if (!questionData) { // 如果目前沒有題目資料
    return; // 不繪製選擇題介面
  } // 結束題目資料判斷

  const boxWidth = width / 4; // 設定題目框寬度為視窗寬度的四分之一
  const boxHeight = height / 4; // 設定題目框高度為視窗高度的四分之一
  const boxX = width / 2 - boxWidth / 2; // 計算題目框水平置中位置
  const boxY = height / 2 - boxHeight / 2; // 計算題目框垂直置中位置
  const optionTextSize = max(10, min(width, height) * 0.018); // 設定選項文字的響應式字體大小

  push(); // 儲存目前畫布繪圖設定
  rectMode(CORNER); // 設定方框使用左上角定位
  stroke(80, 70, 45, 180); // 設定題目框邊線顏色
  strokeWeight(max(1, scaleFactor * 2)); // 設定題目框邊線寬度
  fill(254, 250, 224, 80); // 使用指定的 #fefae0 並設定透明度 alpha 80
  rect(boxX, boxY, boxWidth, boxHeight, 10 * scaleFactor); // 繪製中央題目框
  noStroke(); // 移除文字與選項方框前的邊線設定
  fill(55, 45, 30, 255); // 設定題目文字顏色
  textAlign(CENTER, CENTER); // 設定題目文字水平與垂直置中
  textSize(max(12, min(width, height) * 0.022)); // 設定題目文字大小
  text(questionData.text, width / 2, boxY + boxHeight * 0.20); // 在題目框上方顯示題目

  for (let optionIndex = 0; optionIndex < 4; optionIndex += 1) { // 逐一繪製四個選項方框
    const optionRect = getOptionRect(optionIndex); // 取得目前選項方框位置與大小
    stroke(90, 75, 45, 220); // 設定選項方框邊線顏色
    strokeWeight(max(1, scaleFactor)); // 設定選項方框邊線寬度
    fill(254, 250, 224, 190); // 設定選項方框填色
    rect(optionRect.x, optionRect.y, optionRect.width, optionRect.height, 5 * scaleFactor); // 繪製目前選項方框
    noStroke(); // 移除選項文字邊線
    fill(55, 45, 30, 255); // 設定選項文字顏色
    textSize(optionTextSize); // 設定選項文字大小
    text(String(questionData.options[optionIndex]), optionRect.x + optionRect.width / 2, optionRect.y + optionRect.height / 2); // 顯示目前選項答案
  } // 結束四個選項繪製迴圈

  pop(); // 還原畫布繪圖設定
} // 結束 drawQuestionPanel 函式

function getOptionRect(optionIndex) { // 計算四個選項方框的安全位置
  const boxWidth = width / 4; // 取得題目框寬度
  const boxHeight = height / 4; // 取得題目框高度
  const boxX = width / 2 - boxWidth / 2; // 取得題目框左側位置
  const boxY = height / 2 - boxHeight / 2; // 取得題目框上側位置
  const optionWidth = boxWidth * 0.40; // 設定選項方框寬度
  const optionHeight = boxHeight * 0.20; // 設定選項方框高度
  const column = optionIndex % 2; // 計算目前選項所在欄位
  const row = floor(optionIndex / 2); // 計算目前選項所在列位
  const x = boxX + boxWidth * (column === 0 ? 0.07 : 0.53); // 計算目前選項水平位置
  const y = boxY + boxHeight * (row === 0 ? 0.43 : 0.69); // 計算目前選項垂直位置

  return { x: x, y: y, width: optionWidth, height: optionHeight }; // 回傳選項方框資料
} // 結束 getOptionRect 函式

function mousePressed() { // 當滑鼠按下時執行選項回答功能
  if (gameState !== "question" || !questionData) { // 如果目前不是答題狀態或沒有題目
    return false; // 不處理滑鼠點擊
  } // 結束答題狀態判斷

  for (let optionIndex = 0; optionIndex < 4; optionIndex += 1) { // 逐一檢查四個選項方框
    const optionRect = getOptionRect(optionIndex); // 取得目前選項方框位置
    const isInside = mouseX >= optionRect.x && mouseX <= optionRect.x + optionRect.width && mouseY >= optionRect.y && mouseY <= optionRect.y + optionRect.height; // 判斷滑鼠是否點在選項內

    if (isInside) { // 如果滑鼠點中了目前選項
      answerQuestion(optionIndex); // 依選項索引判斷答案
      break; // 點擊後停止檢查其他選項
    } // 結束選項點擊判斷
  } // 結束選項檢查迴圈

  return false; // 防止瀏覽器執行滑鼠預設行為
} // 結束 mousePressed 函式

function answerQuestion(optionIndex) { // 處理使用者選取的答案
  if (gameState !== "question" || !questionData) { // 如果目前不在有效答題狀態
    return; // 安全結束答案處理
  } // 結束有效答題狀態判斷

  const selectedAnswer = questionData.options[optionIndex]; // 取得使用者點選的答案
  const isCorrect = selectedAnswer === questionData.answer; // 比較使用者答案與正確答案
  questionData = null; // 讓題目框在答題後消失

  if (isCorrect) { // 如果使用者答對題目
    startCorrectSequence(); // 開始 Tamama 摔倒流程
  } else { // 如果使用者答錯題目
    startIncorrectSequence(); // 開始 Tamama 推動與 Keroro 摔倒流程
  } // 結束答案正誤判斷
} // 結束 answerQuestion 函式

function startCorrectSequence() { // 開始答對時的 Tamama 摔倒流程
  gameState = "correct"; // 將遊戲狀態切換為答對流程
  actionType = "none"; // 結束 Keroro 推動動作並讓其保持靜止
  correctFallFrame = 0; // 將 Tamama 摔倒動畫設定為第 1 格
  correctFallLastFrameAt = millis(); // 記錄 Tamama 摔倒動畫開始時間
  correctHoldStartAt = 0; // 清除第 3 格保持計時起點
} // 結束 startCorrectSequence 函式

function updateCorrectSequence() { // 使用毫秒計時器更新答對流程
  if (!isImageReady(tamamaFallSprite)) { // 如果 Tamama 摔倒圖片尚未載入完成
    return; // 暫停答對動畫更新
  } // 結束 Tamama 摔倒圖片判斷

  const now = millis(); // 取得目前毫秒時間

  if (correctFallFrame < tamamaFallFrameCount - 1 && now - correctFallLastFrameAt >= tamamaFallFrameDuration) { // 如果尚未到第 3 格且達到切格時間
    correctFallFrame += 1; // 播放下一格 Tamama 摔倒動畫
    correctFallLastFrameAt = now; // 記錄本次切格時間

    if (correctFallFrame === tamamaFallFrameCount - 1) { // 如果已經播放到第 3 格
      correctHoldStartAt = now; // 開始計算第 3 格保持五秒時間
    } // 結束第 3 格開始判斷
  } // 結束 Tamama 摔倒切格判斷

  if (correctFallFrame === tamamaFallFrameCount - 1 && correctHoldStartAt > 0 && now - correctHoldStartAt >= resultHoldDuration) { // 如果第 3 格已保持五秒
    finishCorrectSequence(); // 回復正常遊戲狀態
  } // 結束答對保持時間判斷
} // 結束 updateCorrectSequence 函式

function drawCorrectWorld() { // 繪製答對流程的角色畫面
  drawKeroroStoppedCharacter(); // 答對期間讓 Keroro 固定顯示待機第一格
  drawTamamaFallCharacter(); // 繪製 Tamama 摔倒動畫
} // 結束 drawCorrectWorld 函式

function drawKeroroStoppedCharacter() { // 繪製答題結果期間固定不動的 Keroro
  if (!isImageReady(stopSprite)) { // 如果 Keroro 待機圖片尚未載入完成
    return; // 暫停繪製避免圖片錯誤
  } // 結束 Keroro 待機圖片判斷

  const frameData = getFrameData(stopSprite, stopFrameCount, 0); // 取得 Keroro 待機第一格資料
  const displayWidth = frameData.sourceWidth * characterScale * scaleFactor; // 計算 Keroro 固定畫面寬度
  const displayHeight = frameData.sourceHeight * characterScale * scaleFactor; // 計算 Keroro 固定畫面高度

  drawCharacterAtPosition(stopSprite, frameData, displayWidth, displayHeight, facingLeft, characterX, characterY); // 固定繪製 Keroro 待機第一格
} // 結束 drawKeroroStoppedCharacter 函式

function drawTamamaFallCharacter() { // 繪製答對時 Tamama 的摔倒動畫
  if (!isImageReady(tamamaFallSprite)) { // 如果 Tamama 摔倒圖片尚未載入完成
    return; // 暫停繪製避免圖片錯誤
  } // 結束 Tamama 摔倒圖片判斷

  const safeFrame = constrain(correctFallFrame, 0, tamamaFallFrameCount - 1); // 將 Tamama 摔倒索引限制在有效範圍
  const frameData = getFrameData(tamamaFallSprite, tamamaFallFrameCount, safeFrame); // 取得 Tamama 摔倒動畫格資料
  const displayWidth = frameData.sourceWidth * characterScale * scaleFactor; // 計算 Tamama 摔倒顯示寬度
  const displayHeight = frameData.sourceHeight * characterScale * scaleFactor; // 計算 Tamama 摔倒顯示高度
  const moveOffsetX = safeFrame * correctFallMoveDistance * scaleFactor; // 第 2 格向右 30、第 3 格向右 60 基準像素

  drawCharacterAtPosition(tamamaFallSprite, frameData, displayWidth, displayHeight, true, tamamaX + moveOffsetX, tamamaY); // 繪製 Tamama 摔倒動畫並水平翻轉
} // 結束 drawTamamaFallCharacter 函式

function finishCorrectSequence() { // 完成答對流程並恢復正常狀態
  resetCharactersAndState(); // 答對動畫與五秒停留完成後統一重設兩個角色的位置與狀態
} // 結束 finishCorrectSequence 函式

function startIncorrectSequence() { // 開始答錯時的 Tamama 推動與 Keroro 摔倒流程
  gameState = "incorrect"; // 將遊戲狀態切換為答錯流程
  actionType = "none"; // 結束 Keroro 原本的推動動作
  actionFrame = 0; // 將 Keroro 特殊動作索引歸零
  incorrectTamamaFrame = 0; // 將 Tamama 推動動畫設定為第 1 格
  incorrectTamamaLastFrameAt = millis(); // 記錄 Tamama 推動動畫開始時間
  incorrectTamamaFinished = false; // 標記 Tamama 推動動畫尚未完成
  incorrectKeroroFrame = 0; // 讓 Keroro 先維持摔倒動畫第 1 格
  incorrectKeroroLastFrameAt = millis(); // 記錄 Keroro 摔倒動畫等待開始時間
  incorrectKeroroHoldStartAt = 0; // 清除 Keroro 第 4 格保持計時起點
  characterX = constrainCharacterX(characterX, getKeroroNormalWidth()); // 答錯流程不改變 Keroro 原本位置，只重新確認其不超出畫面邊界
  facingLeft = false; // 答錯流程讓 Keroro 維持面向右方
  tamamaX = getAdjacentTamamaX(); // 讓 Tamama 位於 Keroro 右側且相隔 20 個基準像素
  tamamaY = characterY; // 將 Tamama 垂直位置設定與 Keroro 相同
  incorrectTamamaFacingLeft = true; // 答錯流程中的 Tamama 固定面向左方
} // 結束 startIncorrectSequence 函式

function getAdjacentTamamaX() { // 計算答錯時 Tamama 位於 Keroro 右側的中心位置
  const keroroWidth = getKeroroNormalWidth(); // 取得目前 Keroro 一般顯示寬度
  const tamamaWidth = getTamamaStopWidth(); // 取得目前 Tamama 待機顯示寬度
  const targetX = characterX + keroroWidth / 2 + tamamaWidth / 2 + incorrectSideGap * scaleFactor; // 依兩角色邊界與 20 個基準像素間距計算 Tamama 目標位置
  return constrainCharacterX(targetX, tamamaWidth); // 限制 Tamama 不超出畫面左右邊界後回傳位置
} // 結束 getAdjacentTamamaX 函式

function updateIncorrectSequence() { // 使用毫秒計時器更新答錯流程
  const now = millis(); // 取得目前毫秒時間

  if (!incorrectTamamaFinished && now - incorrectTamamaLastFrameAt >= tamamaPushFrameDuration) { // 如果 Tamama 推動動畫尚未完成且達到切格時間
    if (incorrectTamamaFrame < tamamaPushFrameCount - 1) { // 如果尚未播放到第 11 張
      incorrectTamamaFrame += 1; // 播放下一張 Tamama 推動圖片
      incorrectTamamaLastFrameAt = now; // 記錄 Tamama 本次切格時間

      if (incorrectTamamaFrame === tamamaPushFrameCount - 2) { // 如果 Tamama 已經執行到第 10 張圖片
        incorrectKeroroFrame = 1; // 讓 Keroro 從摔倒第 2 格開始播放
        incorrectKeroroLastFrameAt = now; // 記錄 Keroro 開始摔倒動畫的時間
      } // 結束 Tamama 第 10 張圖片判斷
    } else { // 如果第 11 張圖片已經顯示一段時間
      incorrectTamamaFinished = true; // 標記 Tamama 推動動畫完成
      tamamaStopFrame = 0; // 將 Tamama 待機動畫設為第一格
      tamamaStopLastFrameAt = now; // 記錄 Tamama 待機動畫恢復時間
    } // 結束 Tamama 推動完成判斷
  } // 結束 Tamama 推動動畫更新

  if (incorrectKeroroFrame >= 1 && incorrectKeroroFrame < keroroFallFrameCount - 1 && now - incorrectKeroroLastFrameAt >= keroroFallFrameDuration) { // 如果 Keroro 正在播放第 2 至第 4 格且達到切格時間
    incorrectKeroroFrame += 1; // 播放下一格 Keroro 摔倒動畫
    incorrectKeroroLastFrameAt = now; // 記錄 Keroro 本次切格時間

    if (incorrectKeroroFrame === keroroFallFrameCount - 1) { // 如果 Keroro 已經播放到第 4 格
      incorrectKeroroHoldStartAt = now; // 開始計算第 4 格保持五秒時間
    } // 結束 Keroro 第 4 格開始判斷
  } // 結束 Keroro 摔倒動畫切格判斷

  if (incorrectKeroroFrame === keroroFallFrameCount - 1 && incorrectKeroroHoldStartAt > 0 && now - incorrectKeroroHoldStartAt >= resultHoldDuration) { // 如果 Keroro 第 4 格已經保持五秒
    finishIncorrectSequence(); // 回復 Keroro 待機與 Tamama 待機狀態
  } // 結束答錯保持時間判斷
} // 結束 updateIncorrectSequence 函式

function drawIncorrectWorld() { // 繪製答錯流程的角色畫面
  drawIncorrectKeroroCharacter(); // 繪製 Keroro 摔倒動畫

  if (incorrectTamamaFinished) { // 如果 Tamama 推動動畫已經完成
    drawTamamaStopCharacter(); // 讓 Tamama 恢復待機動畫
  } else { // 如果 Tamama 推動動畫尚未完成
    drawIncorrectTamamaCharacter(); // 繪製 Tamama 推動動畫
  } // 結束 Tamama 答錯流程繪製判斷
} // 結束 drawIncorrectWorld 函式

function drawIncorrectTamamaCharacter() { // 繪製答錯時 Tamama 的推動動畫
  if (!isImageReady(tamamaPushSprite)) { // 如果 Tamama 推動圖片尚未載入完成
    return; // 暫停繪製避免圖片錯誤
  } // 結束 Tamama 推動圖片判斷

  const safeFrame = constrain(incorrectTamamaFrame, 0, tamamaPushFrameCount - 1); // 將 Tamama 推動索引限制在有效範圍
  const frameData = getFrameData(tamamaPushSprite, tamamaPushFrameCount, safeFrame); // 取得 Tamama 推動動畫格資料
  const displayWidth = frameData.sourceWidth * characterScale * scaleFactor; // 計算 Tamama 推動顯示寬度
  const displayHeight = frameData.sourceHeight * characterScale * scaleFactor; // 計算 Tamama 推動顯示高度

  drawCharacterAtPosition(tamamaPushSprite, frameData, displayWidth, displayHeight, incorrectTamamaFacingLeft, tamamaX, tamamaY); // 繪製 Tamama 推動動畫並套用水平翻轉
} // 結束 drawIncorrectTamamaCharacter 函式

function drawIncorrectKeroroCharacter() { // 繪製答錯時 Keroro 的摔倒動畫
  if (!isImageReady(keroroFallSprite)) { // 如果 Keroro 摔倒圖片尚未載入完成
    drawKeroroNormalCharacter(); // 圖片未完成時安全地繪製一般角色
    return; // 結束 Keroro 摔倒繪製
  } // 結束 Keroro 摔倒圖片判斷

  const safeFrame = constrain(incorrectKeroroFrame, 0, keroroFallFrameCount - 1); // 將 Keroro 摔倒索引限制在有效範圍
  const frameData = getFrameData(keroroFallSprite, keroroFallFrameCount, safeFrame); // 取得 Keroro 摔倒動畫格資料
  const displayWidth = frameData.sourceWidth * characterScale * scaleFactor; // 計算 Keroro 摔倒顯示寬度
  const displayHeight = frameData.sourceHeight * characterScale * scaleFactor; // 計算 Keroro 摔倒顯示高度
  const offset = getIncorrectKeroroOffset(safeFrame); // 取得目前 Keroro 摔倒格的相對位移

  const shouldFaceLeft = safeFrame > 0 ? facingLeft : false; // Keroro 跌倒第 1 格固定面向右方，後續格沿用答錯流程方向
  drawCharacterAtPosition(keroroFallSprite, frameData, displayWidth, displayHeight, shouldFaceLeft, characterX + offset.x, characterY + offset.y); // 依跌倒格數繪製 Keroro 摔倒動畫
} // 結束 drawIncorrectKeroroCharacter 函式

function getIncorrectKeroroOffset(frameIndex) { // 取得 Keroro 摔倒四個動畫格的指定位移
  if (frameIndex === 1) { // 如果目前是第 2 張圖片
    return { x: incorrectKeroroFrame1OffsetX * scaleFactor, y: incorrectKeroroFrame1OffsetY * scaleFactor }; // 回傳第 2 張向左 40 向上 50 的位移
  } // 結束第 2 張位移判斷

  if (frameIndex === 2) { // 如果目前是第 3 張圖片
    return { x: incorrectKeroroFrame2OffsetX * scaleFactor, y: incorrectKeroroFrame2OffsetY * scaleFactor }; // 回傳第 3 張向左 70 向上 25 的位移
  } // 結束第 3 張位移判斷

  if (frameIndex === 3) { // 如果目前是第 4 張圖片
    return { x: incorrectKeroroFrame3OffsetX * scaleFactor, y: incorrectKeroroFrame3OffsetY * scaleFactor }; // 回傳第 4 張向左 100 的位移
  } // 結束第 4 張位移判斷

  return { x: 0, y: 0 }; // 第 1 張圖片維持原本基準位置
} // 結束 getIncorrectKeroroOffset 函式

function finishIncorrectSequence() { // 完成答錯流程並恢復正常狀態
  resetCharactersAndState(); // 答錯動畫與五秒停留完成後統一重設兩個角色的位置與狀態
} // 結束 finishIncorrectSequence 函式

function drawCharacterAtPosition(sprite, frameData, displayWidth, displayHeight, shouldFaceLeft, drawX, drawY) { // 在指定座標繪製單一精靈動畫格
  if (!isImageReady(sprite) || !frameData) { // 如果圖片或動畫格資料尚未準備完成
    return; // 安全略過錯誤的繪製要求
  } // 結束繪製資料判斷

  push(); // 儲存目前畫布的繪圖設定
  translate(drawX, drawY); // 將繪圖原點移動到指定中心座標

  if (shouldFaceLeft) { // 如果角色需要面向左方
    scale(-1, 1); // 將角色圖片水平翻轉
  } // 結束水平翻轉判斷

  image(sprite, -displayWidth / 2, -displayHeight / 2, displayWidth, displayHeight, frameData.sourceLeft, 0, frameData.sourceWidth, frameData.sourceHeight); // 繪製精靈圖中的單一動畫格
  pop(); // 還原原本的畫布繪圖設定
} // 結束 drawCharacterAtPosition 函式

function drawBackground() { // 繪製原本的背景圖片
  if (isImageReady(backgroundImage)) { // 如果背景圖片已經載入完成
    image(backgroundImage, 0, 0, width, height); // 將背景圖片繪製並填滿目前畫布
  } else { // 如果背景圖片尚未載入完成
    background("#87CEEB"); // 使用天空藍作為暫時背景
  } // 結束背景繪製判斷
} // 結束 drawBackground 函式

function getFrameData(sprite, frameCount, frameIndex) { // 使用精靈圖總寬度平均切割動畫格
  if (!isImageReady(sprite) || frameCount <= 0) { // 如果圖片未載入或動畫格數無效
    return null; // 回傳無效資料避免索引錯誤
  } // 結束動畫格資料安全判斷

  const safeFrameIndex = constrain(floor(frameIndex), 0, frameCount - 1); // 將動畫索引限制在合法範圍
  const sourceLeft = floor(safeFrameIndex * sprite.width / frameCount); // 計算動畫格左側來源座標
  const sourceRight = floor((safeFrameIndex + 1) * sprite.width / frameCount); // 計算動畫格右側來源座標
  const sourceWidth = max(1, sourceRight - sourceLeft); // 計算動畫格實際來源寬度並避免零寬度
  const sourceHeight = max(1, sprite.height); // 取得動畫格來源高度並避免零高度

  return { sourceLeft: sourceLeft, sourceWidth: sourceWidth, sourceHeight: sourceHeight }; // 回傳動畫格完整資料
} // 結束 getFrameData 函式

function getKeroroNormalWidth() { // 取得 Keroro 一般待機格的響應式顯示寬度
  if (!isImageReady(stopSprite)) { // 如果 Keroro 待機圖片尚未載入完成
    return characterScale * scaleFactor; // 回傳安全的最小寬度
  } // 結束 Keroro 待機圖片判斷

  const frameData = getFrameData(stopSprite, stopFrameCount, 0); // 取得 Keroro 待機第一格資料
  return frameData.sourceWidth * characterScale * scaleFactor; // 回傳 Keroro 一般顯示寬度
} // 結束 getKeroroNormalWidth 函式

function getKeroroNormalHeight() { // 取得 Keroro 一般待機格的響應式顯示高度
  if (!isImageReady(stopSprite)) { // 如果 Keroro 待機圖片尚未載入完成
    return characterScale * scaleFactor; // 回傳安全的最小高度
  } // 結束 Keroro 待機圖片判斷

  const frameData = getFrameData(stopSprite, stopFrameCount, 0); // 取得 Keroro 待機第一格資料
  return frameData.sourceHeight * characterScale * scaleFactor; // 回傳 Keroro 一般顯示高度
} // 結束 getKeroroNormalHeight 函式

function getTamamaStopWidth() { // 取得 Tamama 待機格的響應式顯示寬度
  if (!isImageReady(tamamaStopSprite)) { // 如果 Tamama 待機圖片尚未載入完成
    return characterScale * scaleFactor; // 回傳安全的最小寬度
  } // 結束 Tamama 待機圖片判斷

  const frameData = getFrameData(tamamaStopSprite, tamamaStopFrameCount, 0); // 取得 Tamama 待機第一格資料
  return frameData.sourceWidth * characterScale * scaleFactor; // 回傳 Tamama 顯示寬度
} // 結束 getTamamaStopWidth 函式

function getTamamaStopHeight() { // 取得 Tamama 待機格的響應式顯示高度
  if (!isImageReady(tamamaStopSprite)) { // 如果 Tamama 待機圖片尚未載入完成
    return characterScale * scaleFactor; // 回傳安全的最小高度
  } // 結束 Tamama 待機圖片判斷

  const frameData = getFrameData(tamamaStopSprite, tamamaStopFrameCount, 0); // 取得 Tamama 待機第一格資料
  return frameData.sourceHeight * characterScale * scaleFactor; // 回傳 Tamama 一般顯示高度
} // 結束 getTamamaStopHeight 函式

function resetCharactersAndState() { // 統一重設答題流程完成後兩個角色的位置與所有動畫狀態
  const initialCharacterHeight = max(getKeroroNormalHeight(), getTamamaStopHeight()); // 以兩個角色較高者計算安全的初始垂直位置
  characterX = constrainCharacterX(width * initialKeroroXRatio, getKeroroNormalWidth()); // 將 Keroro 重設到畫面寬度五分之一並限制水平邊界
  characterY = calculateInitialCharacterY(initialCharacterHeight); // 將 Keroro 重設到加入 50 像素偏移後的初始垂直位置
  tamamaX = constrainCharacterX(width * initialTamamaXRatio, getTamamaStopWidth()); // 將 Tamama 重設到畫面寬度五分之四並限制水平邊界
  tamamaY = characterY; // 讓 Tamama 與 Keroro 使用相同的初始垂直位置
  gameState = "normal"; // 將遊戲狀態重設為正常
  collisionTriggered = false; // 允許下一次推動碰撞重新觸發問答
  questionData = null; // 清除上一題的題目資料
  actionType = "none"; // 清除 Keroro 特殊動作狀態
  actionFrame = 0; // 將特殊動作格索引歸零
  actionTimer = 0; // 將特殊動作計時器歸零
  lastActionFrameAt = millis(); // 重新記錄特殊動作計時基準時間
  currentFrame = 0; // 將 Keroro 一般動畫回到第一格
  frameTimer = 0; // 將 Keroro 一般動畫計時器歸零
  lastNormalFrameAt = millis(); // 重新記錄 Keroro 一般動畫計時基準時間
  facingLeft = false; // 將 Keroro 初始面向重設為右方
  tamamaStopFrame = 0; // 將 Tamama 待機動畫回到第一格
  tamamaStopLastFrameAt = millis(); // 重新記錄 Tamama 待機動畫計時基準時間
  correctFallFrame = 0; // 將答對時 Tamama 摔倒格索引歸零
  correctFallLastFrameAt = 0; // 清除答對流程切格時間
  correctHoldStartAt = 0; // 清除答對流程五秒停留起點
  incorrectTamamaFrame = 0; // 將答錯時 Tamama 推動格索引歸零
  incorrectTamamaLastFrameAt = 0; // 清除 Tamama 推動切格時間
  incorrectTamamaFinished = false; // 清除 Tamama 推動完成狀態
  incorrectKeroroFrame = 0; // 將答錯時 Keroro 摔倒格索引歸零
  incorrectKeroroLastFrameAt = 0; // 清除 Keroro 摔倒切格時間
  incorrectKeroroHoldStartAt = 0; // 清除 Keroro 摔倒五秒停留起點
  incorrectTamamaFacingLeft = false; // 清除答錯流程中的 Tamama 左向狀態
} // 結束 resetCharactersAndState 函式

function calculateInitialCharacterY(displayHeight) { // 計算基準偏移經響應式縮放後的角色垂直位置
  const preferredY = height / 2 + (initialVerticalOffset + initialVerticalExtraOffset) * scaleFactor; // 計算畫面中央下方 270 加 50 基準像素的位置
  return constrainCharacterY(preferredY, displayHeight); // 將角色垂直位置限制在畫面範圍內
} // 結束 calculateInitialCharacterY 函式

function constrainCharacterX(x, displayWidth) { // 限制角色水平中心不超出畫布
  const safeWidth = max(1, displayWidth); // 確保傳入寬度為正值
  const halfWidth = safeWidth / 2; // 計算角色顯示寬度的一半

  if (width <= safeWidth) { // 如果角色寬度大於畫布寬度
    return width / 2; // 將角色固定在畫面中央
  } // 結束畫布過小判斷

  return constrain(x, halfWidth, width - halfWidth); // 將角色限制在左右邊界內
} // 結束 constrainCharacterX 函式

function constrainCharacterY(y, displayHeight) { // 限制角色垂直中心不超出畫布
  const safeHeight = max(1, displayHeight); // 確保傳入高度為正值
  const halfHeight = safeHeight / 2; // 計算角色顯示高度的一半

  if (height <= safeHeight) { // 如果角色高度大於畫布高度
    return height / 2; // 將角色固定在畫面中央
  } // 結束畫布過小判斷

  return constrain(y, halfHeight, height - halfHeight); // 將角色限制在上下邊界內
} // 結束 constrainCharacterY 函式

function isImageReady(imageObject) { // 檢查圖片物件是否已經成功載入
  return Boolean(imageObject && imageObject.width > 0 && imageObject.height > 0); // 回傳圖片是否有效
} // 結束 isImageReady 函式

function windowResized() { // 當瀏覽器視窗大小改變時重新處理畫布與角色位置
  const oldWidth = max(1, width); // 儲存調整前的畫布寬度
  const oldCharacterRatio = characterX / oldWidth; // 儲存 Keroro 調整前的水平比例位置

  resizeCanvas(windowWidth, windowHeight); // 將畫布調整為新的視窗大小
  updateScaleFactor(); // 重新計算新的等比例縮放倍率
  characterX = width * oldCharacterRatio; // 依新的畫面寬度恢復 Keroro 水平比例位置
  characterY = calculateInitialCharacterY(getKeroroNormalHeight()); // 依新的畫面高度重新處理 Keroro 垂直位置
  characterX = constrainCharacterX(characterX, getKeroroNormalWidth()); // 重新限制 Keroro 水平邊界
  tamamaY = characterY; // 重新處理 Tamama 垂直位置

  if (gameState === "incorrect") { // 如果視窗縮放時正處於答錯流程
    tamamaX = getAdjacentTamamaX(); // 重新計算 Tamama 與 Keroro 的相鄰位置
  } else { // 如果不是答錯流程
    tamamaX = width * initialTamamaXRatio; // 將 Tamama 重新定位到畫面右側五分之一
  } // 結束 Tamama 視窗縮放位置判斷
} // 結束 windowResized 函式
