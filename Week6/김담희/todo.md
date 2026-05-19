.jsx 폴더는 총 4가지로 분류함

# 전체 흐름

사용자 행동

1. 할일 입력 + 추가

   > TodoInput onAdd()호출
   > page.jsx handleAdd()
   > setTodos 새 항목 추가
   > 화면 리렌더링

2. 체크박스 클릭

   > TodoItem onToggle(id)호출
   > page.jsx handleToggle(id)
   > SetTodos() completed 반전
   > 화면 리렌더링

3. 삭제 버튼 클릭

   > TodoItem onDelete(id)호출
   > page.jsx handleDelete(id)
   > setTodos() 해당 항목 제거
   > 화면 리렌더링

세 흐름 모두 결국 setTodos() → 리렌더링

실제 로직(handleAdd, handleToggle, handleDelete)은 항상 page.jsx 한 곳에 있고
자식 컴포넌트들(TodoInput, TodoItem)은 이벤트가 발생하면 props로 받은 함수를 호출하기만 한다.
setTodos()로 상태가 바뀌면 React가 자동으로 화면을 다시 그려준다.

# - page.jsx

1.  상단 import
2.  상태 선언
3.  세 가지 함수
    - handleAdd()
    - handleDelete(id)
    - handleToggle(id)
4.  return

# - TodoInput.jsx

1.  함수 선언 & props 받기
2.  input 태그
    사용자가 "공부" 입력
    → onChange 실행
    → setInput("공부") 호출
    → input 상태가 "공부"로 바뀜
    → 화면 리렌더링
    → value={input} 이 "공부"로 표시됨
    => 상대와 화면이 항상 동기화 되는 걸 React에서 제어 컴포넌트라고 함
3.  onKeyDown의 &&패턴 -> if 문을 짧게 쓴 것
4.  button 태그

# - TodoItem.jsx

1.  props 받기
2.  클래스 조건부 적용
    - completed: false → class="item"
    - completed: true → class="item completed"
3.  체크박스 div
    - 클릭하면 완료 상대 반전되고 완료 됐을 때 체크 표시
4.  텍스트와 삭제 버튼

# - TodoList.jsx

1. props받기 & 완료 개수 계산
2. 조기 반환(Early Return)
3. 뱃지 3개
4. <>빈 태그
5. todos.map()으로 목록 렌더링
