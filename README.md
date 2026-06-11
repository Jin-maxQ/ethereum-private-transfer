# Ethereum Private Network ETH Transfer System

## 프로젝트 소개

본 프로젝트는 Ethereum Private Network 환경에서 ETH 송금 기능을 구현한 웹 애플리케이션입니다.

사용자는 MetaMask 지갑을 연결하여 계정 정보를 확인하고, ETH 잔액을 조회하며, 다른 계정으로 ETH를 전송할 수 있습니다.

또한 Transaction Hash를 통해 거래 결과를 검증할 수 있습니다.

본 프로젝트를 통해 Ethereum Private Blockchain 구축 과정과 Web3.js 기반 블록체인 애플리케이션 개발 과정을 학습할 수 있습니다.

---

## 프로젝트 개요

프로젝트명

**이더리움 프라이빗 네트워크 기반 ETH 송금 시스템 구현**

프로젝트 목적

- Ethereum Private Network 구축
- MetaMask 연동
- ETH 송금 기능 구현
- 블록체인 거래 과정 이해
- Transaction Hash 검증

---

## 주요 기능

### MetaMask 연결

MetaMask 지갑을 이용하여 사용자 계정을 연결합니다.

### 계정 정보 조회

- 계정 주소 확인
- ETH 잔액 조회
- 현재 블록 번호 확인
- 네트워크 ID 확인

### ETH 송금

수신자 주소와 전송 금액을 입력하여 ETH를 전송할 수 있습니다.

### Transaction Hash 확인

거래 완료 후 생성된 Transaction Hash를 확인할 수 있습니다.

---

## 기술 스택

| Technology | Description |
|------------|------------|
| Geth | Ethereum Private Blockchain |
| MetaMask | Wallet Connection & Transaction Signing |
| Web3.js | Blockchain Communication |
| HTML | User Interface |
| CSS | UI Design |
| JavaScript | Application Logic |

---

## 시스템 구조

```text
User
  ↓
MetaMask
  ↓
Web Application (Web3.js)
  ↓
Geth Private Network
  ↓
Ethereum Blockchain
```

---

## 개발 환경

### Software

- Geth
- MetaMask
- Visual Studio Code
- Google Chrome

### Language

- HTML
- CSS
- JavaScript

### Library

- Web3.js

---

## 네트워크 정보

| Item | Value |
|--------|--------|
| Network Name | Private Ethereum |
| Chain ID | 12345 |
| RPC URL | http://127.0.0.1:8545 |
| Currency Symbol | ETH |

---

## 실행 명령어

### 1. Genesis Block 초기화

```bash
geth init genesis.json --datadir ./data
```

### 2. 계정 생성

```bash
geth account new --datadir ./data
```

### 3. Private Network 실행

```bash
geth --datadir ./data ^
--networkid 12345 ^
--http ^
--http.addr 0.0.0.0 ^
--http.port 8545 ^
--http.api personal,eth,net,web3,txpool,miner ^
--allow-insecure-unlock ^
--unlock 0 ^
--password password.txt ^
--mine
```

### 4. Geth Console 접속

```bash
geth attach http://127.0.0.1:8545
```

### 5. 블록 번호 확인

```javascript
eth.blockNumber
```

### 6. 계정 목록 확인

```javascript
eth.accounts
```

### 7. 잔액 확인

```javascript
web3.fromWei(
    eth.getBalance(eth.accounts[0]),
    "ether"
)
```

### 8. Transaction 조회

```javascript
eth.getTransaction("TRANSACTION_HASH")
```

### 9. Transaction Receipt 조회

```javascript
eth.getTransactionReceipt("TRANSACTION_HASH")
```

### 10. 채굴 시작

```javascript
miner.start()
```

### 11. 채굴 중지

```javascript
miner.stop()
```

---

## 실행 방법

### Step 1

Geth를 실행하여 Ethereum Private Network를 시작합니다.

### Step 2

MetaMask에 네트워크를 추가합니다.

```text
Network Name : Private Ethereum
RPC URL      : http://127.0.0.1:8545
Chain ID     : 12345
Currency     : ETH
```

### Step 3

프로젝트 폴더에서 index.html 파일을 실행합니다.

또는 VS Code Live Server를 이용하여 실행합니다.

### Step 4

"MetaMask 지갑 연결" 버튼을 클릭합니다.

### Step 5

계정 주소와 ETH 잔액을 확인합니다.

### Step 6

수신자 주소와 전송 금액을 입력합니다.

### Step 7

"ETH 보내기" 버튼을 클릭합니다.

### Step 8

MetaMask에서 거래를 승인합니다.

### Step 9

Transaction Hash를 확인합니다.

---

## 시연 화면

### MetaMask 연결

(스크린샷 삽입)

### 계정 및 잔액 조회

(스크린샷 삽입)

### ETH 송금

(스크린샷 삽입)

### Transaction Hash 확인

(스크린샷 삽입)

---

## 거래 검증 방법

Transaction Hash를 이용하여 거래 정보를 조회할 수 있습니다.

```javascript
eth.getTransaction("TRANSACTION_HASH")
```

또는

```javascript
eth.getTransactionReceipt("TRANSACTION_HASH")
```

status 값이 1이면 거래가 성공적으로 처리된 것입니다.

예시:

```javascript
{
  status: 1,
  blockNumber: 527,
  gasUsed: 21000
}
```

---

## 프로젝트 결과

구현 완료 기능

- MetaMask 연동
- 계정 주소 조회
- ETH 잔액 조회
- ETH 송금
- Transaction Hash 생성
- 거래 검증
- 현재 블록 번호 조회

---

## 기대 효과

- Ethereum Private Blockchain 구조 이해
- Web3.js 활용 능력 향상
- MetaMask 연동 경험
- 블록체인 거래 처리 과정 학습
- 분산 시스템 동작 원리 이해

---

## GitHub Repository

본 저장소에는 다음 자료가 포함되어 있습니다.

- 소스코드
- README
- 프로젝트 발표 자료
- 프로젝트 시연 화면

---

## Author

김자한

202238167

가천대학교 컴퓨터공학과

블록체인개론 프로젝트

2025
