import requests
import json
from PyQt5.QtCore import QThread, pyqtSignal

class OllamaThread(QThread):
    """
    AI 응답을 비동기적으로 받아오는 스레드입니다.
    메인 UI가 멈추지 않게 별도의 길(Thread)을 만들어 작업합니다.
    """
    # 한 글자씩 전달할 때 사용하는 신호 (스트리밍)
    new_text_signal = pyqtSignal(str)
    # 전체 응답이 완료되었을 때 보내는 신호
    finished_signal = pyqtSignal(str)
    # 에러 발생 시 보내는 신호
    error_signal = pyqtSignal(str)

    def __init__(self, prompt, model="gemma4:e4b"):
        super().__init__()
        self.prompt = prompt
        self.model = model
        self.url = "http://localhost:11434/api/generate"
        self._is_running = True

    def stop(self):
        self._is_running = False

    def run(self):
        # 시스템 프롬프트: AI의 정체성을 설정합니다.
        system_prompt = (
            "당신은 한국 학교 행정 전문가입니다. "
            "공식 공문 문체(개조식, '~함', '~바람', '~고자 함')로만 작성하세요."
        )
        
        payload = {
            "model": self.model,
            "prompt": f"{system_prompt}\n\n사용자 요청: {self.prompt}",
            "stream": True  # 스트리밍 활성화
        }

        try:
            # 타임아웃을 짧게 설정해 Ollama가 꺼져 있을 때 빨리 반응하도록 함
            response = requests.post(self.url, json=payload, stream=True, timeout=5)
            response.raise_for_status()

            full_response = ""
            for line in response.iter_lines():
                if not self._is_running:
                    break
                if line:
                    chunk = json.loads(line.decode('utf-8'))
                    text = chunk.get("response", "")
                    full_response += text
                    
                    # UI 쪽으로 한 글자씩 쏴줍니다 (스트리밍 효과)
                    self.new_text_signal.emit(text)
                    
                    if chunk.get("done"):
                        break

            if self._is_running:
                self.finished_signal.emit(full_response)

        except requests.exceptions.ConnectionError:
            self.error_signal.emit("Ollama 서버가 꺼져 있습니다. 프로그램을 실행해 주세요.")
        except Exception as e:
            self.error_signal.emit(f"오류 발생: {str(e)}")