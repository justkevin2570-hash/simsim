import requests
import json

def test_ollama():
    print("AI에게 질문을 던졌습니다. 잠시만 기다려주세요...\n")
    
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": "gemma4:e2b",
        "prompt": "안녕하세요? 간단하게 인사 한마디 해주세요.",
        "stream": False  # 결과를 한 번에 받아서 확인하기 위해 False로 설정
    }

    try:
        response = requests.post(url, json=payload, timeout=30)
        if response.status_code == 200:
            result = response.json()
            print("--- AI의 답변 ---")
            print(result.get("response"))
            print("----------------")
        else:
            print(f"서버 응답 오류: {response.status_code}")
    except Exception as e:
        print(f"오류가 발생했습니다: {e}")

if __name__ == "__main__":
    test_ollama()
