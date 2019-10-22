# RailsTranslationApplication

## はじめに

Google翻訳の結果を保存して一覧形式で再利用できるアプリケーションです。

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

`bundle install` でGemを取り込みます。

```
bundle install
```

データベースのセットアップを行います。

```
bundle exec bin/rails db:create
bundle exec bin/rails db:migrate
```

サーバーを起動します

```
bundle exec bin/rails s -b 0.0.0.0
```
