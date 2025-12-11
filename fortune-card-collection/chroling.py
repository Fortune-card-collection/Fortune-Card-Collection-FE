import time
import datetime
import pymysql
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException, StaleElementReferenceException

# ==========================================
# 1. 데이터베이스 설정
# ==========================================
DB_CONFIG = {
    "host": "localhost",  
    "port": 3305,   
    "user": "root",
    "password": "1234",
    "db": "fortune_service",
    "charset": "utf8mb4",
    "cursorclass": pymysql.cursors.DictCursor
}

# 별자리 검색어 -> DB Enum 매핑
ZODIAC_MAP = {
    "물병자리": "aquarius",
    "물고기자리": "pisces",
    "양자리": "aries",
    "황소자리": "taurus",
    "쌍둥이자리": "gemini",
    "게자리": "cancer",
    "사자자리": "leo",
    "처녀자리": "virgo",
    "천칭자리": "libra",
    "전갈자리": "scorpio",
    "사수자리": "sagittarius",
    "염소자리": "capricorn"
}

# 화면의 탭 텍스트 -> DB Enum 매핑 (HTML에 '신년'으로 되어있으므로 그대로 사용)
PERIOD_MAP = {
    "오늘": "today",
    "내일": "tomorrow",
    "이달": "month",
    "신년": "year"
}

def main():
    # DB 연결
    try:
        conn = pymysql.connect(**DB_CONFIG)
        cursor = conn.cursor()
        print("✅ DB 연결 성공")
    except Exception as e:
        print(f"❌ DB 연결 실패: {e}")
        return

    # Selenium 설정
    chrome_options = Options()
    # chrome_options.add_argument("--headless") # 디버깅 시에는 주석 처리 추천
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
    # 모바일 환경 에뮬레이션 (제공해주신 HTML이 모바일 뷰입니다)
    mobile_emulation = { "deviceName": "iPhone X" }
    chrome_options.add_experimental_option("mobileEmulation", mobile_emulation)

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    wait = WebDriverWait(driver, 5)

    try:
        print("🚀 크롤링 시작...")

        # 1. 별자리별로 순회 (ZODIAC_MAP 기준)
        for kr_zodiac, db_zodiac_enum in ZODIAC_MAP.items():
            # URL로 직접 이동하는 것이 가장 정확합니다. (list_thumb 클릭보다 안정적)
            url = f"https://m.search.daum.net/search?w=tot&q={kr_zodiac} 운세"
            driver.get(url)
            time.sleep(1) # 페이지 로딩 대기

            print(f"--- [{kr_zodiac}] 진입 ---")

            # 2. 기간 탭 순회 및 클릭 (PERIOD_MAP 기준)
            for tab_text, db_period_enum in PERIOD_MAP.items():
                try:
                    # [핵심 로직] 제공해주신 HTML 구조에 맞춰 XPath 생성
                    # div.c-section-subtab 안에 있는 ul.grid_xscroll 안의 a 태그 중 텍스트가 일치하는 것 찾기
                    tab_xpath = f"//div[contains(@class, 'c-section-subtab')]//ul[contains(@class, 'grid_xscroll')]//a[contains(text(), '{tab_text}')]"
                    
                    # 탭 요소 찾기 및 클릭
                    tab_element = wait.until(EC.element_to_be_clickable((By.XPATH, tab_xpath)))
                    
                    # JavaScript로 클릭 (가려져 있어도 강제 클릭 가능)
                    driver.execute_script("arguments[0].click();", tab_element)
                    
                    # 클릭 후 데이터가 로딩될 때까지 잠시 대기
                    time.sleep(0.5)

                    # 3. 운세 내용 추출 (desc_result)
                    # stale element 방지를 위해 찾을 때마다 다시 검색
                    try:
                        message_element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div.desc_result")))
                        message = message_element.text.strip()
                    except TimeoutException:
                        # 간혹 내용이 없는 경우 p태그로 재시도
                        message_element = driver.find_element(By.CSS_SELECTOR, "div.desc_result p")
                        message = message_element.text.strip()

                    if not message:
                        print(f"   ⚠️ 내용 없음: {tab_text}")
                        continue

                    # 4. DB 저장
                    now = datetime.datetime.now()
                    sql = """
                        INSERT INTO horoscopes 
                        (zodiac, period, message, created_at, updated_at) 
                        VALUES (%s, %s, %s, %s, %s)
                    """
                    cursor.execute(sql, (db_zodiac_enum, db_period_enum, message, now, now))
                    conn.commit()
                    
                    print(f"   Success [{tab_text}]: {message[:15]}...")

                except Exception as e:
                    print(f"   ❌ 오류 발생 ({tab_text}): {e}")
                    continue
            
            # 다음 별자리로 넘어가기 전 잠시 대기
            time.sleep(0.5)

    except Exception as e:
        print(f"치명적 오류: {e}")
    finally:
        driver.quit()
        conn.close()
        print("🏁 작업 완료")

if __name__ == "__main__":
    main()