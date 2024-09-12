
const buttons = document.querySelectorAll(".button");
// document 브라우저에서 로드된 웹 페이지 전체의미한다
// 웹 페이지내의 모든 요소에 접근할수 있게 해준다
// querySelectorAll(".button"); 페이지내의 .button 클래스
// 를 가진 모든 요소를 선택합니다
const display = document.querySelector(".display");
// querySelector(".display"); 페이지내의 .dispaly 라는 클래스
// 가진 첫번째 요소를 선택합니다. 이 요소는 디스플레이 역활이며
// 결과나 입력된 숫자를 화면에 표시합니다

let firstOperand = null;
// 첫번째 숫자를 저장하는 변수입니다. 아직 값이 없기에 null 초기화 했습니다
let operator = null;
// 연산자를 저장하는 변수입니다. 값이 없기에 null 초기화 입니다
let secondOperand = true;
// 2번째 숫자가 입력되는지 추적하는 변수 입니다
// 처음에는 true로 설정하여 숫자가 처음 입력될때 숫자를 디스플레이에 표시합니다.

buttons.forEach(function (button) {
    // forEach : 이 메소드는 NodeList 내의 모든 요소에 주어진 함수를
    // 한번씩 실행합니다. 여기서는 클릭 이벤트를 처리하기위해 사용했습니다.
    button.addEventListener("click", function (event) {
        // 각 버튼에 클릭 이벤트를 추가합니다 . 클릭 할때마다 함수가 실행합니다
        const value = event.target.textContent;
        // 사용자가 클릭한 텍스트를 가져옵니다. 이때 값은 value 라는 변수에 저장합니다

        if (event.target.classList.contains("number")) {
            // 클릭한 버튼의 클래스 목록에 'number' 클래스가 포함
            // 되있는지 확인합니다. 이클래스가 가진 버튼은 숫자 버튼입니다.
            if (secondOperand) {
                display.textContent = value;
                secondOperand = false;
                // 첫번째 숫자가 입력된후 두번째 숫자가 입력된 경우 'display' 를 초기화하고
                // 새 숫자가 화면에 나타냅니다. secondOperand = false; 이렇게 설정하여
                // 연속된 숫자가 입력이 되도록 처리합니다

            }else{ // 첫번째 숫자가 입력된 이후 숫자 입력을 처리합니다.
                if(display.textContent === "0" && value !== "."){
                   display.textContent = value;
                   // display.textContent 디스플레이에 현재 표시된 텍스트 입니다
                   // display.textContent = value 디스플레이에 새로운 값을 넣습니다
                   // display.textContent += value 현재 디스플레이에 표시된
                   //                        텍스트 뒤에 새로운 숫자를 추가합니다.
            } else if (value === "." && display.textContent.indexOf(".") === -1) {
                display.textContent += value;
            } else if (value !== ".") {
                display.textContent += value;
                // display.textContent.indexOf(".") === -1 디스플레이에 소수점이
                // 있는지 확인 합니다 만약 -1 이면 소수점이 없다는 뜻입니다.
            }
            }
        }
    
        else if (value === "C") {
            display.textContent = "0";
            firstOperand = null;
            operator = null;
            secondOperand = true;
            // 초기화 버튼을(C)를 누르면 디스플레이를 '0'으로 초기화하고
            // 모든 변수 (firstOperand, operator, secondOperand)
            // 를 모든 초기 상태로 되돌립니다
        }
        else if (event.target.classList.contains("operator") && value !== "=") {

            // 2. 연산자 버튼을 눌렀을 때 연산자를 기억하도록 하는 방법:
            // 연산자 버튼을 눌렀을 때, 선택한 연산자를 기억하고 이후 숫자와 함께 
            // 사용할 수 있도록 operator 변수를 설정합니다.

            // operator 변수: 사용자가 연산자 버튼(+, -, *, /)을 클릭하면 해당 연산자를 
            // operator 변수에 저장합니다. 이 변수는 이후에 = 버튼을 눌러 계산을 수행할 때 사용됩니다.
            // 연산자 기억: operator 변수에 저장된 연산자는 사용자가 다음 숫자를 입력한 후 
            // calculate 함수에서 두 숫자 사이의 연산을 수행하는 데 사용됩니다.
            // 중간 계산: 만약 연산자 버튼이 이미 눌린 상태에서 또 다른 연산자 버튼을 클릭하면, 
            // 먼저 이전의 연산을 수행하고 그 결과를 첫 번째 피연산자로 설정한 후 
            // 새로운 연산자를 operator 변수에 저장합니다.

            // 연산자 버튼 클릭 실행하는 함수 입니다
            if (firstOperand === null) {
                // 첫번째 연산자가 디스플레이에 firstOperand 값을 저장합니다
                firstOperand = parseFloat(display.textContent);
                // parseFloat 문자열을 숫자로 변환하는 함수입니다
                // 즉 디스플레이의 텍스트를 숫자로 변환합니다
            } else if (operator) {
                const result = calculate(firstOperand, parseFloat(display.textContent),
                    operator);
                display.textContent = result;
                firstOperand = result;
                // 계산한 함수를 calculate로 호출하여 계산합니다
                // 계산 된 결과값을 디스플레이에 나타냅니다 그리고 firstOperand에 저장이 됩니다.
            }
            secondOperand = true; // 2번째 숫자 입력을 위해 secondOperand 값을 true로 설정합니다
            operator = value; // 클릭된 연산을 operator 변수 저장합니다
            console.log(firstOperand); // firstOperand 결과값을 출력합니다
            console.log(operator); // operator 결과값을 출력합니다
        }
        else if (value === "=") { // = 버튼을 클릭할때 실행하는 함수입니다
            if (operator && firstOperand !== null) {
                const result = calculate(firstOperand, parseFloat(display.textContent),
                    operator);
                display.textContent = result;
                // firstOperand와 operator 을 계산해 디스플레이에 나타냅니다
                firstOperand = null; // 계산이 끝나면 firstOperand , operator 초기화합니다
                operator = null;
                secondOperand = false; // 계산을 출력후 다시 실행하도록 돕습니다
            }
        }
    });
});
function calculate(first, second, operator) {
    // first, second 이 2개의 숫자를 operator(연산자)로
    // 입력받아 결과를 반환하는 함수코드입니다
    // calculate?? 연산을 하여 결과를 반환하는 함수코드입니다

    // 1. calculate 함수에서 firstOperand와 secondOperand의 타입을 주의해야 하는 이유:
    // 자바스크립트에서 calculate 함수는 두 개의 숫자(firstOperand와 secondOperand)와 
    // 연산자(operator)를 받아 계산을 수행하고 그 결과를 반환합니다. 이 함수에서는 기본적인 
    // 사칙연산(덧셈, 뺄셈, 곱셈, 나눗셈)을 처리합니다.

    // 하지만 중요한 점은 calculate 함수가 입력받는 값들이 숫자 타입이어야 한다는 것입니다. 
    // 예를 들어, "10" + "5"는 문자열 연결이 되어 "105"가 되지만, 숫자 10 + 5는 15가 됩니다.
    // 만약 firstOperand나 secondOperand가 문자열로 남아 있다면, 연산이 올바르게 수행되지 않습니다.

    // 왜 타입이 중요한가?
    // 타입 불일치로 인한 문제: 예를 들어, firstOperand가 "10"(문자열)이고 secondOperand가 
    // "5"(문자열)일 때, 덧셈 연산을 하면 "105"가 됩니다. 이는 문자열이 서로 연결된 결과입니다. 
    // 그러나 숫자 10과 5를 더하면 15가 됩니다. 따라서 연산을 수행하기 전에 문자열을 숫자로 변환해야 합니다.
    // parseFloat의 역할: 이 함수는 문자열을 부동 소수점 숫자로 변환합니다. 
    // 이를 통해 계산기에서 입력된 값을 정확한 숫자로 변환한 후 연산할 수 있습니다.
    if (operator === "+") {
        return first + second;
    } else if (operator === "-") {
        return first - second;
    } else if (operator === "*") {
        return first * second;
    } else if (operator === "/") {
        return first / second;
    } 
}

