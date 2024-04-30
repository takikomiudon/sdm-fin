import json
import os
import anthropic
import langchain
import langchain_anthropic
from langchain_anthropic import ChatAnthropic
from langchan.agents import AgentType, Tool, initialize_agent

"""
def lambda_handler(event, context):
    client = anthropic.Anthropic(
        api_key=os.environ.get("ANTHROPIC_API_KEY"),
    )
    body = json.loads(event["body"])
    message = client.messages.create(
        model="claude-3-haiku-20240307",
        max_tokens=1000,
        temperature=0.0,
        system=body["system"],
        messages=[
            {"role": "user", "content": body["content"]}
        ]
    )
    contents = message.content
    texts = [content.text for content in contents]
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps(texts[0])
    }
"""

#===============================================================================================
#===============================================================================================
#===============================================================================================


def lambda_handler(event, context):
    # 環境変数からAnthropic APIキーを取得
    anthropic_api_key = os.environ.get("ANTHROPIC_API_KEY")

    # LangChainを用いたAnthropicの設定
    chat = ChatAnthropic(api_key=anthropic_api_key, model_name="claude-3-haiku-20240307", temperature = 0.3)

    # エージェントの初期化
    agent = initialize_agent(
        tools=[],  # このケースでは追加のツールは不要です
        chat=chat,
        agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
        verbose=True,
        handle_parsing_errors=True
    )

    # Lambdaイベントからメッセージを解析
    body = json.loads(event["body"])
    user_message = body["content"]

    # エージェントによる対話の実行
    prompt = """
              あなたには5つの企業の株式の売買により所持金を増やすゲームをしてもらいます。
                  
             【ルール】
             
             - 各期にそれぞれのプレーヤーは株の売買を合わせて5株まで行うことができます。
              - 株を買うと株価が1段階上がり、株を売ると株価が一段階下がります。
              - 株の売値は買値の1段階下です。
              - プレーヤーには行動順があり、あなたは常に2番目に行動します。
              - 各期にはイベントがあり、あなたの取引の終了後、イベントによる株価の変動が発生します。
              - 最終的な所持金が多いプレーヤーの勝利です。株は4年目第4期までに売らないと所持金として計上されないので注意してください。
              - 5つの企業には異なる特徴があり、A社は株価が安定しやすく、B社は景気に敏感、C社はバランス型、D社は高配当、E社は成長が見込まれるというものです。
              - 株を売ることにより持ち株数が負の値にならないようにすること。
              - 1つの銘柄に対して売りと買いを同じターンに行うことはできません。
              
              
              【入力のフォーマット】
              A社の買値, B社の買値, C社の買値, D社の買値, E社の買値, 所持金, A社の持ち株数, B社の持ち株数, C社の持ち株数, D社の持ち株数, E社の持ち株数, イベントによりA社の株価が上下する段階, イベントによりB社の株価が上下する段階, イベントによりC社の株価が上下する段階, イベントによりD社の株価が上下する段階, イベントによりE社の株価が上下する段階, 年, 期
              【出力のフォーマット(買いを正の数、売りを負の数で表現します)】
              A社の売買個数, B社の売買個数, C社の売買個数, D社の売買個数, E社の売買個数 
            例: 1, 3, -1, 0, 0 
            (思考プロセスを記述したのちに、持ち株数以上に株を売ったり、所持金を上回って株を買ったり、各社の売買個数の絶対値の和が5より大きくならないように立式して検算した上で、出力の一番最後にフォーマットを守って記述すること!!)
            
            """
            
    response = agent.invoke(prompt)

    # レスポンスの整形と返却
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps(response['output'])
    }