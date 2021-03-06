// IFrame Player API の読み込み
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var ytPlayer;
var loopFlg = false;
var MaxPlaySecond = 5400;
var CurrentSecond = 0;
var SetFlg = false;

DisplayDataImportFlg();

// YouTubeの埋め込み
function onYouTubeIframeAPIReady() {
	ytPlayer = new YT.Player(
		'sample', // 埋め込む場所の指定
		{
			width: 600, // プレーヤーの幅
			height: 200, // プレーヤーの高さ
			//videoId: 'bHQqvYy5KYo', // YouTubeのID
			
		    playerVars: {
		      'playlist': 'rxv76yHwrAw,CqIUyFBhRAM'
		    },
    
			// イベントの設定
			events: {
				'onReady': onPlayerReady, // プレーヤーの準備ができたときに実行
				'onStateChange': onPlayerStateChange // プレーヤーの状態が変更されたときに実行
			}
			
		}
	);
}

var playUrls = "";
var lines = "";
var playListString = "";

var playerReady = false;

// プレーヤーの準備ができたとき
function onPlayerReady(event) {
	playerReady = true;
	
	// 動画再生
	//event.target.playVideo();
}

// プレーヤーの状態が変更されたとき
function onPlayerStateChange(event) {
	// 現在のプレーヤーの状態を取得
	var ytStatus = event.data;
}

var g_TimeAndImageData =[]
var TimeAndImageDataImportFlg = false


function ImportTimeAndImageData(){
      var fileRef = document.getElementById('fileOfTimeAndImage');
	  var content;
	  
      if (1 <= fileRef.files.length) {
			var reader2 = new FileReader();
			//ファイル読み出し完了後の処理を記述
			reader2.onload = function (theFile) {
			var content = theFile.target.result;
			g_TimeAndImageData = content.split(/\n/);
			TimeAndImageDataImportFlg = true;
			DisplayDataImportFlg();
			currentImgIdx = 0;

        }

		//ファイル読み出し
        reader2.readAsText(fileRef.files[0], "utf-8");

      }
}

var g_reader2 = new FileReader();
var g_File;
var fileElem = document.getElementById("fileOfTimeAndImage");
fileElem.onchange = function(event) {
    g_File = event.target.files[0];
};


var currentImgIdx;
var changeImgTime;
function ChangeImg(){
	var cmd1, sec1, imgURL;
	
	
	for(currentImgIdx = 0; currentImgIdx < g_TimeAndImageData.length; currentImgIdx++){
		cmd1 = g_TimeAndImageData[currentImgIdx].split(',')
		sec1 = cmd1[0]
		sec2 = sec1 - 2.0;
		
		var currentTime = ytPlayer.getCurrentTime();
		if(currentTime >= sec2 && currentTime <= sec1){
			currentImgIdx++;
			imgURL = cmd1[1]
			DrawImg(imgURL)
		}
	}

}

function DrawImg(imgURL){
	divElem = document.getElementById("ImgDiv");
	divElem.innerHTML = '';
	ImgElem = document.createElement('img');

	ImgElem.src = imgURL
	divElem.appendChild(ImgElem);
}

function Play2(){
	ChangeImg()
	
	CurrentSecond++;
	if(CurrentSecond < MaxPlaySecond && SetFlg == true){
		setTimeout(function(){Play2()}, 1000);
	}
}
function SetPlayId(){
		var playID = document.getElementById("saiseiID").value;
		
        ytPlayer.cuePlaylist({
            'playlist': playID
        });
        setTimeout(function(){Play2()}, 1000);
        SetFlg = true;
        
}

function UnSetPlayId(){
	SetFlg	= false;
}

function DisplayDataImportFlg(){
	var spanElem;
	
	spanElem = document.getElementById("ImportTimeAndImageDataFlgSpan");
	if(TimeAndImageDataImportFlg == true){
		spanElem.innerHTML = "時間別画像リストデータ：インポート済み"
	}else{
		spanElem.innerHTML = "時間別画像リストデータ：インポート未完了"
	}	
}

