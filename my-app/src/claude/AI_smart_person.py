"""
返り値は以下の二つ。
result["result"]: 売買注文の内容。 
result["action"]: AIの売買注文の根拠。
"""
from langchain.chains import SequentialChain
from langchain.prompts import PromptTemplate
from langchain_anthropic import ChatAnthropic
from langchain import LLMChain
from langchain.output_parsers import RegexParser
from langchain.memory import SimpleMemory
import os #本番ではいらない？
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY") #APIキーの読み込みは本番環境に依存。


# ゲームのメイン関数
def AI_smart_person(cash, stock_prices, stock_counts, event, year, period):
    # 状況把握プロンプト
    situation_output_parser = RegexParser(
        regex=r"situation_summary:(.*)",
        output_keys=["situation_summary"],
    )
    situation_prompt = PromptTemplate(
        input_variables=["cash", "stock_prices", "stock_counts", "year", "period"],
        template="""
    現在の状況は以下の通りです。

    - 所持金: {cash}円
    - 各社の買値: {stock_prices}
    - 各社の持ち株数: {stock_counts}
    - 現在の年: {year}年目
    - 現在の期: 第{period}期

    この状況をどのように捉えますか？特に、現在の所持金と各社の買値・持ち株数に注目して、今後の株の売買方針を簡潔に3パターン上げてください。

    situation_summary:
    """,
        output_parser=situation_output_parser,
    )

    # イベント分析プロンプト
    event_output_parser = RegexParser(
        regex=r"event_summary:(.*)",
        output_keys=["event_summary"],
    )
    event_prompt = PromptTemplate(
        input_variables=["event"],
        template="""
    今期のイベントは以下の通りです。

    {event}

    これについて、イベントによる株価の変動幅が大きい銘柄や、自社の持ち株に影響のある銘柄に注目して簡潔に分析してください。

    event_summary:
    """,
        output_parser=event_output_parser,
    )

    # 行動決定プロンプト
    action_output_parser = RegexParser(
        regex=r"action_result:(.*)",
        output_keys=["action_result"],
    )
    action_prompt = PromptTemplate(
        input_variables=["situation_summary", "event_summary", "cash"],
        template="""
    現在の状況は以下の通りです。なお、これは、4年間のゲームで、1年間に4回、合計16回の取引があります。後半になるほど配当金も大きくなります。

    {situation_summary}

    イベントによる株価への影響は以下の通りです。

    {event_summary}

    これらを踏まえ、各社の株をそれぞれ何株売買するのが最適でしょうか？根拠とともに、具体的な売買数を決定してください。
    
    ただし、以下の制約条件を守る必要があります。

    1. 売買する株数の合計は5株以下であること。
    2. 売買金額の合計が現在の所持金{cash}円を超えないこと。
    3. 売却により持ち株数が負の値にならないこと。現在の持株数は以下のようなものです: {stock_counts}.
    4. 1つの銘柄に対して売りと買いを同じターンに行わないこと。

    また繰り返しますが、各売買の根拠を簡潔に説明してください。

    action_result:
    """,
        output_parser=action_output_parser,
    )

    # 出力フォーマット整形プロンプト
    format_output_parser = RegexParser(
        regex=r"result:(.*)",
        output_keys=["result"],
    )
    format_prompt = PromptTemplate(
        input_variables=["action_result"],
        template="""
    以下の売買方針に従って、指定されたフォーマットで出力してください。また、フォーマットにおいて、買いをプラス、売りをマイナスとして表現するものとします。方針を必ず遵守すること。

    売買方針:
    {action_result}

    出力フォーマット:
    result:
    A社の売買個数, B社の売買個数, C社の売買個数, D社の売買個数, E社の売買個数
    例: 1, 3, -1, 0, 0
    """,
        output_parser=format_output_parser,
    )

    # LLMの設定 (ちなみにこの部分を, ChatOpenAI(~~~~~)とするとOpenAIも使える。その場合はfrom langchain_OpenAI import ChatOpenAI が必要)
    llm = ChatAnthropic(anthropic_api_key=ANTHROPIC_API_KEY, model_name="claude-3-haiku-20240307", temperature=0.8)
    # Chainの定義
    situation_chain = LLMChain(llm=llm, prompt=situation_prompt, output_key="situation_summary", verbose=True)
    event_chain = LLMChain(llm=llm, prompt=event_prompt, output_key="event_summary", verbose=True)
    action_chain = LLMChain(llm=llm, prompt=action_prompt, output_key="action_result", verbose=True)
    format_chain = LLMChain(llm=llm, prompt=format_prompt, output_key="result", verbose=True)

    # メインのチェーン
    main_chain = SequentialChain(
        memory=SimpleMemory(memories={}),
        chains=[situation_chain, event_chain, action_chain, format_chain],
        input_variables=["cash", "stock_prices", "stock_counts", "event", "year", "period"],
        output_variables=["situation_summary", "event_summary", "action_result", "result"],
        verbose=True, #ログの緑色のやつはこれをFalseにすると消える
    )

    result = main_chain({"cash": cash, "stock_prices": stock_prices, "stock_counts": stock_counts, "event": event, "year": year, "period": period})
    return result["result"], result["action_result"]


# ゲームのプレイ例
"""
cash = 800
stock_prices = {"A": 100, "B": 70, "C": 80, "D": 50, "E": 140}
stock_counts = {"A": 2, "B": 3, "C": 1, "D": 0, "E": 6}
event = "A社の新製品が好調で、株価が2段階上昇する見込み。一方、B社は業績不振で株価が1段階下落する可能性がある。"
year = 3
period = 2

result, action_result = AI_smart_person(cash, stock_prices, stock_counts, event, year, period)
print(result)
print(f"=================== n\ {action_result} n\======================")
"""