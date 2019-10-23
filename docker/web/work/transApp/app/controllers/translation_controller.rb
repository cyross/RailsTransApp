class TranslationController < ApplicationController
  before_action :set_translation, only: [:show]

  def index
    @items = Translation.all
    @items.each do |item|
      item.source = item.source[1,10] + "..." if item.source.length > 10
      item.translated = item.translated[1,20] + "..." if item.translated.length > 20
    end
    @items
  end

  def show
    render json: { status: 'SUCCESS', data: @translation }
  end

  def create
    # Google翻訳を無料で使用するAPIを作成しようとしたが、スクリプトからではOAuth2による認証が必要となり、
    # そのための認証データが必要と判明したため、今回はAPI使用を回避して、単純に
    # 文字列を逆転し、先頭に"Translated_"を追加するだけの処理を行う
    # https://developers.google.com/apps-script/api/how-tos/execute#step_1_turn_on_the_api_name
    # https://spin.atomicobject.com/2016/07/16/google-sheets-api-ruby/
    source = translation_params[:source]
    target = "Translated_#{source.reverse}" 
    translation = Translation.new({source: source, translated: target})
    if translation.save
      res_status = '200'
      res_data = { status: 'SUCCESS', data: translation_params, message: '翻訳に成功しました' } 
    else
      res_status = '900'
      res_data = { status: 'ERROR', message: "翻訳の保存に失敗しました: #{translation.errors}" }
    end
    render json: res_data, status: res_status
  end

  private

  def set_translation
    @translation = Translation.find(params[:id])
  end

  def translation_params
    params.permit(:source)
  end
end
