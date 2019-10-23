# RailsTranslationApplication

## はじめに

Google翻訳の結果を保存して一覧形式で再利用できるアプリケーションとして開発していましたが、
スクリプトからではOAuth2による認証が必要となり、
そのための認証データが必要と判明したため、今回はAPI使用を回避して、元の文字列を加工してDBに登録するようにしました。

## 構成

Dockerのコンテナとして構築しています。

## 起動方法

(ホストOSのRailsTransAppディレクトリ内で作業していることを前提としています)

まず、`docker-compose` でコンテナを起動します。

```
docker-compose up
```

起動を確認したら(通常はMySQLの起動ログが流れます)、別ターミナルでwebコンテナのbashを起動します。これで、webコンテナのbashコンソールが表示されます。

```
docker-compose exec web bash
```

webコンテナのコンソールが表示されたら、アプリケーションのディレクトリに移動します。

```
cd /work/transApp
```

Gemやnode_moduleを取り込みます。

```
bundle install
bundle exec bin/rails webpacker:install
bundle exec bin/rails webpacker:install:typescript
bundle exec bin/yarn add @types/react @types/react-dom
bundle exec bin/rails webpacker:install:react
bundle exec bin/yarn add jquery
bundle exec bin/yarn add popper.js
bundle exec bin/yarn add bootstrap
bundle exec bin/yarn add @types/jquery
```

Webpackを実行します

```
bundle exec bin/webpack
```

データベースのセットアップを行います。

```
bundle exec bin/rails db:create
bundle exec bin/rails db:migrate
```

サーバーを起動します
(webpackを利用しているため、foremanを使用して一度にrails sとwebpack-dev-serverを同時に起動します)

```
bundle exec foreman start
```

## 表示方法

ホストOSのブラウザから表示可能です。

URLは http://localhost:3000 です。


## 操作方法

本アプリを開いたときはまだ何も登録されていませんので、「新規追加』ボタンを押します。
すると、ダイアログボックスが出てきますので、お好きな英単語あ英語の文章を入れて、
「翻訳して保存」ボタンを押します。

すると、変換後の文字列が一覧に現れます。

一覧の左側のカラムにある「詳細」ボタンを押すと、フルサイズの翻訳前・翻訳後の文字列が表示されます

## 技術的な話

・ 本アプリはDocker上で動作しています
・ CentOS上のRails(webpacker)の他、MySQLのコンテナも同時に使用しています
　・ Redisのコンテナもありますが、前もって作っておいたdocker-composeを使用した頃の名残で、使用していません
・ フロントエンドはjQuery+Bootstrapをメインで使用しています
　・ Javascriptの実装はTypescriptを使用しています
・ フルサイズ文字列の表示処理にReactを使用しています
