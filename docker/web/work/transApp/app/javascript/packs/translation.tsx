import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

// jQuery側でsetStateを使うために宣言
var translation_obj;

// stateにReadonly属性をつけるためのinterface宣言
interface ITransStates extends Readonly<{
    source: string
    target: string
}>{}

class Translation extends React.Component<{}, ITransStates> {
    constructor(props) {
        super(props)

        this.state = {
            source: '',
            target: '',
        }
    }

    render = () => {
        return (
            <div className="col-8 col-md">
                <table className="table">
                    <tbody>
                        <tr>
                            <td>翻訳前</td>
                            <td>{ this.state.source }</td>
                        </tr>
                        <tr>
                            <td>翻訳後</td>
                            <td>{ this.state.target }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // refを使うとクラスの外部でもメソッド呼び出し可能
    ReactDOM.render(
        <Translation ref={(c) => translation_obj = c} />,
        document.getElementById('translation_detail'),
    )
})

$(document).ready(() =>{
    // RailsにAPIを送る際はCSRFトークンが必要
    // https://qiita.com/naberina/items/d3b14521e78e0daccdcd
    $.ajaxPrefilter((options, originalOptions, jqXHR) => {
        var token
        if (!options.crossDomain) {
            token = $('meta[name="csrf-token"]').attr('content')
            if(token) {
                return jqXHR.setRequestHeader('X-CSRF-Token', token)
            }
        }
    })

    // 作成ボタンを押したときの処理
    $('#submit_create').on('click', () => {
        var source = $('textarea[name="newtext"]').val();
        if(source != ""){
            $.ajax({
                type: 'post',
                url: '/translation/create',
                data: {source: source},
                dataType: 'json',
            }).then(
                (data, textStatus, jqXHR) => { // success
                    // indexページを更新
                    window.location.reload()
                },
                (jqXHR, textStatus, errorThrown) => { // error
                    $('#error_message_area').show()
                    $('#error_message').text(textStatus + ":" + errorThrown)
                }
            )
            // openするときは楽だが、閉じるときは3行必要
            // https://qiita.com/magic_xyz/items/01f38814ea8b0907ba49
            $('body').removeClass('modal-open')
            $('.modal-backdrop').remove()
            $('#addTranslateModal').hide()
        }
    })

    // 詳細ボタンを押したときの処理
    $('button[name="detail_button"]').on('click', (target) => {
        var id = target.currentTarget.dataset.id
        $.ajax({
            type: 'get',
            url: '/translation/show/' + id,
            dataType: 'json',
        }).then(
            (data, textStatus, jqXHR) => { // success
                // React更新
                translation_obj.setState({source: data.data.source, target: data.data.translated})
            },
            (jqXHR, textStatus, errorThrown) => { // error
                // エラーメッセージを表示
                $('#error_message_area').show()
                $('#error_message').text(textStatus + ":" + errorThrown)
            }
        )
    })
})