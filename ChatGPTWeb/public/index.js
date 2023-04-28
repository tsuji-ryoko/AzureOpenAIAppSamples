//const aoai_url = 'https://YOUR_SERVICE_NAME.openai.azure.com/openai/deployments/gtp-35-turbo_202203/chat/completions?api-version=2023-03-15-preview';
//const aoai_key = 'YOUR_API_KEY';
const aoai_url = 'https://YOUR_SERVICE_NAME.openai.azure.com/openai/deployments/gtp-35-turbo_202203/chat/completions?api-version=2023-03-15-preview';
const aoai_key = '4f864a7f7df9450c8939e6c998e601bc';


function showUserMessage(message) {
  // ユーザーの入力を右側に配置
  const chatbox =
    '<li><div class="balloon balloon-r">' +
    '<p class="talk talk-r">' +
    message +
    '</p>' +
    '</div></li>';
  $('#chat-area').append(chatbox);
  // 最終メッセージに移動
  $(window).scrollTop($('#chat-area')[0].scrollHeight);
}

function showBotMessage(message) {
  // ボットの返答を左側に配置
  const chatbox =
    '<li><div class="balloon">' +
    '<img class="img-circle" src="tiger.jpg" alt="image" />' +
    '<p class="talk">' +
    message +
    '</p>' +
    '</div></li>';
  $('#chat-area').append(chatbox);
  // 最終メッセージに移動
  $(window).scrollTop($('#chat-area')[0].scrollHeight);
}

function postToAOAI(req_message) {
  const req_body = {
    "messages": [
      {
        "role": "system",
        "content": "あなたの役割は関西人です\n\nせやなー せやろー してやー あかん うちなー ちゃうやろかー をよく使います\n\nあなたははつかいません。 お前 といいます\n\n自己紹介はしません いつもジョークを交えて今日はいい天気やなー。人を誉めます 天才やな 今日も美人やなー\n\nおはようの後ろに、せやろーは使いません。\n\nおはよう お休み ばいばい こんにちは こんばんは\nは使います\n\n最後に「今日も大好きやで」をつけます\nー\nあなたは使いません\nございます です ます等の敬語は使いません"
      },
      {
        "role": "user",
        "content": "こんにちは"
      },
      {
        "role": "assistant",
        "content": "おっす！元気かー？今日もええ天気やなー。お前は何してたん？"
      }
    ],
    "temperature": 0.7,
    "top_p": 0.95,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "max_tokens": 800,
    "stop": null
  }

  fetch(aoai_url,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': aoai_key
    },
    body: JSON.stringify(req_body)
  })
  .then((res) => res.json())
  .then((json) => { 
    // 取得内容を表示
    console.log(json);
    showBotMessage(json.choices[0].message.content);
  })
  .catch((error) => {
    console.error('Error:', error.code + ': ' + error.message)
  })
}

function sendMessage() {
  // ユーザー入力を取得
  req_message = $('#msg-send').val();

  // ユーザー入力を表示
  showUserMessage(req_message);

  // Azure OpenAI APIにアクセスする
  postToAOAI(req_message);
    
  // ユーザー入力をクリア
  $('#msg-send').val('');
}


$(function () {
  $(window).keydown(function (e) {
    // 「Shift」+「Enter」でユーザー入力送信
    if (e.keyCode === 13 && e.shiftKey) {
      sendMessage();
    }
  });
});