// 전체 코드 흐름 요약:
// 사용자가 숫자 버튼을 클릭하면 그 숫자가 디스플레이에 표시됩니다.
// 연산자 버튼을 클릭하면, 첫 번째 숫자(firstOperand)를 저장하고, 연산자(operator)를 기억합니다.
// 두 번째 숫자를 입력한 후 = 버튼을 누르면, calculate 함수가 호출되어 
// 첫 번째 숫자와 두 번째 숫자 사이의 연산이 수행되고 결과가 디스플레이에 나타납니다.
// 연산이 끝나면 firstOperand와 operator는 초기화되어 새로운 계산을 시작할 준비가 됩니다.


// DOM은 HTML 문서의 구조를 계층적으로 표현합니다
// 여기서는 uerySelector , uerySelectorAll 메소드를 사용해
// 특정 클래스 ID를 가진 HTML 요소를 선택하며 , 그 요소의 속성 메소드를
// 자바스크립트 내에 제어할 수 있습니다.

// addEventListener 이벤트 리스너는 특정 이벤트가 실행될때
// 실행되는 함수입니다, 이 메소드를 통해 특정요소를 추가할수있습니다

// 연산 처리방법
// 첫번째 숫자를 firstOperand 에 변수 저장이되고
// 2번째 숫자를 입력한후 = 버튼이 가진 속성으로 인해 calculate 함수가 실행되어
// 결과값을 디스플레이에 출력합니다

// parseFloat 함수는 문자열을 숫자로 변환합니다
// 계산기에 출력되는 숫자는 문자열로 처리되므로, 
// 계산을 위해선 숫자로 변환이 필요합니다
