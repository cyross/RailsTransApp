# CentOS7にRubyとRailsを入れるDockerfile

# imageはcentos:7
FROM centos:7

# インストールするRubyとRailsのバージョンを指定
ENV ruby_version="2.6.4"
ENV rails_version="6.0.0"

# ビルドに必要なCentOSのパッケージをインストール
RUN yum -y update
RUN yum -y install epel-release
RUN yum -y install git make autoconf curl wget
RUN yum -y install gcc-c++ glibc-headers openssl-devel readline libyaml-devel readline-devel zlib zlib-devel sqlite-devel bzip2
# MySQL関係のGemインストールに必要
# DBのバージョンはMySQL8なのでおまじないをかける
RUN rpm -ivh https://dev.mysql.com/get/mysql80-community-release-el7-2.noarch.rpm
# webコンテナからdbコンテナのDBを確認できるようにコマンドラインツールもインストール
RUN yum -y install mysql mysql-devel
# インストールするNode.jsのバージョンは8.Xを指定
RUN curl -sL https://rpm.nodesource.com/setup_8.x | bash -
RUN yum -y install nodejs
# YARNをインストール
RUN wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
RUN yum -y install yarn
RUN yum clean all

# rbenvをインストール
RUN git clone https://github.com/sstephenson/rbenv.git /usr/local/rbenv
RUN git clone https://github.com/sstephenson/ruby-build.git /usr/local/rbenv/plugins/ruby-build

RUN echo 'export RBENV_ROOT="/usr/local/rbenv"' >> /etc/profile.d/rbenv.sh
RUN echo 'export PATH="${RBENV_ROOT}/bin:${PATH}"' >> /etc/profile.d/rbenv.sh
RUN echo 'eval "$(rbenv init --no-rehash -)"' >> /etc/profile.d/rbenv.sh

# Rubyのソースをダウンロード→インストール
RUN source /etc/profile.d/rbenv.sh; rbenv install ${ruby_version}; rbenv global ${ruby_version}
# gem経由でRailsをインストール
# 現在、 --no-ri と --no-rdoc は deplicated なので、 -N を使用
RUN source /etc/profile.d/rbenv.sh; gem update --system; gem install --version ${rails_version} -N rails; gem install -N bundle; rbenv rehash
