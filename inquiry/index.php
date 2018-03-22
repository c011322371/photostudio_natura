<?php
	$name = $_POST["name"];
	// echo $name;

	//言語設定、内部エンコーディングを指定する
	mb_language("Japanese");
  	mb_internal_encoding("UTF-8");

	$to = "c011322371@edu.teu.ac.jp";
	$subject = "例の件について";
	$body = "どうでしょう？";

	if(mb_send_mail($to, $subject, $body)){
  	  echo "メールを送信しました";
  	} else {
  	  echo "メールの送信に失敗しました";
	};
?>